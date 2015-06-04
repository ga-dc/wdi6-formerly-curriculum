# Vigenere Cipher

Implement a Vigenere Cipher using JavaScript. You should be able to encode and decode a word when given a keyword. [Read the Wikipedia description here](http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#Description
)

A quick rundown of the steps:

1. You take the message you want to encrypt (in this case 'attackatdawn').

```
message: attackatdawn
```

2. You take the keyword you want to encrypt with (in this case 'lemon'), and repeat it so that it is the length as your message.

```
keyword: lemonlemonle
```

3. You add each letter of the message to each letter of the keyword to produce each letter of the ciphertext. For example, for the first letter:

* message: 'a' is index 0 in the alphabet
* keyword: 'l' is index 11 in the alphabet
* ciphertext: letter at index (0 + 11), which is 'l'

```
ciphertext: lxfopvefrnhr
```