# RegEx is fun

## Learning objectives

- Use built-in Javascript Regex methods to analyze and manipulate strings
- Set Regex expressions both as literals and as strings
- Explain the purpose of flags in an expression
- Escape special characters
- Use lookaheads to match without replacing
- Refactor patterns using groups

## What?

Regular Expressions -- almost always just called "RegEx" -- is a way of parsing strings.
  - You define a pattern, and search for parts of a string that match the pattern
  - Effectively its own language
  - Used in every major programming language (kind of like JSON)

## How?

- https://www.regex101.com
- `Robert AKA Robin`
  - `/Robin/`
  - Flags
    - `/robin/i`
      - `i` is case-insensitive
    - `/Rob/g`
      - `g` is global (match all)
    - `/rob/ig`
      - `lumping flags together`
  - Ranges
    - `/[A-Z]/`
    - `/[A-Z]/g`
  - Exclude ranges
    - `/[^A-Z]/g`
      - Get everything that's *not* a capital letter
    - `/[^A-Z\s]/g`
      - Get everything that's neither a capital letter nor a whitespace
      - Control characters
        - Built-in "variables" that represent specific ranges
        - `/\w/g`
          - "Word" characters
        - `/\b/g`
          - Word boundaries
        - `.`
  - Numbers of characters
    - `/[A-Z][a-z]{4}/g`
      - Gets every string that's a capital letter followed by 4 letters
    - `/[A-Z][a-z]{4}\b/g`
      - Gets every string that's a capital letter followed by 4 letters followed by the end of a word
    - `/\w{3,}/g`
      - Gets every string that's a sequence of 3 or more "word" characters

### Replacing stuff

- `<h1>I like <strong>turtles!</strong></h1>`
  - Strip tags
    - `/<[a-z0-9/]*>/`
- `Roses are red Violets are blue They think it don't be like it is But it do`
  - Split into multiple lines.
    - How?
    - `/\s[A-Z]/g`
      - Won't work because it'll replace the letter
      - Need a way of "looking ahead" to see if there's a letter after this one
    - `/\s(?=[A-Z])/g`

### Validating stuff

- E-mail addresses
  - `/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9\.]+$/`
    - `^` is start of string, `$` is end of string
  - `/^\w+@\w+\.[\w.]+$/`

### Grouping

- `poop is poopy`
  - Try to match "poop"
  - `/(.)(.)\2\1/g`
  - Note Regex101's "Matcher Information" section

### Applying in JS

```
var html = "<h1>I like <strong>turtles!</strong></h1>";
console.log(html.match(/<[a-z0-9/]*>/g));

var isHtml = new RegExp("<[a-z0-9/]*>", "g");
console.log(html.match(isHtml));

var turtles = "I like turtles. Let's make some turtle soup.";
var wordToMatch = "turt";
console.log(turtles.match(new RegExp("\b" + wordToMatch + "\w+\b", "g")));

// Returns null! Why?
// Taking a closer look

console.dir(new RegExp("\b" + wordToMatch + "\w+\b", "g"));

// The "b" and backslashes disappeared!
// Need to be escaped

console.log(turtles.match(new RegExp("\\b" + wordToMatch + "\\w+\\b", "g")));
``` 

### Play!

https://regex.alf.nu/
