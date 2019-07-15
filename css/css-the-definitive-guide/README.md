# CSS The Definitive Guide

## 3. Sepcificity and the Cascade

### Sepcificity

- Which CSS rule to be applied is determined by __specificity__ of each selector.
- Each specificity value can be expressed in 4 parts, e.g. `0, 0, 0, 0`.
- Every inline declaration => `+ 1, 0, 0, 0`
- Every ID attribute value in a  selector => `+ 0, 1, 0, 0`
- Every class attribute value, attribute selection, or pseudo-class in a selector => `+ 0, 0, 1, 0`.
  - This also applies to an attribute selector that targets an `id` attribute.
- Every element and pseudo-element in a selector => `+ 0, 0, 0, 1`.
- Universal selector (`*`) => `+ 0, 0, 0, 0`
- `!important` doesn't have a specificity value but always wins.

### Inheritance

- Some CSS properties aren't inherited. There is a [list](https://stackoverflow.com/questions/5612302/which-css-properties-are-inherited) of those properties.
- Inherited values have no specificity at all, not even zero specificity.

### The Cascade

Cascade rules:

- Find all rules that contain a selector that matches a given element.
- Sort all declarations applying to the given element by explicit weight. Those rules marked `!important` have a higher weight than those are not.
- Sort all declarations applying to the given element by origin. There are three basic origins: author, reader, and user agent. Under normal circumstances, the author’s styles win out over the reader’s styles. !important reader styles are stronger than any other styles, including !important author styles. Both author and reader styles override the user agent’s default styles.
- Sort all declarations applying to the given element by specificity. Those elements with a higher specificity have more weight than those with lower specificity.
- Sort all declarations applying to the given element by order. The later a declaration appears in the style sheet or document, the more weight it is given. Declarations that appear in an imported style sheet are considered to come before all declarations within the style sheet that imports them.
