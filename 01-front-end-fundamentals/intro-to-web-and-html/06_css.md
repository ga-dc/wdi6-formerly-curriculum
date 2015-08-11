# CSS



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
