Variables in Ruby

* `$DATA_DIR = "/data/set1"`
  * **global variable**
  * global scope
  * starts with `$`
  * snake_case

* `my_fav_color = "red"`
  * **local variable**
  * local scope (only valid in the current method)
  * lower_snake_case

* `PI = 3.14`
  * **constant**
  * local scope
  * can't be changed
  * ALL_CAPS_SNAKE_CASE

* `@name = "Adam"`
  * **instance variable**
  * scoped to the class definition
  * starts with `@`
  * lower_snake_case
  * each instance gets its own unique copy of the variable

* `@@person_count`
  * **class variable**
  * scope: anywhere in the class
  * two `@`s
  * one copy shared within the class and it's instance



Instance Methods:
  * defined without self in the name
  * called on **instances**
  * can reference instance vars
  * can reference class vars

Class Methods:
  * define with like: `def self.method_name`
  * called on the Class: e.g. `Person.person_count`
  * can reference class vars
  * can't reference instance methods/vars
