# HTML and Computers

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

This is what we see in the Fresh Prince HTML copied above. This functions exactly like copying a stylesheet and pasting it inside `<style>` tags in the `<head>`, like we did just now.

# Paths

- `file://` vs `http://`
  - `file` looks on the current computer for a file; `http` makes a request to another computer
- Absolute vs relative paths
  - **Show** that `http://ga-dc.github.io/belair_biography/bball.jpg` and `bball.jpg` both work
    - First is absolute, second is relative
    - Relative is location relative the current file; absolute is location relative the entire internet
  - **Ask:** How do I get to the bathroom?
  - **If I told my mom in Montana how to get to this bathroom, what would I need to say?**
  - File navigation
    - `..` is go up one folder, `folder/` is go down

### You do: Navigate DC

On whiteboards!

https://github.com/ga-dc/dc_directory_tree
