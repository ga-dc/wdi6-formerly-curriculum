
# Token-Based Authentication in Angular

## Learning Objectives

- Differentiate between token and cookie-based authentication
- Describe how token-based authentication is implemented, and when it's necessary
- List common security issues when implementing token-based authentication
- Use the devise_token_auth gem to implement token-based auth in a rails app.
- Use the ng-token-auth plugin to implement token-based auth in an angular application

## Code

* [Starter Branch](https://github.com/ga-dc/grumblr_angular/tree/custom-directives-solution)
* [Solution Branch](https://github.com/ga-dc/grumblr_angular/tree/authentication)

## Methods of Authentication - Cookie vs Token

So far, we've seen authentication in rails apps using sessions and cookies.
Generally, the flow looked like this:

Assuming the user is registered:

1. When the user logs in, the system confirms their username and password match, and if so, starts a session which contains the user's id.
2. The user's browser is 'linked' to the session by storing a cookie, which includes a unique, long, hard-to-guess `session_id`.
3. On subsequent requests, the browser includes the cookie.
4. The server compares the `session_id` of the included cookie to it's own database of sessions, and loads the correct session for that request.
5. Our server-side app loads the user's info from the session as `currentUser`

Logging out simply destroys the session (or at least removes the user info from the session).

### Issues with Cookie-based Auth

It's possible to use cookie-based authentication in angular, but it turns out
that it's not the preferred way to implement authentication. There are a few
reasons for this:

Due to browser security restrictions regarding cookies and CORS, setting
cookies for AJAX requests requires additional configuration and complexity.

Using cookies, managing CSRF security can be a real issue. Tokens allow us to
safely disable CSRF protection for AJAX requests. The reason behind this has to
do with the fact that [black hats](https://en.wikipedia.org/wiki/Black_hat) can 'trick' the browser to send cookies on forged
requests, but *can not* trick the browser into sending tokens.

Finally, cookies are only valid for *web apps*. If we wanted to build native
mobile or desktop (or even other server apps) that authenticate against our API,
we'll need to use another solution. Tokens based auth is by far the preferred
solution.

### How Token Based Auth Works

In general, token-based auth is very similar to cookie based auth. The main
difference is that the token (similar to the session id) is NOT stored in a
cookie. Instead, it's stored in memory (or local storage) by a JS app or native app.

1. When the user logs in, the system confirms their username and password match, and if so, it generates a token, associating it with this user.  The response to the client app includes this token (in the HTTP headers).
2. The client app 'remembers' the token (in memory or local storage).
3. On subsequent requests, the client app includes the token in the HTTP headers.
4. The server compares the token to its own database of users / tokens, and loads the correct user for that request.
5. The server-side app puts that user into a variable like `currentUser`

![cookie vs token auth flow](assets/cookie_vs_token_auth.png)

As we'll see, with the right gems / plugins, this process can be made as seamless
as traditional cookie-based auth.

### Token Security

There are some subtle security issues that need to be considered with with
token-based auth. Primarily there are two things:

* Timing based attacks
* Token rotation only usable once to prevent reply attacks

## Outline for Today

Our goal today is to update both the API and the Angular apps for Grumblr to
support token-based authentication, including signup, login, and logout.

First, we're going to implement token-based auth on the API (backend) using the
[devise_token_auth gem](https://github.com/lynndylanhurley/devise_token_auth).

Once we have that working, we're going to implement auth into our angular app
using a complementary plugin, [ng-token-auth](https://github.com/lynndylanhurley/ng-token-auth).

## Grumblr Api

https://github.com/ga-dc/grumblr_rails_api

Open it locally in your text editor. (You might already have it).

Make sure it's working by running `rails s` and open it up in your browser: http://localhost:3000/grumbles

### Add Devise

```rb
# Gemfile

gem 'devise'
```

```
$ bundle install
$ rails g devise:install
```

Make sure to follow any instructions that are necessary (such as setting the host name
in `config/development.rb`).

### Add Devise Token Auth

Next, install the devise token auth gem:

```rb
# Gemfile.rb

gem 'devise_token_auth'
```

```
$ bundle install
$ rails g devise_token_auth:install User auth
```

The first part `User`, is the model. The second part `auth`, is the mount point.

Note that this generates a user model for us, but we need to update that to
remove confirmation and omniauth:

```diff
# app/models/user.rb

- :confirmable, :omniauthable
```

Possible issues here:

- explicitly including `:confirmable`.
- if you put `devise_token_auth` first, it will still try to mount confirmable option.

In `config/application.rb`, update our app's CORS support to allow the headers
that are related to token auth.

```diff
- :methods => :any
+ :methods => :any,
+ :expose  => ['access-token', 'expiry', 'token-type', 'uid', 'client']
```

Update `config/initializers/devise.rb`, so that devise will support login,
signup, etc via JSON API calls.

```diff
- config.navigational_formats = ['*/*', :html]
+ config.navigational_formats = ['*/*', :html, :json]
```

`rake routes` should now show devise_token_auth routes.

In `db/migrate/last_migration_file.rb`, remove entire confirmable section.
Under user info, comment out everything but `t.string :email`

```bash
$ rake db:migrate
```


### Update the seed script

```diff
# db/seeds.rb

+ User.destroy_all
+ User.create!(email:'barb@example.com', password:'pizzajammy')
+ User.create!(email:'bob@example.com', password:'pizzajammy')
```

    $ rake db:seed

### Test Logging In

Restart your server, and try logging in!

```bash
$ curl -H 'Content-Type: application/json' \
 -X POST http://localhost:3000/auth/sign_in \
 -d '{"email": "bob@example.com", "password": "pizzajammy"}'
```

### Lock Down the App

Finally, let's lock down the app so the Grumbles API is only usable when logged
in:

```diff
# app/controllers/grumbles_controller.rb
class GrumblesController < ApplicationController
+  before_action :authenticate_user!
```

```diff
# app/controllers/grumbles_controller.rb
class CommentsController < ApplicationController
+  before_action :authenticate_user!
```

Note that we don't want to put this in our `ApplicationController`, so as not
to incorrectly lock down the signup / signin process as well.

## Grumblr Angular

https://github.com/ga-dc/grumblr_angular

    $ git checkout -b authentication origin/custom-directives-solution

In `index.html`, link to the CDNs for `angular-cookie` and `ng-token-auth` modules:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-cookie/4.0.9/angular-cookie.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-token-auth/0.0.28/ng-token-auth.min.js"></script>
```

```diff
// app.js
.module("grumblr", [
    "ui.router",
+   "ng-token-auth",
    "grumbles"
])
+ .config([
+   "$authProvider",
+   AuthConfigFunction
+ ]);

+ function AuthConfigFunction($authprovider) {
+   $authprovider.configure({
+     apiUrl: "http://localhost:3000"
+   });
+ }
```


### Signing Up

#### Create a Route

```diff
// app.js
+ .state("signin", {
+   url: "/signin",
+   templateUrl: "js/users/signin.html",
+   controller: "SessionsController",
+   controllerAs: "SessionsViewModel"
+ })
```

#### Create a View

```html
<!-- js/users/signin.html -->
<form ng-submit="SessionsViewModel.signin()">
  <div>
    <label>email</label>
    <input type="email" name="email" ng-model="SessionsViewModel.signinForm.email" required="required"/>
  </div>
  <div>
    <label>password</label>
    <input type="password" name="password" ng-model="SessionsViewModel.signinForm.password" required="required"/>
  </div>
  <button type="submit">Sign In</button>
</form>
```

#### Create a Controller

```diff
<!-- /index.html -->
+ <script src="js/users/sessions.controller.js"></script>
```

```js
// js/users/sessions.controller.js
(function(){
  angular
  .module("grumblr")
  .controller("SessionsController", function($auth){
    this.signinForm = {};
    this.signin = function() {
      $auth.submitLogin(this.signinForm)
      .then(function(resp) {
        console.log("Signin success:", resp);
      })
      .catch(function(resp) {
        console.log("Signin failure:", resp);
      });
    };
  });
})();
```

Try logging in! http://localhost:8080/#/signin

You know it worked if you can see a User object in the Dev Tools' console.

Here's everything we changed in the angular app so far today: https://github.com/ga-dc/grumblr_angular/commit/cc7abc067b29e827a6a930fd462a4adcb8edc972

### Redirect to GrumblesIndex on Signin

Instead of just `console.log()`, let's redirect to the GrumblesIndex when you
sucessfully sign in:

```diff
+ .controller("SessionsController", function($auth, $state){
    this.signinForm = {};
    this.signin = function() {
      $auth.submitLogin(this.signinForm)
      .then(function(resp) {
-       console.log("Signin success:", resp);
+       $state.go('grumbleIndex');
      })
```

`$state` is the router, and `.go()` lets us navigate to any defined state.

### Authentication Navigation Directive

Next, we'll implement a custom directive to create the auth navigation (signup,
signin, logout, plus info on who you're logged in as.)

Let's use our custom directive in the main `index.html`

```diff
<!-- /index.html -->
<h1><a data-ui-sref="grumbleIndex">Grumblr</a></h1>
+ <auth-nav></auth-nav>
```

Load in the JS file for the directive:

```diff
<!-- /index.html -->
+ <script src="js/nav/auth.directive.js"></script>
```

Implement the directive:

```js
// js/nav/auth.directive.js
(function(){
  angular
    .module("grumblr")
    .directive("authNav", function($auth) {
      return {
        templateUrl: "js/nav/_auth.html",
        replace: true,
        restrict: 'E',
        link: function(scope) {
          // update scope/view on successful signin
          scope.$on('auth:login-success', function(ev, user) {
            scope.currentUser = user;
          });

          // set initial state, for currentUser, when directive is loaded
          $auth.validateUser()
            .then(function(user){
              scope.currentUser = user;
            })
            .catch(function(err){
              scope.currentUser = undefined;
            });
        }
      };
    });
})();
```

```html
<!-- js/nav/_auth.html -->
<nav>
  <div ng-show="currentUser">
    Welcome, {{currentUser.email}}
    <a data-ui-sref="signout">Sign Out</a>
  </div>
  <div ng-show="!currentUser">
    <a data-ui-sref="signup">Sign Up</a>
    <a data-ui-sref="signin">Sign In</a>
  </div>
</nav>
```

#### Turn & Talk: What's all this code doing?

Talk about the code you see here:

* What is it doing?
* How is it working?


#### Initial Load

Note when we first load the directive (in the `link` function), we call
`$auth.validateUser()` to check whether the user is logged in or not, and set
the `currentUser` property on this directive accordingly.


#### Event Listeners

Angular has a rich event system. What that means is that different parts of our
app can easily alert other parts of our app. In this case, our sessionsController
is publishing (emitting) an event called `auth:login-success` any time we login.
This happens automatically as part of the `ng-token-auth` library.

Here in the `auth-nav` directive, we're registering (aka subscribing) to that
event. Anytime it happens, our directive will automatically run the code inside,
which in this case, updates the value of `currentUser` on the directive's scope.

At this point, you should be able to re-fresh the page and have a working sign-in
page & see who you're signed in as.

However, we still need to implement signout and signup...


### Implement Signout

There are lots of ways to do this, but to me, signout should probably have it's
own URL & view, which implies we'll want a state.

Let's implement that state:

```diff
# app.js
+.state("signout", {
+      url: "/signout",
+      templateUrl: "js/users/signout.html",
+      controller: "SessionsController",
+      controllerAs: "SessionsViewModel"
+    });
```

Note we're re-using the existing sessions controller. It will support all three
operations: signin, signout, and signup.

Next, let's write the template:

```html
<p>You have been signed out.</p>
```

Whew, at least something was easy, right?

Next, we need to update our `sessionsController` to include the following in the
controller function:

```diff
- .controller("SessionsController", function($auth, $state){
+ .controller("SessionsController", function($auth, $state, $scope){

// further down
+      $scope.$on('$stateChangeSuccess',
+        function(event, toState, toParams, fromState, fromParams){
+          if(toState.name == 'signout') {
+            $auth.signOut();
+          }
+        });
```

#### Turn & Talk

What's this code doing?
And why is it here?

Answer:
Since we're using one controller for all three actions, we need a way to detect
when we've navigated to the signout route, and only then should we execute the
`$auth.signOut()` method.

Note: if we had used a separate controller for `signout` (instead of a shared
sessionsController), this might not be necessary, as that controller would only
be activated in the case that we navigate to signout.

#### Update Auth Nav to Detect Signout

`js/nav/auth.directive.js`
```diff
+ scope.$on('auth:logout-success', function(ev, user) {
+   scope.currentUser = false;
+ });
```

## You Do: Implement Sign Up

The last step is for you to implement signup. There are no new concepts you need
to know, just applying more of what we've done so far. Here are some general
tips:

* will you need a new state?
* if so, can you re-use an existing controller?
* you may need to update the auth nav directive to detect when the user signs up (which auto-signs them in)
  * consult the ng-token-auth docs to find out more about what events are fired and when
* you'll probably need a different form and action to handle submitting that form
* again, consult ng-token-auth docs for info on how to submit registration info to the API

If you get really stuck, check out the [Grumblr Angular Authentication Solution Branch](https://github.com/ga-dc/grumblr_angular/tree/authentication)

## References

* [ng-token-auth](https://github.com/lynndylanhurley/ng-token-auth)
* [devise-token-auth](https://github.com/lynndylanhurley/devise_token_auth)
* [Blog post on auth in angular](http://blog.ionic.io/angularjs-authentication/)
* [Cookie vs token auth](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
* [More on token auth](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication)
* [JSON Web Tokens, another way to implement token based auth](https://jwt.io)
