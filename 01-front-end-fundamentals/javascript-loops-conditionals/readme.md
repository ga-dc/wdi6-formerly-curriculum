# JS Loops and Conditionals

## Learning Objectives
- differentiate between true & false && truthy & falsey
- describe why control flow is utilized in computer programming
- write an if, else if, and else statement in JS
- write a for loop and while loop in JS and differentiate between them
- Utilize loops to iterate through complex data types
- write a JS program that utilizes conditionals and loops

## Opening Framing
So we've already gone over the basics of Javascript. And today, we'll be highlighting the data type of boolean.

### T&T (3m)
Go ahead and chat with your neighbor. Knowing about the boolean data type, how might we use this data type in order to execute conditionals and looping. Additionally, what advantages does that give us with regard to programming?

## true vs false (15m)
So we all know the boolean values of `true` and `false` But there is also a concept of "truthy" and "falsey" In Javascript, the following things are "falsey":
- false
- 0 (zero)
- "" (empty string)
- null
- undefined
- NaN (a special Number value meaning- Not-a-Number!)

> Everything else is "truthy". Why might we need this programmatic concept of "truthy" and "falsey"?(ST-WG)

Draw truth tables for ! and && (I do 2m)
- true && true
- true && false
- !true
- !false

have students do TT for || (ST-WG 2m)
- true || false
- false || true
- false || false
- true || true

## Comparison Operators (15m)
Demonstrate comparison operators in node

- `<`, `<=`
- `>`, `>=`
- `!=`, `!==`
- `==`, `===`

```javascript
55 == "55"
=> true
55 === "55"
=> false
```

What is the differences between the last two? When using `===`, it checks for both the data type and value. `==` only checks for value. Under the hood, though, `==` converts the data type to the same data type and then executes comparison.

## Conditionals (35m /w ex)

// Have an example somewhere where one of the more unusual "falsey" values (e.g., empty string) triggers a conditional.

write and narrate through the following code (10m)

```javascript
var age = 24;
if(age < 18) {
  console.log("You're too young to enter this club! Get outta here")
}
else if(age > 18 && age < 21){
  console.log("Come on in! But no Drinking!!")
}
else{
  console.log("Come on in!")
}
```

Conditionals will always follow this pattern. There is a key word(if, else if, else). Followed by an expression that will evaluate to true or false in parentheses. Then followed by code to execute when condition is met.

What's wrong with the following code?:

```javascript
var age = 24;
if(age > 21){
  console.log("Come on in!")
}
else if(age > 75){
  console.log("Come on in, but I don't know if this is the place for you!")
}
else{
  console.log("get outta here youngin!")
}
```

## Conditionals EX (15~20m)

## Loops(60m)

### For loop(25m)
There are two ways to write a for loop.

#### The first:

```javascript
for(var i = 0; i < 10; i++){
  console.log(i)
}
```
The first part is the keyword `for`.
Followed by 3 parts `;` separated in parentheses.
- The first part instantiates the iteratee. Essentially gives you access to this value in your code block as i. It starts at 0 in this case.
- The second part is the comparison expression. That means this code will continue to execute until this expression evaluates to false.
- The third and final part is how much the iteratee is incremented after each execution of the loop

#### The second:

```javascript
// instantiate an array of names
var names = ["adam", "matt", "andy", "adrian", "robin", "jesse"]
for(i in names){
  console.log(names[i])
}
```

- Again this for loop starts with the keyword `for`.
- In parentheses contains the iteratee followed by the keyword `in` followed by the complex data type you would like to iterate over(array or object)
- In the brackets contains the code you would like executed for each iteration of the loop

### You Do - Write a for loop that prints odd numbers to 100. Do not use conditionals

### While Loop(15m)
```javascript
var i = 0;
while(i < 10){
  console.log(i)
  // don't increment at first
}
```
#### ST-WG
What are the differences between `for` and `while`?

// Through example or pose question to students, have them recreate the same odd-number-printing
// for loop using a while loop.

### You do - Fizzbuzz(can use conditionals)(20m)

## HW is [Choose your own adventure](https://github.com/ga-dc/choose_your_own_adventure_js).
