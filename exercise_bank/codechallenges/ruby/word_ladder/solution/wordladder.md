# Word Ladder

## Overview
[Word ladder](http://en.wikipedia.org/wiki/Word_ladder) is a word game invented by Lewis Carroll. A word ladder puzzle begins with two words, and to solve the puzzle one must find a chain of other words to link the two, in which two adjacent words (that is, words in successive steps) differ by one letter.

COLD → CORD → CARD → WARD → WARM

## Your Task

Write a method that when given a four letter word, returns all of the four letter words words that can appear next to it in a word ladder. You are free to write any helper methods if you find them helpful.

Example: 

```
word_ladder_neighbors("aloe")
=> ["alae", "alee", "alme", "alow", "floe", "sloe"]
```

## Bonus
1. One word in the list has 33 other words that can appear next to it. What is this word?
2. How many different words can be reached, starting from best, in 3 or fewer steps?

---

Source : http://www.reddit.com/r/dailyprogrammer/comments/149kec/1242012_challenge_114_easy_word_ladder_steps/