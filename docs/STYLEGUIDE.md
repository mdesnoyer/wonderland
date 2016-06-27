# Style Guide

This document is very much work in progress, please help and if in doubt, lets talk about it.

## Language

- `Sign Up`, `Sign In`, `Sign Out` to be used in code to standardise how we talk about this process
- We use the terms `Owner` and `Guest` to refer to ownership of a Video.
  - If a User (Signed In OR Signed Out) is viewing their own Video, they are the `Owner`.
  - If a User (Signed In OR Signed Out) is viewing another User's Video then they are a `Guest`

## Javascript

- use `var` always, please use one var be definitions if possible
- Use NAMES_LIKE_THIS for constant values
- 4 spaces for tabs
- space before `{`
- semicolons at end of line `;` apart from declaration blocks where they should be on their own line
- single quotes for strings in Javascript `'bacon'` NOT `"bacon"`
- boolean variables and functions, where possible use the isSomething convention, e.g. `isCool()`

### JSX

- no spaces inside curly brackets, e.g. `{this.state.type}`, NOT `{ this.state.type }`
- close your tags, e.g. `<input type="text" />`, use one space before closing, NOT `<input type="text"/>`

If in doubt, defer to the code. If still in doubt, ask.

## Sass / CSS

[CSS Guidelines](http://cssguidelin.es/) is a good place to start.

- 1 line per selector
- BEM style where possible
- lowercase, use hyphens to separate
- Prefix numbers with leading zeroes, e.g. `0.2` rather than `.2`
- Avoid negative margins
- Use ems (relative units) wherever possible
- avoid the use of magic numbers, http://csswizardry.com/2012/11/code-smells-in-css/ has a good section on it
- have a `z-index` plan, randomly using values can be dangerous and cause future headaches
- `box-sizing: border-box` should be the default globally

```
.awesome,
.cool,
.fantastic {
    text-align: center;
}
```

- We avoid inline styles wherever possible

## Editors

- Sublime Text 3.0 is the preferred editor but you are fre to use your own.
- `Convert Indentations to Spaces` and `Indent using Spaces` and `Spaces: 4` are your friends in Sublime and there is a file in the root `Neon.sublime-project` which takes care of a lot of these.

## Browser Support

We should be supporting:

- current versions of major desktop browsers including those made by Apple (Safari), Google (Chrome), Microsoft (Edge), Mozilla Firefox and Opera.
- iOS 9: Safari, Google Chrome
- Android: Google Chrome on Android Emulator

We won't test in Blackberry, Opera Mini/Mobile, specific Android devices, Windows or other mobile browsers unless required.
