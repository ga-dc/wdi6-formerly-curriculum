# APIs

## Learning Objectives

- Describe what an API is, and why we might use one.
- Explain the common role of JSON on the web.
- Describe the purpose and syntax of `respond_to`
- Make a Rails app that provides a JSON API.
- Use an external API (via HTTParty) to gather data and utilize it in a Rails application

## Overview

> “APIs are going to be the driver for the digital economy and unless they [companies] are talking about APIs already, they will be left behind.” -- James Parton of Twilio


> Twitter no longer wants to be a web app. Twitter wants to be a set of APIs that power mobile clients worldwide, acting as one of the largest real-time event busses on the planet.


## What is an API? (30 min)

Up to this point, we have built applications for humans.  We created views that render html, so that a user can view and interact.  
### Demo: Single user presses button

??? App displays requests per second.  Renders HTML.  Only instructor.


### Demo: Multiple users using pressing button ???

??? Same server.  All students pressing.  Open up to class.



> Q. Are there other ways to interact with our web servers?
---

[How do we browse?](http://www.smartinsights.com/mobile-marketing/mobile-marketing-analytics/mobile-marketing-statistics/)

It's not just US anymore.  [The Internet of Things](https://en.wikipedia.org/wiki/Internet_of_Things)


### Native Mobile Apps
Share example: ???

- http://www.smartinsights.com/wp-content/uploads/2014/03/Mobile-stats-vs-desktop-users-global-550x405.png

Native Mobile Apps are mostly just pretty faces on API calls.  Behind the scenes, the mobile app may be making calls to multiple APIs to gather and update information.  

> Q. What is the role of html & css?
---

It provides a structure and style for visual presentation.

The mobile app wants a native experience.  An a Mac, we want it to look and feel like a Mac.  On Windows, it should look and feel like Windows.

> Q. Do we need the structure and style anymore?
---

No.  We don't want the structure and style anymore.  In fact, it just extra baggage.  We would ignore it.  We just want the data.  We'll make it look "native".  We want a concise format for sharing data.

### JSON (Javascript Object Notation)

[Basic definition of JSON](https://simple.wikipedia.org/wiki/JSON)

> Q.  From the reading last night.  What are some benefits of JSON?
---

[JSON](http://json.org) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

> Q. What two data structures does JSON represent?
---

- a collection of key/value pairs (JS object, Ruby Hash).
  - `{ key: value }`
- an ordered list of values (Array)
  - `[ value0, value1, ... ]`

Even with mobile, we're still talking about humans interacting with textfields and buttons - there's just another layer in between.  

#### Demo: Multiple users using cocoa-rest-client

??? Same server.  Students install cocoa-rest-client.  Open up to class.  Service displays RpS.

Review/discuss output.


### Machine to machine

> "It is easy for humans to read and write. It is easy for machines to parse and generate."



#### Demo: computer places requests.

??? Same app.  Called from script.  App tracks click per second.  Renders json.

Both human and computer RPS on screen together (query_params?).

Discuss magnitude of differences:
- speed
- quantity
- ramp up
- 24/7, never gets tired, hungry

## RESTful Review (10 min)

- Everything is a Resource
- Different formats.  Rails defaults to :html.  json, csv, xml, ..???
- http verbs + action
  - show
  - index
  - new -> create
  - edit -> update

## Rails and json (75 min)


### I do: Tunr artists#show

- jBuilder.  Why?  Basic `json.extract!`
- demonstrate via cocoa-rest-client

### You do: Tunr songs#show
  :id, :title, :artist_name

### I do: Tunr artists#index

- jBuilder: add json.array, json.url

### You do: Tunr songs#index

### I do Tunr artists#create


> Q. What do we have to update to support create?
---

- Discuss new -> create, edit->update.  no view
  - what is the purpose of "new"
  - what is the correlation in an API?

> Q. Knowing that, what do we have to update to support create?
---

- Controller updates (from solution)

### You do: Tunr songs#create, songs#update

### [optional] Active Model Serializers
- brief overview/comparison

## 3rd Party APIs (45 min)

Other companies have created something similar.  Some follow the REST guidelines, some don't.

### Short demo of HTTParty

### Exercise: movie

### Exercise: pull song info from ???


## Conclusion

???


## Resources:
- https://github.com/mmattozzi/cocoa-rest-client
