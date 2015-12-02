# RegEx is fun

## Learning objectives

- Use built-in Javascript Regex methods to analyze and manipulate strings
- Set Regex expressions both as literals and as strings
- Explain the purpose of flags in an expression
- Escape special characters
- Use lookaheads to match without replacing
- Refactor patterns using groups

## What?

Regular Expressions -- almost always just called "RegEx" -- are a specialized syntax for matching portions of text.
- You define a pattern, and search for parts of a string that match the pattern
- Effectively its own language
- Used in every major programming language (kind of like JSON)

## The pattern

In js and ruby, a RegEx is wrapped in forward slashes (`/expression/`).

### We Do: First glimpse (5 min)

Let's look at a few examples in [RegEx101](http://regex101.com), a regular expression editor.

- enter "a" as the regular expression and
- add some fruits to your "Test String".

Q. What is it doing?
---

> Correct.  It's indicating everywhere the letter "a" appears.  In most applications, we would use this to indicate if the string had an "a" contained somewhere in it.  

For instance, if we wanted to match routes that had the word "song" in them, we would use `/song/`.

### You Do: Document Dive (10 min)

Take a minute to review the [Regex Quick Reference](#quick-reference) at the bottom of this lesson.

Try the another example: `/.*fly$/`

Q. What are the `.`, `*`, and `$` used for?
---

> That regex "will match butterfly, dragonfly; but not butterflyman, dragonfly man, and so on".  Let me break it down... this RegEx matches all strings that:
- start with anything `.*` and
- end in `fly$`.  

The dollar sign indicates "End of line".  To be honest, I think that is the same as `/fly$/`.  Let's try it.

## You Do: Playing with Robin

Let's play with the string: `Robert AKA Robin is #1`

What pattern would you use?

### Flags

|    | Add the right flag(s) to this | In order to  | Like this   |
| -  | --------------------------    | ------------ | ----------- |
| 01 | /robin/                     | Select "Robin" | Robert AKA `Robin` is #1 |
| 02 | /Rob/                   | Select both "Rob"s | `Rob`ert AKA `Rob`in is #1 |
| 03 | /rob/                   | Select both "Rob"s | `Rob`ert AKA `Rob`in is #1 |

### Ranges

|    | Add the right range to this |  In order to | Like this |
| -  | --------------------------- | ------------ | --------- |
| 04 | /b[e]/g            | Select "be" and "bi"  | Ro`be`rt AKA Ro`bi`n is #1 |
| 05 | /R[][]/g           | Select "Rob"          | `Rob`ert AKA `Rob`in is #1 |
| 06 | /[]/g              | Select just "R"       | `R`obert AKA `R`obin is #1 |
| 07 | /[]/g         | Select all capital letters | `R`obert `AKA` `R`obin is #1 |
| 08 | /[]/g     | Select everything that is not a capital letter | R`obert ` AKA` `R`obin is #1` |
| 09 | /[0]/g            | Select any number | Robert AKA Robin is #`1` |

### Wild Cards and Special Characters

|    | Adjust this pattern |  In order to | Like this |
| -  | ------------------- | ------------ |
| 10 | /[A-Z]/g  | Select each word       | `Robert` `AKA` `Robin` `is` #1 |
| 11 | //g       | Select all letters (individually)  | |
| 12 | /\w/g     | Select each word       | `Robert` `AKA` `Robin` `is` #`1` |
| 13 | //g       | Select just numbers    | Robert AKA Robin is #`1` |
| 14 | /\b*/g     | Select only first letters | `R`obert `A`KA `R`obin `i`s #1 |

### Numbers of Characters

|    | Adjust this pattern |  In order to | Like this |
| -  | ------------------- | ------------ |
| 15 | /[A-Z][a-z]{}/g     | Select "Rob" | `Rob`ert AKA `Rob`in is #1 |
| 16 | /[A-Z][a-z]{4}/g  | Select "Robin" | Robert AKA `Robin` is #1 |
| 17 | //g     | Select the first 3 words | `Robert` `AKA` `Robin` is #1 |

## Validating stuff

- E-mail addresses
  - `/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9\.]+$/`
    - `^` is start of string, `$` is end of string
  - `/^\w+@\w+\.[\w.]+$/`

Try it!

## Applying in JS

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

## Capture Groups

A common use for a RegEx is to gather certain pieces of information from strings.

### Turn and Talk: How would you capture all the domains from a list of urls?


## Play!

https://regex.alf.nu/


## References
- [Quick Reference](quick_reference.md)



## Answers for "Playing with Robin":

1. `/robin/i`
- `/Rob/g`
- `/rob/g`
- `/b[e-i]/g`
- `/R/g`
- `/R[io]/g`
- `/[A-Z]/g`
- `/[^A-Z]/g`
- `/[0-9]/g`
- `/[A-Z]*/ig`
- `/\w/g`
- `/\w*/g`
- `/\d/g`
- `/\b[A-Z]/ig`
- `/[A-Z][a-z]{4}/g`
- `/[A-Z][a-z]{4}\b/g`
- `/\w{3,}/g`



### Delete the following
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
