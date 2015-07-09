# Quiz 1

Solutions for Quiz 1 - https://wdidc6.typeform.com/to/tu0ulB

## Question 2

```
$ cd ../../photos/summer_vacation_2014/
```

## Question 3

The correct order of operations for making changes to a GitHub repository are:

- (4) $ git pull origin master
- (3) Make changes to file(s)
- (5) $ git add file_name
- (1) $ git commit -m "commit message"
- (2) $ git push origin master

## Question 4

String, Boolean, and Undefined are primitive data types.
Object and Array are complex data types.

## Question 5

![](https://d4z6dx8qrln4r.cloudfront.net/image-55847d0c49f08-default.png)

(a) Returns the length of the array .

```js
divas.length
```

(b) Returns "Beyonce".

```js
divas[3][0]
```

(c) Adds "Whitney Houston" to the end of the array.

```js
divas.push("Whitney Houston")
```

(d) Removes "Aaliyah" from the array.

```js
divas.shift()
```

## Question 6

![](https://d4z6dx8qrln4r.cloudfront.net/image-55847d7980f66-default.png)

```js
for( var i = 0; i < numbers.length; i++ ){
  console.log(numbers[i])
}
```

## Question 7

```js
function multiply(thingsToMultiply, multiplyBy){
  for(var i = 0; i < thingsToMultiply.length; i++ ){
    console.log(thingsToMultiply[i] * multiplyBy) 
  }
}
```

## Question 8

`div .pizza` selects every element with the class `pizza` that is a child of a div. For example:

```html
<body>
  <div>
    <p class='pizza'>This will be selected</p>
  </div>
  <p class='pizza'>This will not be selected</p>
</body>
```

`div.pizza` selects every div with the class `pizza`. For example:

```html
<body>
  <div class='pizza'>This will be selected</div>
  <p class='pizza'>This will not be selected</p>
  <div>This will not be selected</div>
</body>
```
