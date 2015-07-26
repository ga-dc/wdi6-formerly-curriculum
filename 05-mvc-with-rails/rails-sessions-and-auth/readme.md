# Sessions and Auth

## Learning Objectives
- Contrast the use cases for cookies, sessions, and permanent storage.
- Define and then access a session variable in a Rails application.
- Create a (very) simple hashing algorithm.
- Describe the differences between hashing and encoding.
- Add sign up, sign in, and sign out functionality to a Rails application.
- Securely store and access passwords.
- Describe the functionality added by `has_secure_password`.
- Differentiate between authentication and authorization.

## What's a cookie?

### We do:
1. In Chrome, go to Preferences
- Show advanced settings
- Click "Content settings"
- Click "All cookies and site data"
- Scroll to `github.com`

Click around on the different "buttons" or "tabs". In particular, look at `dotcom_user`, `logged_in`, and `tz`.

#### Turn and talk: What do you see? What do these do?

A *cookie* is a piece of data stored on your computer by your web browser and associated with a particular website.

### Example cookies:

From Github:
```
Name: dotcom_user
Content: RobertAKARobin
Domain: .github.com
Path: /
Send for: Secure connections only
Accessible to script: No (HttpOnly)
Created: Wednesday, July 22, 2015 at 7:04:22 PM
Expires: Sunday, July 22, 2035 at 7:04:22 PM
```

Normally my online banking account only has 5 cookies, but as soon as I log in it gets an additional 15 or so, including this one:
```
Name: FORTUNE_COOKIE
Content: abcd-efgh-ijkl-mnop-qrst-uvwx-yz12-3456 
Domain: .online.wellsfargo.com
Path: /
Send for: Secure connections only
Accessible to script: No (HttpOnly)
Created: Saturday, July 25, 2015 at 6:07:09 PM
Expires: When the browsing session ends
```

#### What might be the purpose of these cookies?
#### Why is Github's expiration date so far in the future, while Wells Fargo's is when the browsing session ends?
#### What's the significance of 'Send for: Secure connections only'?

Notice the "Accessible to script". Cookies can be accessed via Javascript.

If you go to `github.com`, open the console, and type `document.cookies`, you'll get something like this:

```
tz=America%2FNew_York; _ga=GA1.2.3456.7890; _gat=1"
```

## Reading and writing cookies

## Security

Hiding from scripts, expiration dates, secure connections only...

#### Why does security with cookies seem to be such a big deal?

### Two truths and a lie

- Washington is an expensive city in which to live.
- Jesse has nice hair.
- It is possible to make something 100% secure.
