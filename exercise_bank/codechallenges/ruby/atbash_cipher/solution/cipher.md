## Atbash Cipher

A folding cipher works similar to the ROT13 cipher that we did, except that the mappings are done by "folding the alphabet." This way, "a" maps to "z", "b" maps to "y", "c" maps to "x", and so on.

```
Plain:    abcdefghijklmnopqrstuvwxyz
Cipher:   zyxwvutsrqponmlkjihgfedcba
```

For the class Cipher, implement a class method `encode` that takes a word as an argument returns the encoded word

Example usage:

```
Cipher.encode("hello")
=> "svool"

Cipher.encode("peter")
=> "kvgvi"

```