# Welcome to Applebees (Intro to Async)

**Technologies:** *JavaScript, Callbacks, Events, Promises, Ajax.*

## Overview

This lesson introduces the concept of sync versus async transactions, and illustrates the need for async on the front-end. It then outlines the primary strategies for dealing with async transactions on the front-end, including **callbacks**, **events**, and **promises**. This lesson is designed to scaffold **ajax**.


## 1. Define "Synchronous"

### Back-end

First, look at some Ruby code with a syncronous/blocking request in it:

```
def get_spotify_uri(song)
  song = song.title.gsub(" ", "+")
  res = HTTParty.get("http://ws.spotify.com/search/1/track.json?q=#{song}")
  res["tracks"][0] ? res["tracks"][0]["href"] : ""
end
```

Talk about how that HTTP request will take time to complete, so this program will stop on line 3 and wait for resolution. Talk about how this happens invisibly on the server, so has no obvious impact on the user experience.

### Front-end

Now look at a synchronous/blocking behavior within the web browser:

```
$('#sync-button').on('click', function() {
  var start = Date.now();

  // Just sit here an do nothing for five seconds...
  while(Date.now() - start < 5000);
});
```

Attach this synchronous behavior to a button in an HTML document. Have the students click that blocking button, and then try to perform other actions on the page (click links, update the DOM, etc). They should notice that the entire UI is locked for the duration of the blocking behavior.

Make the point that this is terrible for the user experience here on the front-end, so we have to do everything *asynchronously*.

## 2. Define "Asynchronous"

Scaffold asynchronous transactions using a scenario that everyone is intimately familiar with: going out to a terrible chain restaurant, and waiting 20 minutes for a table. Get two volunteers for a little role playing:

* **Volunteer #1**: plays the restaurant host.
* **Volunteer #2**: plays a guest coming in to request a table.

The script:

### Act 1: Callbacks

* **HOST**: Hello, welcome to Applebees!
* **GUEST**: Hi, can I get a table for four, please?
* **HOST**: Sure thing, but we currently have a 20-minute wait for a table.
* **GUEST**: No problem, can I wait at the bar?
* **HOST**: Sure! If you'll leave your cell number, **we'll give you a call** when your table is ready.

**Resolution**

After a pause, have the host mock a phone call to the guest and tell them that their table is ready.

**Followup Discussion**

In this scenario, the requester provided some form of callback information along with the request. The servicer just needed to invoke the provided callback to fulfill the transaction. Make the point that this callback would reach the guest, even if they left the restaurant while waiting.

### Act 2: Events

* **HOST**: Hello, welcome to Applebees… we currently have a 20-minute wait.
* **GUEST**: Okay, can I wait at the bar?
* **HOST**: Sure, what's your name? We'll make an announcement when your table is ready, just **listen for your name to be called**.

**Resolution**

After a pause, have the host start calling out random names: "Burt", "Ernie", etc… The guest takes no action until their name is finally called.

**Followup Discussion**

In this scenario, the requester provided their name and waited specifically for that name to be called, and then chose to take action. Also make the point that the guest would need to be actively listening for their name… if they went outside for a smoke while waiting, they could miss the announcement.

### Act 3: Promises

* **HOST**: Hello, welcome to Applebees… we currently have a 20-minute wait.
* **GUEST**: Okay, can I wait at the bar?
* **HOST**: Sure, **take this pager token**. It will light up when your table is ready *(the host hands the guest some kind of token)*.

**Resolution**

After a pause, have the host flip a mock switch, and then modify the guest's token in some way to demonstrate that it's been activated *(ex: use a marker as the token, and swap out a red marker cap for a green one)*.

**Followup Discussion**

In this scenario, the servicer gave some form of reciept to the requester, representing a promise of the unfulfilled transaction. Also make the point that this receipt can be checked at any time before *or after* the transaction has been resolved.

