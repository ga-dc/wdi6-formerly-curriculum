---
title: JS Debugging
type: lesson
duration: 1
authors:
    creator: Gerry Mathe (London)
    editors: John Master (DC), Matt Scilipoti (DC)
competencies: Programming
prerequisites: Chrome Dev Tools, Javascript Functions, Text Editor
---

# JS Debugging

### Objectives
*After this lesson, students will be able to:*

- Identify and resolve common and uncommon "logical errors" that affect the results of your program
- Use logs to troubleshoot errors in an application (console log in Dev Tools)
- Conduct real-time debugging in the browser (start small, triangulation, remove code)
- Access properties of a class using helper methods ( `typeof( )` for datatypes)
- Use debuggers and breakpoints to identify logical errors in expressions

### Preparation
*Before this lesson, students should already be able to:*

- Use chrome dev tools
- Use a text editor

## Debugging Javascript (5 mins)

At the moment, most of the JavaScript applications we've written have been fairly simple, and most have not been longer than a hundred lines. As applications and websites get more and more complex, we need increasingly powerful tools to help us detect bugs, typos, implementation errors – and fix them quickly and efficiently.

We've already been using the **Chrome Developer Tools**, but today we'll dive deeper into some of the features we can use to debug JavaScript.

## Using Chrome dev tools to debug JavaScript (35 mins)

#### The Sources Panel

Open the starter code in Chrome and make sure the chrome dev-tools panel is open. Go to the Sources panel.

The Sources panel helps us visualize what's going on when we load JavaScript code. It provides a way for us to debug our code in an interactive way. Follow the steps below to explore the Sources panel:

```
cmd+alt+j
```

- If it is not already selected, select **Sources**.

Take a look:

![chrome](http://s6.postimg.org/5fwewzf0h/298740c0_175f_11e5_84a1_f8c88c3e607a.jpg)

Schema From [Chrome dev tools Website](https://developer.chrome.com/devtools/docs/javascript-debugging)

#### Debugging with breakpoints

A breakpoint is an instruction given to a program via a keyword to pause the execution of a script. The Chrome dev tools let you pause execution of a script and see what's going on.

#### Add and remove breakpoint

On the left side of the panel, click on a line number where you want to stop the execution of the code. The line number will be highlighted with a blue arrow to show the breakpoint.

**Multiple breakpoints**

You can add several breakpoints in the scripts, and everytime a breakpoint is set, the execution will stop. You can enable and disable the breakpoints using the checkboxes on the right sidebar.

It is possible to access a breakpoint by clicking on it in the source on the left.

A breakpoint can be removed by clicking on the blue arrow on the left.

#### Debugger keyword

Another way of setting breakpoints in the code is to use the `debugger` keyword. If the console is open and the interpreter is going through a line in the code that contains `debugger`, then the console will highlight this line and the console will be in the context of the `debugger`.

```javascript
debugger

setTimeout(function(){
  alert("Loaded");
}, 0);
```

> ***Note to instructor:*** _Ensure a breakpoint is above the `alert`._

The DevTools console drawer will allow you to experiment within the scope of where the debugger is currently paused. Hit the **Esc** key to bring the console into view. The Esc key also closes this drawer.

#### Execution control

This section of the lesson is taken from [Chrome dev tools](https://developer.chrome.com/devtools/docs/javascript-debugging#execution-control)

> ***Note to instructor:*** _Ensure that several breakpoints have been created in the JavaScript code before explaining the execution control part of the lesson._

The execution control buttons are located at the top of the side panels and allow you to step through code. The buttons available are:

- **Continue**: continues code execution until we encounter another breakpoint.
- **Step over**: step through code line-by-line to get insights into how each line affects the variables being updated. Should your code call another function, the debugger won't jump into its code, instead stepping over so that the focus remains on the current function.
- **Step into**: like Step over, however clicking Step into at the function call will cause the debugger to move its execution to the first line in the functions definition.
- **Step out**: having stepped into a function, clicking this will cause the remainder of the function definition to be run and the debugger will move its execution to the parent function.
- **Toggle breakpoints**: toggles breakpoints on/off while leaving their enabled states intact.

There are also several related keyboard shortcuts available in the Sources panel:

| Execution | Shortcut |
|-----------|----------|
| Continue | `F8` or `Command + /` |
| Step over | `F10` or `Command+'` |
| Step into | `F11` or `Command+;`  |
| Step out | `Shift+F11` or `Shift+Command+;` |
| Next call frame | `Ctrl+.` |
| Previous call frame | `Ctrl+,` |

#### Interact with paused breakpoints

Once you have one or more breakpoints set, return to the browser window and interact with your page.

#### Pretty Print option

Most of the time, the JavaScript in a website will be minified, meaning that variable names are condensed and spaces and line breaks are removed. This can make the source code unreadable, and difficult to debug. You can re-format the code using the "Pretty Print" button of the bottom left side of the panel `{}`. This makes the code more easy to read and debug.

> When you start building web apps in larger frameworks like Rails or Express, you'll set up your development environment so that code is only minified when you're deploying a production app, not while you're developing actively.

## Independent Practice (15 mins)

Debug the code using the Chrome development tools. Uncomment:

```
  <script type="text/javascript" src="./js/debug.js"></script>
```

You need to get the functions to log out, one after the other.

## Conclusion (5 min)

Javascript debugging tools have improved significantly over the last few years. It is especially important to understand the link between the JS V8 Engine in Chrome and the way that error reporting is handled, and how you can interact with your scripts to figure out what's going on.

*Take questions from students.*
