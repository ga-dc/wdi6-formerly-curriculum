# PHP && Wordpress

[Screencast](http://youtu.be/O11hPhF5GAA)

## LOs

- Start Apache running locally on your computer.
- Write a PHP function that contains variables.
- Understand the capabilities of WordPress as a blogging platform and CMS.
- Incorporate basic HTML and CSS in a WordPress Theme
- Develop a custom WordPress Theme from scratch
- Learn how to customize navigation
- Understand how to leverage the WordPress plug-in library

## What is PHP, and why does everyone hate it?

PHP originally stood for Personal Home Page... because it was created by some guy to use just on his personal home page. He had no intention of creating a programming language.

However, nothing like it really existed, so other people caught wind of what he was using and started adding their own functionalities to it.

Thus, PHP evolved organically. And as a result, it's kind of a mess.

PHP is very procedural. It doesn't really have objects. Instead of giving you an Array object that has methods attached to it, it just gives you 53 functions with "array" in the name -- 9500 built-in functions, all in the global namespace. - http://php.net/manual/en/function.array.php

### At the same time...

There are several reasons to like PHP:

1. It's super-easy to pick up. It looks a lot like Javascript, and because you're dealing with functions instead of objects, it's easier to read.

2. It's *everywhere*. It had a massive head start.

3. It's easy to embed in HTML. PHP works just like `.html.erb` or `.hbs` files, and you don't need to do anything fancy for that to work. For example:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>

  <?php
    $adjectives = array("attractive", "terrible", "sad", "lugubrious");
    $adjective = $adjectives[array_rand($adjectives, 1)];
  ?>
    <h1><?php echo("My, you're looking $adjective today!"); ?></h1>

  </body>
</html>
```

4. It makes a lot of back-end concepts easy to understand.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>

    <pre><?php print_r($_SERVER); ?></pre>

-----

    <pre><?php print_r($GLOBALS); ?></pre>

  </body>
</html>
```

Now we can easily see all of the information we're getting from the server, as well as all of the GET and POST parameters, cookies, etc.

### I use PHP...

...for rapid prototyping. When I want to make a quick script in a hurry, PHP is my go-to.

For example, my `index.php` is extremely useful to me. I use it to navigate around all my various repos and code projects.

The Apache that serves my `index.php` is actually public. If you go to my IP address, you'll be on my computer.

I didn't realize until I'd been doing this for a while that anyone with my IP address could potentially read every single file on my computer. I changed that in a hurry!

## Install PHP

Download XAMPP:

https://www.apachefriends.org/index.html

This is basically like the Blue Elephant for Postgres, except for running the server for PHP, called Apache. (It can also do MySQL and some other stuff.)

Open it, and make sure Apache is running:

![Apache is running](xampp.png)

## Your first PHP file

XAMPP stores everything in:

```
/Applications/XAMPP/xamppfiles/htdocs
```

Give the `htdocs` folder the proper permissions:
1. Click on `htdocs`
- Select `File>Get Info` (Command + I)
- At the bottom, click the little padlock and enter your password
- Select "Read & Write" as the Privilege in each row
- Click the little gear at the bottom and select "Apply to enclosed items..."

Now, create a new file called `hello.php`. Inside, write this:

```PHP
<?php

function quiznosToaster($tray){
  echo("I'm giving off heat... ");
  return("$tray is now toasty!");
}

$sandwich = "BLT";
echo quiznosToaster($sandwich);

?>
```

Then, go to `localhost/hello.php`.

### Try writing FizzBuzz in PHP

Remember the rules:

> Write a script that, for the numbers 1 to 100, prints "Fizz" if the number is divisible by 3, "Buzz" if by 5, "FizzBuzz" if by both, and the number if none of the above.

Hint: It's exactly the same as in Javascript, except variable names have to begin with `$`, and you write `echo` instead of `console.log`.

```PHP
<?php

for($x = 1; $x <= 100; $x++){
  if($x % 15 == 0){
    echo "FizzBuzz";
  }else if($x % 3 == 0){
    echo "Fizz";
  }else if($x % 5 == 0){
    echo "Buzz";
  }else{
    echo $x;
  }
  echo "\n";
}

?>
```

### Make the output go into a file

Hint:
```PHP
file_put_contents($filename, $content, FILE_APPEND);
```

Without FILE_APPEND, it just overwrites the file with that filename.

```PHP
<?php

for($x = 1; $x <= 100; $x++){
  if($x % 15 == 0){
    $output = "Fizz";
  }else if($x % 3 == 0){
    $output = "Buzz";
  }else if($x % 5 == 0){
    $output = "FizzBuzz";
  }else{
    $output = $x;
  }
  file_put_contents("output.txt", $output . "\n", FILE_APPEND);
}

?>
```

### Instead of 100, GET the number

Hint: GET parameters come from the URL. If your URL is `foo.php?myname=john`, it creates a GET parameter called `myname` with the value of `john`.

Hint 2: All the GET parameters are in an array called `$_GET`. You retrieve values from an array just like you would in Javascript.

```PHP
<?php

for($x = 1; $x <= $_GET["number"]; $x++){
  if($x % 15 == 0){
    $output = "Fizz";
  }else if($x % 3 == 0){
    $output = "Buzz";
  }else if($x % 5 == 0){
    $output = "FizzBuzz";
  }else{
    $output = $x;
  }
  file_put_contents("output.txt", $output . "\n", FILE_APPEND);
}

?>
```

### Grand finale

Starting with the first goal, and seeing how many you can get, make a script that:
- Instead of 100, FizzBuzzes using a number from a POST parameter
- Gets a name from a POST parameter
- Saves the name and number as a valid JSON string in a `.json` file
- **Adds** the name and number **to** a valid JSON string in a `.json` file
- Rejects the request if the name parameter is not a string and the number parameter is not a number

So the output would look something like:
```JSON
{
    "steve": [
        100,
        23,
        25
    ],
    "joe": [
        9
    ],
    "margaret": [
        78,
        2
    ]
}
```

Hint:
- `$array = json_decode($json, true)`
- `$json = json_encode($array)`

```PHP
<?php

$number = $_POST["number"];
$name = $_POST["name"];

$filename = "output.json";
$requests = json_decode(file_get_contents($filename), true);
$requests[$name][] = $number;
file_put_contents($filename, json_encode($requests));

for($x = 1; $x <= $number; $x++){
  if($x % 15 == 0){
    $output = "Fizz";
  }else if($x % 3 == 0){
    $output = "Buzz";
  }else if($x % 5 == 0){
    $output = "FizzBuzz";
  }else{
    $output = $x;
  }
  echo($output . "\n");
}

?>
```

## Congrats! You now know how to:

- Write functions
- Define variables
- Save to a file
- Read a file
- Loop
- Turn JSON into an array / object, and vice-versa
- Respond to HTTP requests

If I put this script online right now, it would work fine!

## Hungry for more PHP?

- http://www.phptherightway.com/
- http://www.slimframework.com/
- https://laravel.com/
- http://php.net/manual/en/internals2.php

# Wordpress Theme Development

## Getting started with WordPress

WordPress is a content management system. You
get a nicely designed admin area for managing all of
your content on the site. WordPress allows for
plugins to extend the built in functionality of
WordPress. About 25% of all sites on the internet
are powered by WordPress. WordPress is an open
source project which means you can download and
use the files for free.

## wordpress.com vs wordpress.org

On wordpress.org you can download and install a software script called
WordPress. To do this you need a web host who meets the minimum
requirements and a little time. WordPress is completely customizable
and can be used for almost anything. There is also a service called
WordPress.com which lets you get started with a new and free
WordPress-based blog in seconds, but varies in several ways and is
less flexible than the WordPress you download and install yourself.

## Local WordPress Development

- Install MAMP (Mac) or XAMPP (Windows)
- Start local server (MAMP or XAMPP)
- Go to wordpress.org and download the most recent version of WordPress
- Go to ‘localhost’ in a web browser while your MAMP or XAMPP server is running to view your newly created ‘wordpress’ and ‘project’ site folder projects
- Click on your newly created project folder and follow the prompt to create your wp-config.php file
- Go to the start page for MAMP or XAMPP and go to the phpMyAdmin portal.
- Click on the database tab and create a new database which you can name the same as your project
- Go back to your web browser to finish setting up WordPress locally and enter in the database name you just created. Since we are working locally you can use ‘root’ for the database username and password.
- Run the install
- Enter a site title, username, and password and uncheck private so search engines do not index your site. This username and password is what you will use to login to localhost/projectname/wp-admin
- Click install WordPress and login to your newly created, locally hosted WordPress site!

### You do: Wordpress Admin

- Click admin link.
- Create at least two posts and two new pages.
- Configure your site to show posts on the home page.
- Change the site’s theme.

## WordPress Themes

- We can search for other themes and we are searching the WordPress.org theme repository
- Themeforest.net we can purchase themes and upload them
- Themes live in wp-content/themes in our wordpress folder

### We do:

    $ mkdir wp-content/themes/milky-way
    $ cd wp-contents/themes/milky-way
    $ touch index.php style.css functions.php

Add a `screenshot.jpg` file with the image of your choosing.

### Header and Footer

```html
<!-- header.php -->
<!doctype html>
<html>
  <head>
    <?php wp_head(); ?>
  </head>
  <body>
```

```html
<!-- index.php -->
<?php get_header(); ?>
<h1>Milky Way</h1>
<?php wp_nav_menu(); ?>
<?php get_footer(); ?>
```

```html
<!-- footer.php -->
  <?php wp_footer(); ?>
  </body>
</html>
```

### CSS & JS

- style.css under the meta data for the theme is where you can add your css

```css
/*
  Theme Name: Milky Way
  Theme URI: http://localhost:8888/
  Description: An out-of-this-world Wordpress theme.
  Author: Jesse Shawl
*/
```

- If you have additional css files, enqueue in the functions.php
- You can create a css and js folder in the root of your theme
- Function: wp_enqueue_style
  - https://codex.wordpress.org/Function_Reference/wp_enqueue_style
- Function: wp_enqueue_script
  - https://codex.wordpress.org/Function_Reference/wp_enqueue_script

```php
// functions.php
<?php
function milky_way_scripts(){
  wp_enqueue_style("styles", get_stylesheet_uri());
  wp_enqueue_script("scripts", get_template_directory_uri() ."/js/app.js");
}
add_action('wp_enqueue_scripts', 'milky_way_scripts');
?>
```

## What is the WordPress Codex?

- https://codex.wordpress.org/Theme_Development

## The Loop

It checks what is available for that particular page and then displays it.
The loop starts with an if statement, them moves into a while statement
as long as there is content to be displayed. Inside the loop is the HTML
and PHP markup to display what is in the loop.

https://codex.wordpress.org/The_Loop

```html
<!-- index.php -->
<?php if(have_posts()): while(have_posts()): the_post(); ?>
  <article>
    <h2><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h2>
    <?php the_content(); ?>
  </article>
<?php endwhile; endif; ?>
```

### Changing Permalinks

Settings > Permalinks

## Custom Posts and Pages

https://developer.wordpress.org/themes/template-files-section/page-template-files/page-templates/

### Custom Page Templates

#### `page.php`

If a specialized template that includes the page’s ID is not found, WordPress looks for and uses the theme’s default page template.

#### `page-{slug}.php`

If no custom template has been assigned, WordPress looks for and uses a specialized template that contains the page’s slug.

### Global Page Templates

Sometimes you’ll want a template that can be used globally by any page, or by multiple pages.  Some developers will group their templates with a filename prefix, such as page_two-columns.php

To create a global template, write an opening PHP comment at the top of the file that states the template’s name.

```php
// page_two-column.php
<?php /* Template Name: Two Column */ ?>
```

## Reusing the Loop

```
<?php get_template_part('loop'); ?>
```

## Searching, Sorting, and Filtering

### Searching

```html
<!-- index.php -->
<?php get_search_form(); ?>
```

### Sorting

```html
<?php $posts = query_posts( $query_string . "orderby=title&order=ASC"); ?>
// the loop...
```

### Filtering

```html
<?php
  $current_year = date('Y');
  $current_month = date('m');
  query_posts("year=$current_year&monthnum=$current_month&order=ASC" );
?>
// the loop...
```

## Plugins

>Plugins are ways to extend and add to the functionality that already exists in WordPress.

https://codex.wordpress.org/Plugins

Plugins are installed in `wp-content/plugins/`

### [Advanced Custom Fields](http://www.advancedcustomfields.com/)

We do: Create a Banner Custom Field.

You do: Create a tldr custom field.

### [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)

Custom Post Type UI is often used in conjunction with Advanced Custom Fields.

This is an example of a custom post type: http://www.eachpeachmarket.com/recipes/

### [SEO by Yoast](https://wordpress.org/plugins/wordpress-seo/)

### [Google Analytics](https://wordpress.org/plugins/google-analytics-for-wordpress/)

### [Contact Form 7](https://wordpress.org/plugins/contact-form-7/)

Also https://wordpress.org/plugins/postman-smtp/

### Deployment

What workflow enables us to make and test changes locally and then upload
these changes to a production environment?

```php
if ( file_exists( dirname( __FILE__ ) . '/config/environment/dev' ) ) {
  define('DB_NAME', 'development');
  define('DB_USER', 'development');
  define('DB_PASSWORD', '9JNdhxgd');
  define('DB_HOST', '127.0.0.1');
  define('WP_SITEURL','http://localhost:8888/');
  define('WP_HOME','http://localhost:8888/');
} else{
  define('DB_NAME', 'production');
  define('DB_USER', 'production');
  define('DB_PASSWORD', '9JNdhxgd');
  define('DB_HOST', 'localhost');
  define('WP_SITEURL','http://production.example.com');
  define('WP_HOME','http://production.example.com');
}
```

**Do Not** Import a local database to a production environment.

- https://wppusher.com/

