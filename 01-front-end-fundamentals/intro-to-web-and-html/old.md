# Old stuff


  - is done with a completely different language, called CSS
  - Show RobertAKARobin.com source code
    - All my CSS is off in its own file. **Why?**

It makes code cleaner:
www2.warnerbros.com/spacejam/movie/jam.htm

### You do: Make the Fresh Prince website

http://ga-dc.github.io/belair_biography/

# Break!

## Wrapping up
- `<img src />` and `<a href>`
  - Attributes modify the element
- `<div>` and `<span>`
  - Elements to use when you're not sure what else to use
- `<iframe />`
  - A "window" to another webpage


## Styling

- Using CSS
  - http://ga-dc.github.io/belair_biography/belair.css
  - Anatomy
    - Selectors
      - "Select" an element for modification
    - Properties
      - The thing being modified
    - Values
      - To what the property is being set
  - Colors
    - RGB / Hex
    - A color is represented like this: `#ff00ff`
      - That's actually 3 values squished together
        - Each pixel has 3 lights: red, blue, green
        - The first two characters say how bright the red should be, then blue, then gree
        - This is in the hexadecimal, or base-16, system. The minimum is 00, and the maximum is `ff == 16 * 16 == 256`
      - `ff00ff` means "red is full-blast, green is off, and blue is full-blast"
        - That is: purple
      - Could also be written as `f0f`. `abc` means `aabbcc`

## Putting it all together
  - HTML is function, CSS is form, JS is behavior
  - Inspect in Chrome dev tools

## Homework

https://github.com/ga-dc/html_resume

## Quiz Questions

- Which of the following is the best way to center the text in div?
    - `<div><center></center></div>`
    - `<div align="center"></div>`
    - `<style>div{ text-align:center; }</style>`
    - `<div style="text-align:center;"></div>`
- Why do we write `<img />` and not `<img></img>`?
- Why is it important to keep semantics (HTML) separate from style (CSS)?



```css
*
{
  margin:0;
  border:0;
  padding:0;
  border-collapse:collapse;
  border-spacing:0;
  font-weight:inherit;
  font-size:inherit;
  font-style:inherit;
  color:inherit;
  box-sizing: border-box;
  font-family:inherit;
}
```
