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
