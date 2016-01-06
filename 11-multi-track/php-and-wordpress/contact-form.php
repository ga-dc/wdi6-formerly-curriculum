Let's do something useful...

## Make a "contact me" form

First, download Composer:

```sh
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
exec bash -l
```

Then, set up a `composer.json` that requires a PHP library called PHPMailer:
```sh
composer init
composer require phpmailer/phpmailer
```

Then, copy and paste the code below, use the password I provided in class, and watch in despair as this proceeds to not work for god-knows-what reason.

```PHP
<?php

$host     = "secure139.inmotionhosting.com";
$port     = 465;
$username = "wdi@robertgfthomas.com";
$password = "some password";
$realname = "WDI Student";
$recipient= "robertgfthomas@gmail.com";

$subject  = "I'm sending an e-mail with PHPMailer!";
$body     = "Isn't that neat?\n\nSincerely,\n\nMe";

require __DIR__ . "/vendor/autoload.php";

$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPDebug = 4;
$mail->SMTPAuth = true;
$mail->SMTPSecure = "ssl";

$mail->Host = $host;
$mail->Port = $port;    
$mail->Username = $username;
$mail->Password = $password;

$mail->setFrom($username, $realname);
$mail->addReplyTo($username, $realname);
$mail->addAddress($recipient);
$mail->addCC($username);

$mail->WordWrap = 5000;
$mail->isHTML(false);
$mail->ContentType = "text/plain";
$mail->Subject = $subject;
$mail->Body = $body;
if($mail->send()){
  echo("It worked!");
}else{
  echo("Sad panda. " . $mail->ErrorInfo);
}

?>
```

## API requests

Taken from [my old job at Coinbase](http://coinbase.robertgfthomas.com/docs.html).

```PHP
<?php
  $ch = curl_init();
  curl_setopt_array($ch, array(
    CURLOPT_URL => "https://coinbase.com/api/v1/buttons",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array(
      "CONTENT_TYPE: application/json",
      "ACCESS_KEY: DNxNFjHpqY4ZPohj",
      "ACCESS_NONCE: 1407535265561757",
      "ACCESS_SIGNATURE: " . hash_hmac("sha256", '1407535265561757https://coinbase.com/api/v1/buttons{"button":{"name":"test","price_string":1.23,"price_currency_iso":"USD"}}', "sYrtSUDqVOU7Wj05pTOKJ3GKv6BRt6iZ")
    ),
    CURLOPT_POSTFIELDS => '{"button":{"name":"test","price_string":1.23,"price_currency_iso":"USD"}}',
    CURLOPT_POST => true
  ));
  $results = curl_exec($ch);
  curl_close($ch);
  echo $results
?>
```
