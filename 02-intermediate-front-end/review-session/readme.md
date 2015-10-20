# Week 2 Review Session

This is a free-for-all review session!

If you feel comfortable with the material and would like to work on an awesome challenge,
we encourage you to attend the events and callbacks lab.

> Strawpoll for review options: [What do you want to review?](http://strawpoll.me/5781867)

Let's start by identifying the concepts you would like to go over.

Turn to your neighbor or find a partner and:
- Come up with a list of questions on the material
- Take a few minutes to then answer the questions

Share back some of our frequently encountered problems and let's discuss as a group.

## DOM Manipulation Practice
Form pairs and with your partner:

0. Fork and clone this repo: [ttmar](https://github.com/ga-dc/ttmar/blob/master/readme.md)
1. Pseudo Code First! Map out each step, think of the methods you are going to use and potential variable names.
2. Take turns navigating and driving, trying working on one computer and switching every 20 minutes, or after every step.
3. Tackle it incrementally, don't worry if you repeat yourself at first, you can always go back and refactor later. Focus on getting things to work.

The instructors will be floating around to help with questions if you get stuck, otherwise we can work through a solution together before the end of class.

## Next Steps
Go back to lessons, review LO's, write down any lingering questions. It's highly encouraged to form student study groups to do homework or visit office hours, also note there will be more times for review.

Hungry for more, or looking for a place to start practicing? We recommend you check out some of these coding exercises:

0. [ATM](https://github.com/ga-dc/atm)
1. [Project Euler](https://projecteuler.net/archives)
2. [Vignere Cipher](https://github.com/ga-dc/vignere_cipher)

## Timer JS Problems?

Run into something like this?

![Crazy timer](http://i.imgur.com/oyQkuxm.gif)

The problem is every time you do `setInterval` it creates a whole new timer. So if you have something like this:

```js
var startButton = document.getElementById("start");
var display = document.getElementById("display");
var time;
var timingFunction;

var startTiming = function(){
  timingFunction = setInterval(updateTime, 1000);
  console.log("Timer started");
}

var updateTime = function(){
  time = time + 1;
  display.value = time;
}

var stopTiming = function(){
  clearInterval(timingFunction);
  console.log("Timer stopped");
}

startButton.addEventListener("click", startTiming);
```

...every time you click that "Start" button, it's going to create a new timer. It's as if you had one stopwatch running, and then started running a second stopwatch. Click "Start" 100 times, and you'll have 100 timers running and updating the timer display concurrently.

`stopTiming` doesn't appear to be working because every time `startTiming` runs it takes the `timingFunction` variable, empties it out, and replaces it with the most recent `setInterval`. `timingFunction` is only ever going to hold one `setInterval`.

Thus, when you `clearInterval(timingFunction)` it just stops whichever `setInterval` is in `timingFunction` at the moment. Which is to say, it *is* working, but it's only working on the `setInterval` that was created most recently.

### One solution

When the user clicks the "start" button, *remove* the event listener for the "start" button -- and add it back in whenever they "pause" or "restart". That way, a new `setInterval` won't be created by clicking on the "start" button when the timer is already running.
