# CSS The Definitive Guide

## 3. Sepcificity and the Cascade

### Sepcificity

- Cascading is determined by __specificity__ of each selector.
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
