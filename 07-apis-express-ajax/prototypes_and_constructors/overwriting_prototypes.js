function myObject(){}

myObject.prototype = {
  method1: function(){
    console.log("this is method1");
  }
}

var obj1 = new myObject();
obj1.method1(); // works
// obj1.method2() // error because method2 hasn't been defined yet
// obj1.method3() // error because method3 hasn't been defined yet

myObject.prototype = {
  method2: function(){
    console.log("this is method2");
  }
}

obj1.method1(); // works
// obj1.method2(); // error; see below
// obj1.method3(); // error because method3 hasn't been defined yet

var obj2 = new myObject();
// obj2.method1(); // error; see below
obj2.method2(); // works
// obj2.method3(); // error because method3 hasn't been defined yet

// Let's say you have a simple little `cat` object:
var cat = { name: "Whiskers" }
// If I then do this:
cat.breed = "Maine Coon";
// ...it will add the "breed" property onto the cat. However, if I do this:
cat = { breed: "Maine Coon" }
// ...it then overwrites the previous cat object.
// Any cat created now will have a breed, but no name.
/*
When you say `myObject.prototype = {}`, you're creating a new prototype object.
It doesn't overwrite the previous prototype object; it creates a whole new one.
That is, the new and old prototype objects are still in the computer's memory.
Because the old prototype still exists in memory, obj1 is continuing to point
to that place in memory. Nothing has "told" obj1 to change where it's pointing.
*/

myObject.prototype.method3 = function(){
  console.log("this is method3");
}

obj1.method1(); // works
// obj1.method2(); // error because it's still pointing to the old prototype
// obj1.method3(); // error because it's still pointing to the old prototype

// obj2.method1(); // error
obj2.method2(); // works
obj2.method3(); // works; see below

var obj3 = new myObject();
// obj3.method1(); // error
obj3.method2(); // works
obj3.method3(); // works; see below

/*
Here, we haven't overwritten the prototype object; we've just MODIFIED it.
So it still occupies the same place in memory.
*/
