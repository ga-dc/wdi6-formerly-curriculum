# Intro to Web Applications

## Learning Objectives

### Web Applications & Frameworks (45 minutes)
* Differentiate between web sites and web applications
* Compare and contrast the advantages of common web programming languages
* Define the purpose of a Web Framework and list common ones
* Describe common application architectures (MVC, MV*)
* Describe the difference between and relative benefits of server-side and client side web apps
* Define what an API is, and how it can be used to support multiple platforms
* Describe common types of testing (unit / acceptance) and their impact on the development process

<!-- ### Product Management Concerns in Web Development (45 minutes)
* Performance
* Cost of developers and equipment to support different tech choices
* How to hire good developers
* Ways to keep a good relationship with developers
* When to deploy a CDN, what they’re good for
* Do we still need to edit metadata for SEO purposes? -->

## Web Sites vs Applications

So far, we've looked at static web pages, but most of the modern web is built
around the idea of dynamic applications. Any site that stores user data or is
highly interactive is almost certainly powered by a web application.

A web application is a program which users access via a web browser. Instead of
showing the user static HTML pages, a web app will dynamically build an HTML
page on the fly, customized to that user, and including any relevant data.

There are lots of ways to build web applications, but fundamentally you need
to pick a *programming language* and a *web framework* built for that language.

Some common languages used for back-end web programming with their frameworks:

* PHP
  * CakePHP
  * Laravel
  * Symfony
  * Zend
* Ruby
  * Sinatra
  * Rails
* JavaScript / Node
  * Express
  * Hapi
* Python
  * Django
  * Zope
* Java
  * Grails
  * GWT
  * Spring
  * WebObjects
* ASP / C# (Microsoft)


## Back End vs Front End

Every web application needs a back end. This is where the data is stored, and
any business logic is implemented (i.e. validating data, responding to /
processing data / generating reports).

Many applications only have a back-end, which also has the job of building
dynamic HTML pages and sending them to clients.

Modern applications also make use of a front-end application. The back end is
still responsible for storing and validating data, but some of the work (e.g.
generating HTML) can be offloaded to the client (web browser).

In this case, the back-end is often called an API, and the front-end is written
in a front-end JS framework, such as:

* angular
* backbone
* ember
* meteor

In addition to reducing load on the server, this can also make applications feel
more responsive to the user.
