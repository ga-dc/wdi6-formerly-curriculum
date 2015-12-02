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
- Designed to be a concise.  So concise, it can be rather cryptic.

## Where do we use regular expressions?

Q. Where do you think it would helpful to have a specialized language for parsing strings?
---

> Some common examples are route identification, user input validation, and when importing or converting data.


## The pattern

A regular expression is a pattern of text that consists of ordinary characters (for example, letters a through z) and special characters, known as metacharacters. The pattern describes one or more strings to match when searching a body of text. The regular expression serves as a template for matching a character pattern to the string being searched.  In js and ruby, a RegEx is wrapped in forward slashes (`/expression/`).

### We Do: First glimpse (5 min)

Let's look at a few examples in [RegEx101](http://regex101.com), a regular expression editor.

- enter "a" as the regular expression and
- add some fruits to your "Test String".

Q. What is it doing?
---

> Correct.  It's indicating everywhere the letter "a" appears.  In most applications, we would use this to indicate if the string had an "a" contained somewhere in it.  

For instance, if we wanted to match routes that had the word "song" in them, we would use `/song/`.

### You Do: Document Dive (10 min)

Take a few minutes to read this [basic introduction](http://ruby-doc.com/docs/ProgrammingRuby/html/intro.html#S5).  Focus on the patterns, rather than the Ruby code.  
When you reach the "Blocks and Iterators" section, take a minute to review the provided [Regex Quick Reference](#quick-reference).

Then, try the another example: `/.*fly$/`

In the "Test String" area, type multiple words that contain "fly" (e.g. dragonfly, flypaper).

Q. What are the `.`, `*`, and `$` used for?
---

> That regex "will match butterfly, dragonfly; but not butterflyman, dragonfly man, and so on".  Let me break it down... this RegEx matches all strings that:
- start with anything `.*` and
- end in `fly$`.  

The dollar sign indicates "End of line".  To be honest, I think that is the same as `/fly$/`.  Let's try it.


## Playing with Robin

Let's play with the string: `Robert AKA Robin is #1`

### Basic matchers

Here are some basic matchers.  The pattern is matched, letter for letter.

|    | In order to    | Like this   | What pattern would you use? |
| -  | ------------   | ----------- | -------------------------- |
| 01 | Select "Robin" | Robert AKA `Robin` is #1 | /robin/                    |
| 02 | Select "AKA"   | Robert `AKA` Robin is #1 | /AKA/                      |
| 03 | Select both "Rob"s | `Rob`ert AKA `Rob`in is #1 | /Rob/                      |


### Flags

We can add flags, after the pattern, to configure the RegEx.

`/song/i` will match "song" and "Song".

|    | In order to  | Like this   | What flag(s) would you add to this pattern? |
| -  | ------------ | ----------- | --------------------------    |
| 04 | Select "Robin" | Robert AKA `Robin` is #1 | /robin/                       |
| 05 | Select both "Rob"s | `Rob`ert AKA `Rob`in is #1 | /Rob/                         |
| 06 | Select both "Rob"s | `Rob`ert AKA `Rob`in is #1 | /rob/                         |

### Ranges

We can use ranges of characters to avoid typing every single character.

- `/[A-Z]/` matches all capital letters (from A to Z).

|    |  In order to | Like this | Add the right range to this pattern |
| -  | ------------ | --------- | --------------------------- |
| 07 | Select "be" and "bi"  | Ro`be`rt AKA Ro`bi`n is #1 | /b[e]/g                     |
| 08 | Select "Rob"          | `Rob`ert AKA `Rob`in is #1 | /R[][]/g                    |
| 09 | Select just "R"       | `R`obert AKA `R`obin is #1 | /[]/g                       |
| 10 | Select all capital letters | `R`obert `AKA` `R`obin is #1 | /[]/g                       |
| 11 | Select everything that is not a capital letter | R`obert ` AKA` `R`obin is #1` | /[]/g                       |
| 12 | Select any number | Robert AKA Robin is #`1` | /[0]/g                      |

### Wild Cards and Special Characters

- `/.*/`  Matches 0, 1, or more occurrences ('*') of any character ('.')
- `/\d/` Matches any number (or "digit")

|    |  In order to | Like this | Adjust this pattern |
| -  | ------------ | ------------------- |
| 13 | Select each word       | `Robert` `AKA` `Robin` `is` #1 | /[A-Z]/g            |
| 14 | Select all letters (individually)  | | //g                 |
| 15 | Select each word       | `Robert` `AKA` `Robin` `is` #`1` | /\w/g               |
| 16 | Select just numbers    | Robert AKA Robin is #`1` | //g                 |
| 17 | Select only first letters | `R`obert `A`KA `R`obin `i`s #1 | /\b*/g              |

### Counts

We can identify a specific number of character (or group) matches

- `/[a-c]{3}` Matches 3 concurrent occurrences of a, b, or c (e.g. aba, aaa, bac.  Not: bad)

|    |  In order to | Like this | Adjust this pattern, by specifying the count |
| -  | ------------ | ------------------- |
| 18 | Select "Rob" | `Rob`ert AKA `Rob`in is #1 | /[A-Z][a-z]{}/g     |
| 19 | Select "Robin" | Robert AKA `Robin` is #1 | /[A-Z][a-z]{4}/g    |
| 20 | Select the first 3 words | `Robert` `AKA` `Robin` is #1 | //g                 |


### Validating stuff

- E-mail addresses
  - `/^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9\.]+$/`
    - `^` is start of string, `$` is end of string
  - `/^\w+@\w+\.[\w.]+$/`

Try it!


## Capture Groups

A common use for a RegEx is to gather certain pieces of information from strings.  Parens are used to indicate this portion of the pattern is important and should be "captured".  Most often used in programming, where we can utilize the various captured portions.


### Turn and Talk: How would you capture all the domains from a list of urls?


## Play!

https://regex.alf.nu/

## Outside of Scope

### Replacing stuff

- `<h1>I like <strong>turtles!</stro`
  - Strip tags
    - `/<[a-z0-9/]*>/`
- `Roses are red Violets are blue They think it don't be like it is But it do`
  - Split into multiple lines.
    - How?
    - `/\s[A-Z]/g`
      - Won't work because it'll replace the letter
      - Need a way of "looking ahead" to see if there's a letter after this one
    - `/\s(?=[A-Z])/g`



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


## References
- Ruby's [Intro to Regular Expressions](http://ruby-doc.com/docs/ProgrammingRuby/html/intro.html#S5)
- Ruby's
- [Quick Reference](quick_reference.md)
- Try it out: http://regex101.com)
- Try it with [Rubular](http://rubular.com)
- A Quick Reference from [RegExTester]](http://www.regextester.com/jssyntax.html)


## Answers for "Playing with Robin":

1. `/robin/`
- `/AKA/`
- `/Rob`
- `/robin/i`
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
