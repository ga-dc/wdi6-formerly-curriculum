# D3.js

http://d3js.org/

## The Possibilities are Endless

- http://www.jasondavies.com/animated-bezier/
- http://bl.ocks.org/mbostock/1136236
- http://animateddata.co.uk/lab/d3-tree/
- http://d3tetris.herokuapp.com/

>D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document. For example, you can use D3 to generate an HTML table from an array of numbers. Or, use the same data to create an interactive SVG bar chart with smooth transitions and interaction.

## Hello World

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js" charset="utf-8"></script>
```

```js
var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
  var paragraph = paragraphs.item(i);
  paragraph.style.setProperty("color", "white", null);
}
```

vs

```
d3.selectAll("p").style("color", "white");
```

## You do: D3 experiments in the console:

http://ga-dc.github.io/d3-console/

## We do: Let's make a bar chart

http://ga-dc.github.io/d3-bar-chart/

## You do: 