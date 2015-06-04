# Robin's WDI6 Syllabus

### Things of note
- The weeks are "not to scale" -- they're organized by topic rather than by day.
- Each week has a main learning objective, the purpose of which is to describe the "thing" students will be able to create by the end of that week. These LOs don't mention technologies by name so they can be applied to new technologies.
- The command line isn't introduced until Week 02 to ensure students are more comfortable with their computers before taking on "scary" concepts like Git. During Week 01, students would obtain their own domain and upload all assignments to it.
- The only text editors supported until Week 04 are TextEdit and the shell-based editors (Vim, Nano, etc). This is to force students to pay attention to details and not rely on IDEs to clean up code.
- PHP is briefly covered -- no more than a day or so. It's presented as the simplest way to add basic read/write functionality to an app where no other back-end logic is required, i.e. a "contact me" form on a personal homepage.
- Installfest has been pared down so as to decrease the amount of "magic" introduced in the course. Students don't substantially install things until they've had exposure to the command line in Week 02. Installfest incorporates pre-work review, for which many of our students asked.

## Installfest

- Install only the things that take the most time to install, throw the most errors, and are generally most likely to hold up a regular class:
  - XCode developer tools
  - PostgreSQL
- Review the pre-work!

## [Week 01: Create, publish, and maintain a responsive static website.](w01/)

### New Technologies
- TextEdit
  - The most basic of text editors; unavoidable on a Mac. Write code without line numbers or any syntax highlighting to ensure attention to detail.
- Chrome
  - The element inspector.
- FileZilla
  - Graphical FTP client.
- Browserstack
  - Cross-browser testing app.
- jQuery

## Week 02: Maintain and share code as efficiently as possible.

### New Technologies
- Terminal and iTerm
- Console-based text editors (Pico, Nano, Vi, Vim, Emacs)
  - Note: Still no Atom or SublimeText. Teaching console-based text editors as the only alternative (so far) to TextEdit forces comfortability with the console.
- Homebrew
- XCode CLI tools
- Git
- Node in CLI
- Jasmine

### LOs
- Command Line
  - Demonstrate CRUD actions in Pico, Nano, Vi, Vim, Emacs, and using pure shell commands (e.g. `echo >`, `echo >>`, `touch`, `grep`).
  - Label the components of a command.
  - Explain the purpose of Homebrew.
  - Upload a file to a server using FTP in the command line.
  - Ping a server from the command line.
  - Annotate the output of `traceroute` so that it could be read by a 5-year-old.
  - Add an alias to a Bash profile.
  - Write out what `sudo` stands for and explain its purpose.
- Git
  - Diagram the components of a Git repository.
  - Write a list of the commands most commonly used when managing a Git branch.
  - Explain the differences between a repo, a branch, and a fork.
  - Given a Git error, write the steps you would pursue to attempt to correct it.
- Github
  - Publish a website to `github.io`.
  - Make a domain point to a `github.io` page.
- RegEx
  - Perform a `grep` search to retrieve files containing an e-mail address.
  - List common special entities used in Regular Expressions and explain their purpose.
  - Use Javascript to search a string for a complex pattern.
- TDD with Jasmine

## Week 03: Project 1: Create and publish a responsive, static website.

## Week 04: Build a complex single-page app with persisting data.

### New Technologies
- An IDE (Atom, SublimeText...)
- PHP
  - Simplest way to enable back-end functionality on a website.
- Firebase

### LOs
- Object-Oriented Javascript
  - Explain what `this` refers to at each point in a given expression.
  - Provide a real-world analogy that explains the roles of models, views, and controllers.
- HTTP
- APIs
- AJAX with GET and POST
- PHP
  - Create a "Contact Me" form on a webpage.

## Week 05: Build a RESTful API.

### New Technologies
- Node.js
- NPM
- ExpressJS
- socket.io
- Heroku

### LOs

## Week 06: Project 2: Build a complex multi-view app with persisting data.

## Week 07: Build a CRUD app that uses a database.

### New Technologies
- MongoDB
- ERD

### LOs

## Week 08: Develop a CRUD application to be as efficient and maintainable as possible.

### New Techologies
- Backbone
- Underscore

### LOs

## Week 09: Project 3: Build a RESTful, database-based CRUD app.

## Week 10: Create a CRUD app using a completely different programming language.

### New Technologies
- Ruby
- RSpec
- Sinatra
- PostgreSQL

### LOs

## Week 11: Create a secure, scalable CRUD app.

### New Technologies
- Rails
- Devise
- OAuth
- Hand-rolled authentication

### LOs

## Week 12: Project 4: Flagship project.
