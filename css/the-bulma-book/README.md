# Creating Interfaces with Bulma

## 1. Understanding Bulma terminology, and concepts

### Customizable

You can override the initial variables of Bulma.

```sass
// 1. Import the initial variables
@import "../sass/utilities/initial-variables"
@import "../sass/utilities/functions"

// 2. Set your own initial variables
// Update blue
$blue: #72d0eb

// Add pink and its invert
$pink: #ffb3b3
$pink-invert: #fff

// Add a serif family
$family-serif: "Merriweather", "Georgia", serif

// 3. Set the derived variables
// Use the new pink as the primary color
$primary: $pink
$primary-invert: $pink-invert

// Use the existing orange as the danger color
$danger: $orange

// Use the new serif family
$family-primary: $family-serif

// 4. Import the rest of Bulma
@import "../bulma"
```

### Columns

- [Columns Basics](https://bulma.io/documentation/columns/basics/)

### Modular

Import the parts you want to use, e.g. I only want `columns` and `column` from Bulma.

```sass
@import "bulma/sass/utilities/_all"
@import "bulma/sass/grid/columns"
```

### Modifiers

```html
<button class="button is-primary is-outlined">I'm a button</button>
```

- `is-primary` and `is-outlined` are modifier classes to change the appearance of the button.

### Components

__Components__ are pre-styled chunks of code used to serve a certain purpose.

```html
<div class="card">

  <header class="card-header">
    <!-- header content -->
  </header>

  <div class="card-content">
    <div class="card-image">
      <!-- card image -->
    </div>
  </div>

  <footer class="card-footer">
    <!-- footer content -->
  </footer>
</div>
```

### Helper Classes

__Helper classes__ are used to _help_ structure your content and/or your interface. E.g. `is-marginless`, `is-unselectable`, and `is-pulled-left`.