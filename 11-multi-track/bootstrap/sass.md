

I'm going to make a new stylesheet called `captainVonBootsTrapp.scss` that contains this:

```scss
@import "../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";

input,
textarea {
  @extend .form-control;
}
label {
  @extend .control-label;
}
fieldset {
  @extend .form-group;
}
.form-horizontal{
  label{
    @extend .col-sm-3;
  }
  div{
    @extend .col-sm-9;
  }
}
```

Then I'll `touch captainVonBootsTrapp.css`.

Finally, `sass captainVonBootsTrapp.scss captainVonBootsTrapp.css`

Now I only need to `<link rel="stylesheet" href="assets/stylesheets/captainVonBootsTrapp.css" />` and I get **all** of Bootstrap **plus** the changes I made!

This lets me drastically DRY up that form HTML from before:

```html
<form class="grumbleForm">
  <div class="form-horizontal">
    <fieldset>
      <label>Title:</label>
      <div><input type="text" name="title" value="{{ title }}"></div>
    </fieldset>
    <fieldset>
      <label>By:</label>
      <div><input type="text" name="authorName" value="{{ authorName }}"></div>
    </fieldset>
    <fieldset>
      <label>Content:</label>
      <div><textarea name="content">{{ content }}</textarea></div>
    </fieldset>
    <fieldset>
      <label>Photo URL:</label>
      <div><input type="text" name="photoUrl" value="{{ photoUrl }}"></div>
    </fieldset>
    <fieldset>
      <label>&nbsp;</label>
      <div>
        <button class="btn submit btn-primary">Submit</button>
        <button class="btn cancel">Cancel</button>
      </div>
    </fieldset>
  </div>
</form>
```
