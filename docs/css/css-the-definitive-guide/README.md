# CSS: The Definitive Guide

[[toc]]

## Chapter 2. Selectors

### Basic Style Rules

#### Element Selectors

An element selector is a selector of HTML elements.

```css
quote {color: gray;}
bib {color: red;}
booktitle {color: purple;}
myElement {color: red;}
```

#### Declarations and Keywords

```css
.box {box-shadow: inset -1px -1px white,
                  3px 3px 3px rgba(0,0,0,0.2);
      background-image: url(myimage.png),
          linear-gradient(180deg, #FFF 0%, #000 100%);
      transform: translate(100px, 200px);
}
a:hover {transition: color, background-color 200ms ease-in 50ms;}
```

### Grouping

#### Grouping Selectors

```css
/* group 1 */
h1 {color: silver; background: white;}
h2 {color: silver; background: gray;}
h3 {color: white; background: gray;}
h4 {color: silver; background: white;}
b {color: gray; background: white;}

/* group 2 */
h1, h2, h4 {color: silver;}
h2, h3 {background: gray;}
h1, h4, b {background: white;}
h3 {color: white;}
b {color: gray;}

/* group 3 */
h1, h4 {color: silver; background: white;}
h2 {color: silver;}
h3 {color: white;}
h2, h3 {background: gray;}
b {color: gray; background: white;}
```

#### The Universal Selector

The universal selector (`*`) matches any element.

- It can have unintended consequences.

#### Grouping Declarations

```css
h1 {
  font: 18px Helvetica;
  color: purple;
  background: aqua;
}
```

#### Grouping Everything

```css
h1, h2, h3, h4, h5, h6 {color: gray; background: white; padding: 0.5em;
  border: 1px solid black; font-family: Charcoal, sans-serif;}
```

### Class and ID Selectors

#### Class Selectors

A class selector selects elements by its `class` attribute:

- Always preceded by a period (`.`).

```html
<p class="warning">When handling plutonium, care must be taken to avoid
the formation of a critical mass.</p>
<p>With plutonium, <span class="warning">the possibility of implosion is
very real, and must be avoided at all costs</span>. This can be accomplished
by keeping the various masses separate.</p>
```

```css
.warning {font-weight: bold;}
```

A class selector can be combined with element selectors:

```css
p.warning {font-weight: bold;}
span.warning {font-style: italic;}
```

#### Multiple Classes

```css
p.warning.help {background: red;}
```

The above multiple class selector matches the following:

```html
<p class="urgent warning help">Help me!</p>
```

#### ID Selectors

An ID selector selects an element by its `id` attribute:

- Always preceded by `#`.

```html
<p id="lead-para">This paragraph will be boldfaced.</p>
<p>This paragraph will NOT be bold.</p>
```

```css
#lead-para {font-weight: bold;}
```

#### Deciding Between Class and ID

- ID selectors cannot be combined with other IDs.
- IDs have more weight than classes.
- Class and ID selectors are case-sensitive.

### Attribute Selectors

#### Simple Attribute Selectors

A simple attribute selector selects elements that have a certain attribute:

```html
<a href="http://www.w3.org/" title="W3C Home">W3C</a><br />
<a href="http://www.webstandards.org">Standards Info</a><br />
<a title="Not a link">dead.letter</a>
```

```css
a[href][title] {font-weight: bold;}
```

#### Selection Based on Exact Attribute Value

```html
<a href="http://www.w3.org/" title="W3C Home">W3C</a><br />
<a href="http://www.webstandards.org"
  title="Web Standards Organization">Standards Info</a><br />
<a href="http://www.example.org/" title="W3C Home">dead.link</a>
```

```css
a[href="http://www.w3.srg/"][title="W3C Home"] {font-size: 200%;}
```

- Only applied to the first `a` element.

```css
p[class="urgent warning"] {font-weight: bold;}
```

- Only selects any `p` element whose `class` attributes has exactly the value `"urgent warning"`.

#### Selection Based on Partial Attribute Values

| Type           |                                                                   Description                                                                   |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------: |
| `[foo~="bar"]` |               Selects any element with an attribute `foo` whose value contains the word `bar` in a space-separated list of words.               |
| `[foo*="bar"]` |                              Selects any element with an attribute `foo` whose value contains the substring `bar`.                              |
| `[foo^="bar"]` |                                   Selects any element with an attribute `foo` whose value begins with `bar`.                                    |
| `[foo$="bar"]` |                                    Selects any element with an attribute `foo` whose value ends with `bar`.                                     |
| `[foo|="bar"]` | Selects any element with an attribute `foo` whose value starts with `bar` followed by a dash (U+002D) or whose value is exactly equal to `bar`. |

#### The Case Insensitivity Identifier

Including an `i` before `]` will allow a selector to match attribute values (not including attribute names) case-insensitively.

### Using Document Structure

#### Understanding the Parent-Child Relationship

![A document tree structure](./img/css4_0215.png)

- An element is a parent of another element if it appears directly above that element in the document hierarchy.
- An element is the child of another element if it is directly beneath the other element.
- The `html` element is the root element.

#### Descendant Selectors

A descendent selector (contextual selector) is composed of two+ space-separated selectors.

- The space between the selectors is a combinator, which could mean "found within", "which is part of", or "that is a descendent of" (right to left).
- Degree of separation between two elements can be infinite.
- The closeness of two elements within the document tree has no bearing on whether a rule applies or not.

```css
ul ol ul em {color: gray;}
```

#### Selecting Children

The child combinator (`>`) can be used to select a child.

- Can be used together with descendant selectors.

```html
<h1>This is <strong>very</strong> important.</h1>
<h1>This is <em>really <strong>very</strong></em> important.</h1>
```

```css
h1 > strong {color: red;}
```

- Only the first `strong` element is selected.

#### Selecting Adjacent Sibling Elements

The adjacent-sibling combinator (`+`) can be used to select a sibling element (note: must be the same parent).

- Text content between two elements does not prevent `+` from working.

```html
<div>
  <ol>
    <li>List item 1</li>
    <li>List item 1</li>
    <li>List item 1</li>
  </ol>
  This is some text that is part of the 'div'.
  <ul>
    <li>A list item</li>
    <li>Another list item</li>
    <li>Yet another list item</li>
  </ul>
</div>
```

```css
li + li {font-weight: bold;},
```

- Last two `li` elements in `ol` and last two `li` elements in `ul` are selected.

#### Selecting Following Siblings

A general sibling combinator (`~`) selects any element that follows another element when both elements share the same parent.

```html
<div>
  <h2>Subheadings</h2>
  <p>It is the case that not every heading can be a main heading.  Some headings
  must be subheadings.  Examples include:</p>
  <ol>
    <li>Headings that are less important</li>
    <li>Headings that are subsidiary to more important headlines</li>
    <li>Headings that like to be dominated</li>
  </ol>
  <p>Let's restate that for the record:</p>
  <ol>
    <li>Headings that are less important</li>
    <li>Headings that are subsidiary to more important headlines</li>
    <li>Headings that like to be dominated</li>
  </ol>
</div>
```

```css
h2 ~ol {font-style: italic;}
```

- `ol` elements are italicized even `h2` and `ol` are not adjacent siblings.
