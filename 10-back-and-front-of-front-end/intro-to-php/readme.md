# Making a "Contact Me" form with PHP

## LOs

- Start Apache running locally on your computer.
- Write a PHP function that contains variables.
- Connect PHPMailer to your e-mail account.
- Send an e-mail via an HTML form using PHPMailer.

## What is PHP, and why does everyone hate it?

PHP originally stood for Personal Home Page... because it was created by some guy to use just on his personal home page. He had no intention of creating a programming language.

However, nothing like it really existed, so other people caught wind of what he was using and started adding their own functionalities to it.

Thus, PHP evolved organically. And as a result, it's kind of a mess.

PHP is very procedural. It doesn't really have objects. Instead of giving you an Array object that has methods attached to it, it just gives you 53 functions with "array" in the name -- 9500 built-in functions, all in the global namespace.

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

## Try writing FizzBuzz in PHP

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
  echo PHP_EOL;
}

?>
```

## You Do (5 min): Make PHP output Fizzbuzz to a file

## GET and POST in PHP

- Look at `$_SERVER`. What does it give you?
- Add in a GET parameter
- Make a POST request with Postman

## You Do (10 min): Make an HTML form that POSTs to Fizzbuzz

PHP should output the contents to a file AND return a success message in JSON.

## PHP Gems

It doesn't really have any. You just download a library and put it in your root folder.

Download PHPmailer: https://github.com/PHPMailer/PHPMailer

## Make the form!

```
require "PHPMailerAutoload.php";
$mail = new PHPMailer;    
$mail->isSMTP();
$mail->Host = "something.website.come";
$mail->SMTPAuth = true;
$mail->Username = "hello@robertakarobin.com";
$mail->Password = $_password;
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;    
$mail->SetFrom($emailMe, $fromName);
$mail->AddReplyTo($emailMe, $fromName);
$mail->AddAddress($emailThem);
$mail->AddCC($emailMe);
$mail->WordWrap = 5000;
$mail->isHTML(false);
$mail->ContentType = "text/plain";
$mail->Subject = $subject;
$mail->Body = $body;
if($mail->send()){
  echo(json_encode(array("success" => true, "message" => "yay")));
}else{
  echo(json_encode(array("success" => false, "message" => "boo")));
}
```

## Afterthoughts

Oops. Installing PHP is tricky. Shouldn't just use built-in Apache. Download XAMPP:

https://www.apachefriends.org

```
cd /Applications/XAMPP/xamppfiles/htdocs
```

Set permissions for `htdocs` folder.
