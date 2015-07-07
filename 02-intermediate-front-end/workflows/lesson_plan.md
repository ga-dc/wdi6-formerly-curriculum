# User Stories/MVP/Agile Software Development

## Learning Objectives
- Define SDLC and why we use it as developers.
- Provide a general overview of what "Agile" means and contrast it to Waterfall
- Identify the components of a good user story
- Explain what Trello is, and why we use it.
- define what a backlog is and how they are implemented in developer workflow
- Create user stories for existing web applications
- Differentiate MVP from application.
- Generate user stories in order to create proof of concept for MVP(minimum viable product)

## Opening Framing

What does mean to be a developer? Do we, as developers, just sit in our mom's basement, drinking mountain dew absent minded from the outside world and just code all day? Maybe. Hopefully not. Development is not just about coding. Planning, preparing, discussion and iteration is our lifeblood. It's integral to how effective development happens. Let's look at [facebook from 10 years ago](http://editorial.designtaxi.com/news-facebook050214/2.jpg). Now, let's look at facebook [now](http://rack.0.mshcdn.com/media/ZgkyMDE0LzA1LzI5LzIxLzIwMTB6dWNrLmQ0NGNiLmpwZwpwCXRodW1iCTg1MHg4NTA-CmUJanBn/461e20d3/dcf/2010zuck.jpg). Clearly these changes didn't happen overnight. Some serious planning and development methodologies went into this.

## SDLC
THE SDLC is the systems development life cycle, also referred to as the application development life-cycle. It is a term used to describe a process for planning, creating, testing, and deploying an information system.

One form of SDLC is the waterfall methodology.

![](http://upload.wikimedia.org/wikipedia/commons/e/e2/Waterfall_model.svg)

It's a linear approach to software development. Project stages execute sequentially. You get to the final product fully developed and tested at the very end of the process. Sometimes can be good if you know EXACTLY what you want the end goal to be. IE. you know: what to build, who to build it for, and how to build it.

But things change.. dependent software changes, customer needs change.

We'll be talking about/using a better model/methodology of SDLC in particular. Agile Software Developement

## Agile Software Development
*Official* wikipedia definition. Agile Software Development is a group of software development methods in which requirements and solutions evolve through collaboration between self-organizing, cross-functional teams.

### Agile Manifesto
> Great Quote: "The Agile movement is not anti-methodology, in fact many of us want to restore credibility to the word methodology. We want to restore a balance. We embrace modeling, but not in order to file some diagram in a dusty corporate repository. We embrace documentation, but not hundreds of pages of never-maintained and rarely-used tomes. We plan, but recognize the limits of planning in a turbulent environment. Those who would brand proponents of XP or SCRUM or any of the other Agile Methodologies as "hackers" are ignorant of both the methodologies and the original definition of the term hacker." —Jim Highsmith, History: The Agile Manifesto

<b>Individuals and interactions over processes and tools:</b>
- self-organization and motivation are important, as are interactions like co-location and pair programming.

<b>Working software over comprehensive documentation:</b>
- working software is more useful and welcome than just presenting documents to clients in meetings.

<b>Customer collaboration over contract negotiation:</b>
- requirements cannot be fully collected at the beginning of the software development cycle, therefore continuous customer or stakeholder involvement is very important.

<b>Responding to change over following a plan:</b>
- agile methods are focused on quick responses to change and continuous development.[11]n-profit organization that promotes software development according to the manifesto's values and principles.

> about the items in bold, while there is value in the items on the right, we value the items on the left more.

> TLDR of above, TRY SOMETHING react to feedback

The Basic Implementation of Agile workflow is rapid development based on quick iterations known as sprints. Traditionally in the development environments sprints can last anywhere from 1-4 weeks. For your projects you can structure your own sprints in even smaller increments.

> But the idea behind it, short get stuff done periods of time, and constantly iterating. Getting something to work MVP

## MVP Minimum Viable Product

### T&T(4m)
- With what we've talked about, discuss with your neighbor what you think we mean by minimum viable product.

Honestly there's alot of different meanings for minimum viable product. I like [this video alot](https://www.youtube.com/watch?v=1FoCbbbcYT8)

So what does MVP mean in this class? It's not so different. Build something that works(sorta), that you can get feedback from, and subsequently iterate on.

For the scope of this course. Think of a bronze, silver and gold model. Silver is really what you're trying to make. But if you fall short on time you have your bronze you can fall back on. If you don't have enough to do, you could go to your gold model. Your MVP should be on that bronze/silver line..... ish

## User Stories, how do we figure out our MVP?

In order to work towards our MVP developers write user stories. User stories are essentially small granular features for your application.

User stories have:
- role
- goal
- reason

As a `<role>` I should be able to `<goal>` so that `<reason>`

User stories should be granular and succinct.

good user story
```
As a user, I should be able to message other users so that I can communicate with my family
```

bad user story
```
This app should have a really good social networking engine.
```

### In - Class Ex( 20 m )
Individually, assign numbers 1-5 for all students. For whichever number a student receives individually write as many user stories as they can for the next 5 minutes. In the next 10 minutes, students will group in their respective applications, and whiteboard at least 10 user stories. 5 minutes to review user stories.

1. Facebook
2. Ebay
3. Tinder
4. Gmail
5. Github

### Trello
User stories are great, but wouldn't it be nice if there was a great place to store and track all of them? There is! It's called trello. There are other out there, but we recommend this one.

Have students sign up and do quick demo of making a board and cards/moving cards around.

- Have students create empty Trello Board for Project 1.
- Have students create a card to... create user stories for Project 1

## Backlog

A backlog is a list of features or technical tasks which the team maintains and which, at a given moment, are known to be necessary and sufficient to complete a project or a release

- if an item on the backlog does not contribute to the project's goal, it should be removed;
- on the other hand, if at any time a task or feature becomes known that is considered necessary to the project, it should be added to the backlog.

Its a set of work that is targeted to achieve successful delivery of a project or a release of a product. Often times, it boils down to a bunch of user stories.

### The Icebox
The icebox is literally where all your ideas go that you don’t currently plan to build. It doesn’t mean you can’t thaw them out later, but to you it represents what you should be investigating further. The backlog, however, is things you definitely plan to build

TLDR would be nice to get too, but its not happening any time soon.
