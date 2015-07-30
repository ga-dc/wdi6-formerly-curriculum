# Before You Start...

A quiz!

# Pinspiration

For this week's lab you will be creating Pinspiration, an idea-sharing platform that functions just like [this little website](https://www.pinterest.com/)!

## Technical Summary

Pinspiration requires registration to use. Users can upload, save, sort, and manage images—known as pins—and other media content (e.g., videos and images) through collections known as "pinboards". Pinspiration acts as a personalized media platform. Users can browse the content of others on the main page.

# Pairing Up

For this week's lab, you will be pairing up with somebody who is at an equal Rails comfort level as you. Which level are you at?

- **Level 1:** "I understand Rails basics but had trouble applying them to Scribblr."
- **Level 2:** "My Scribblr is fully functional but I struggle with Rails' advanced features."
- **Level 3:** "I am very comfortable with Rails and have worked on most of the bonuses this week."

You and your partner should aim to implement all the features listed at and below your level. So if you are in a Level 1 pair, your goal should be to complete all of the bulletpoints under "Level 1". If you are in a Level 2 pair, shoot to implement all of the features listed under Level 2 **and** Level 1. Level 3 pairs -- **everything**!

## Level 1

Implement two models...  
1. Pin  
2. User  

Pins have...  
- a title
- an image url
- Users can...
  - log in/out and sign up
  - save pins

## Level 2

Implement two additional models...  
  1. Board
  2. Tag

Pinspiration should have the following associations...  
- Users have many boards.
- Boards have many pins.
- Pins have many tags.
- Users have many tags.

## Level 3

**NOTE:** Some of these stretch goals may require research on subjects not yet covered in class.

Instead of storing an image url as a string, allow users to upload to AWS using paperclip or carrierwave.
