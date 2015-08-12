# Browser compatibility

(AKA "Why everyone hates Internet Explorer")

## Back in the early days of the web...

There was just HTML. The purpose of the Internet was for scientists to share research.

Then, someone was like, "Hey, we want colors and images!"

So they added attributes like `bgcolor`, `border`, and `face`.

The result was sites like this:

http://www2.warnerbros.com/spacejam/movie/jam.htm

...and this (scroll down):

https://web.archive.org/web/20040608010343/http://www.sewingandembroiderywarehouse.com/embtrb.htm

As the visual needs of web designers increased, the complexity of their code increased. Then, someone was like, "Hey, man, having semantics and style all mixed together is getting really annoying." And thus, CSS was born.

## But all was not good.

People hadn't really agreed on standards for HTML and CSS. Some browsers supported certain HTML tags but not others, and so on.

So the people of the world got together and decided on standards to govern web design. They agreed that they would all use the same elements and CSS properties and so on. No one *had* to -- a company could invent a web browser any way they wanted -- but that would be like you saying a foot is 11 inches while the rest of the country says it's 12.

But Microsoft thought to itself, "I'm going to invent my own standards for the Internet! So many people use my web browser that everyone will be forced to use my standards, and then I'll basically rule the Internet!"

But the people did not comply. Instead, they just stopped using Internet Explorer. And Microsoft learned a valuable lesson and has been playing catch-up ever since.

## What that means for today

...is that there's still some variety from browser to browser. It's most obvious in the default stylesheets browsers use. A "submit" button will look one way on Chrome and another way on Firefox. This is why, again, **you can't rely on default stylesheets**. If you want `<em>` elements to be italicized, you need to specify that in your CSS, because Apple might choose to make `<em>` elements in Safari underlined instead of italicized.

The biggest difference is in how Internet Explorer renders CSS versus how the rest of the world does it. It's fairly common for a web designer to make a page that looks beautiful in Chrome, then to open it in Internet Explorer, and to find that it now looks very different (although Internet Explorer's much better about this now than it used to be).

## Your best best

...is to guess what web browser your users are most likely to be using.

If you cater to a younger or more high-tech crowd, just worry about making your site look good on Chrome and Safari, and Firefox.

If you cater to old folks, the government, and those who are more likely to use whatever browser came with their computer, it would behoove you to test your site on Internet Explorer.

## A great site for testing compatibility

...is BrowserStack: https://www.browserstack.com
