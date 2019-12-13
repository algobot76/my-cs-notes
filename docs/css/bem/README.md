# BEM

## Blocks, Elements, Modifiers

### Block

Standalone entity that is meaningful on its own. E.g. `header`, `container`, `menu`, `checkbox`, `input`.

### Element

A part of block that has no standalone meaning and is semantically tied to its block. E.g. `menu item`, `list item`, `checkbox caption`, `header title`.

### Modifier

A flag on a block or element. Use them to change appearance or behavior. E.g. `disabled`, `highlighted`, `checked`, `fixed`, `size big`, c`olor yellow`.

## BEM by Example

### Component with No Elements or Modifiers

```html
<button class=”btn”></button>

<style>
  .btn {}
</style>
```

### Component with a Modifier

```html
<!-- DO THIS -->
<button class="btn btn--secondary"></button>

<style>
  .btn {
    display: inline-block;
    color: blue;
  }
  .btn--secondary {
    color: green;
  }
</style>
```

```html
<!-- DON'T DO THIS -->
<button class="btn--secondary"></button>

<style>
  .btn--secondary {
    display: inline-block;
    color: green;
  }
</style>
```

### Component with Elements

```html
<!-- DO THIS -->
<figure class="photo">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">
    <blockquote class="photo__quote">
      Look at me!
    </blockquote>
  </figcaption>
</figure>

<style>
  .photo { }
  .photo__img { }
  .photo__caption { }
  .photo__quote { }
</style>
```

```html
<!-- DON'T DO THIS -->
<figure class="photo">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">
    <blockquote class="photo__caption__quote"> <!-- never include more than one child element in a class name -->
      Look at me!
    </blockquote>
  </figcaption>
</figure>

<style>
  .photo { }
  .photo__img { }
  .photo__caption { }
  .photo__caption__quote { }
</style>
```

### Components with Modifiers

```html
<figure class="photo">
  <img class="photo__img photo__img--framed" src="me.jpg">
  <figcaption class="photo__caption photo__caption--large">Look at me!</figcaption>
</figure>

<style>
  .photo__img--framed {
    /* incremental style changes */
  }
  .photo__caption--large {
    /* incremental style changes */
  }
</style>
```

### Multi-Word Names

```html
<!-- DO THIS -->
<div class="some-thesis some-thesis--fast-read">
  <div class="some-thesis__some-element"></div>
</div>

<style>
  .some-thesis { }
  .some-thesis--fast-read { }
  .some-thesis__some-element { }
</style>
```

```html
<!-- DON'T DO THIS -->
// These class names are harder to read
<div class="somethesis somethesis--fastread">
  <div class="somethesis__someelement"></div>
</div>

<style>
  .somethesis { }
  .somethesis--fastread { }
  .somethesis__someelement { }
</style>
```

## References

- [http://getbem.com](http://getbem.com)
- [https://seesparkbox.com/foundry/bem_by_example](https://seesparkbox.com/foundry/bem_by_example)
