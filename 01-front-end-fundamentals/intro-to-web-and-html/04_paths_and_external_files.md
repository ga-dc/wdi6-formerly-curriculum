# Paths and external files

You can make a complete webpage without being connected to the Internet. First, open a new plain text file, and paste into it the source of that Will Smith page:

https://github.com/ga-dc/belair_biography/blob/master/index.html

Then, save your file to your Desktop (or somewhere) as "belair.html".

Finally, drag and drop that `belair.html` file onto your web browser's icon.

It works! Sort of.

##### What isn't working?
- The image is broken
- The styles aren't working

But note that there are still some styles -- the `<h1>` is big and the `<strong>` is bold. These is caused by the browser's **default stylesheet**. Google made up a stylesheet for Chrome to use when you, the web designer, doesn't give it a different one to use. Microsoft did the same for Internet Explorer.

## Default stylesheets are all different.

Internet Explorer will make things look slightly different from Chrome. This is why you *can't rely on default stylesheets*. Any CSS you write will override the browser's default stylesheet. If you want things that are `<strong>` to show up bold, you'd better include that in your CSS.

Web designers often use **CSS normalizers** to completely remove the effects of the default stylesheet. A popular one is `normalize.css`.

So how can I get the styles back?

## There are three ways to write styles

### The first is to give an element a `style` attribute

```html
<div style="color: red;">What does a cloud wear on its butt?</div>
```

This is just taking some CSS and putting it in the HTML.

##### Why might this be discouraged?

It's an awful lot like putting `<orange>` in your HTML: it puts style and semantics in the same place and makes your code hard to read.

### The second is to use an inline stylesheet

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Sweet Joke Page</title>
    <style>
      h2{
        color: red;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Robin's Favorite Jokes</h1>
    </header>
    <main>
      <ul class="jokes">
        <li>
          <h2>What does a cloud wear on its butt?</h2>
          <p>Thunderpants.</p>
        </li>
        <li>
          <h2>What do you call a cow with no legs?</h2>
          <p>Ground beef.</p>
        </li>
      </ul>
    </main>
    <footer>
      <p><a href="mailto:hello@robertakarobin.com">Contact me!</a></p>
    </footer>
  </body>
</html>
```

This keeps semantics and style much more separate. But stylesheets tend to get really, really long. That would make this page annoying to edit.

### The third is to use an external stylesheet

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Sweet Joke Page</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    ...
  </body>
</html>
```

And in a file called `styles.css`:
```css
h2{
  color: red;
  text-decoration: underline;
}
```

This is what we see in the Fresh Prince HTML copied above. We're using the `<link>` tag to "grab" another file and include it in this one -- giving it the *relation* of `stylesheet`. This is exactly like copying a stylesheet and pasting it inside `<style>` tags in the `<head>`, like we did in the previous example.

This is the tidiest and "best" way to use styles.

So why isn't it working?

## The browser can't find the file!

We have `<link rel="stylesheet" href="styles.css" />`, but the browser can't find the `styles.css` file by following those directions. This is the same reason the image is broken: the browser can't find `bball.jpg`.

This is an example of a **relative path**. Its opposite is an **absolute path**.

##### How would you give me directions to the 8th floor bathroom from this classroom?
##### How would you give me directions to the 8th floor bathroom if I was at my parents' house in Montana?
##### How would you give me directions to the 8th floor bathroom if I were to spontaneously generate at a random point in the Universe?

A *relative path* tells you how to get somewhere from your current frame of reference. An *absolute path* tells you how to get somewhere from the *most general frame of reference you could possibly have*.

My mailing address is an absolute path. It gives directions as if my frame of reference was the entire US, instead of specifically Washington, DC.

But it's also a relative path, because my frame of reference could be even more general. What if I was in another country?

An absolute path on the Internet says where to retrieve a file relative *the entire Internet*. They always begin with `http://`, `https://`, or something similar. You might see `file://`, which is an absolute path saying where to retrieve a file relative your computer.

The absolute path for a webpage is shown in your browser's address bar. If I look at the Fresh Prince webpage on my desktop, its path is:

```
file:///Users/robertthomas/Desktop/belair.html
```

If you were to paste that into your web browser, your browser would look inside the `Users` folder on your computer for a `robertthomas` folder, then `Desktop`, then `belair.html`... and presumably it wouldn't find anything!

`bball.jpg`, by itself, is a relative path. It tells the browser, "look inside the folder you're currently in for a file called `bball.jpg`". The browser will then look inside the folder that contains your `belair.html` -- that is, your Desktop folder -- for `bball.jpg`... and won't find it.

In a path, a slash `/` means "go inside this folder". The browser interprets the thing after the last slash as a file it's supposed to try to open. So if you write `images/bball.jpg`, the browser is going to look inside your Desktop for another folder called `images`, and then inside that for `bball.jpg`... and still won't find it.

You can go *outside* a folder by writing two dots `..`. If you write `../bball.jpg`, that means "look inside the folder that *contains* my Desktop for a file called `bball.jpg`". `../../../bball.jpg` would mean "go 'up' three folders and look for `bball.jpg`".

To make this webpage work, you either need to replace the image's `src` with the absolute path `http://ga-dc.github.io/belair_biography/bball.jpg`, or you need to make the relative path work by downloading `bball.jpg` and putting it in the same folder with your `belair.html`. Same for the `styles.css`.

[Insert DC Tree navigation here](https://github.com/ga-dc/dc_directory_tree)
