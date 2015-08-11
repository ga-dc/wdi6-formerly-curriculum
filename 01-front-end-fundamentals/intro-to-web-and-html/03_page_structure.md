# Structure of a webpage

## The Joke page, in good HTML
```html
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
```

Note that I've separated things into `<header>`, `<main>`, and `<footer>`. The `main` stands for "main content". Most webpages are split into these three sections.

This *looks* pretty good. But we can actually...

## Check to make sure the HTML is good

`http://w3.validator.org` lets you paste in HTML, and tells you what's wrong with it. If we paste in the code above, it yells at us about a lot of things.

The problem is there are certain elements *every* webpage needs to have. The complete version of my joke page would look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Sweet Joke Page</title>
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

- `<!DOCTYPE html>`: The first line on every single webpage. This really bothers me. It doesn't look like other tags. You don't need to close it. Its job is to tell the browser, "Hey, everything after this is HTML." Aside from knowing that you need to have this as the first line of every webpage, you can ignore it.

- `<html>`: The *second* line on every webpage. `</html>` is the *last* line on every webpage.

- `<head>`: Every webpage has two main "body parts": the `<head>` and the `<body>`. The `head` contains **meta-data**: that is, data the user won't actually see in the webpage. There are a couple different things we can put in here, but for now we'll stick with...

- `<title>`: The name of the webpage as it appears at the top of the window, or in your bookmarks bar, or history, or in Google searches. It's in the `<head>` because it *doesn't actually show up on the webpage itself*.

- `<body>`: Where all everything you "see" lives.

## You must have exactly one of each of these elements on every webpage.

##### Quick review: What's the difference between `<head>`, `<h1>` (headline), and `<header>`?

[Insert Fresh Prince exercise here](https://github.com/ga-dc/belair_biography)

[Homework: HTML_Resume](https://github.com/ga-dc/html_resume)
