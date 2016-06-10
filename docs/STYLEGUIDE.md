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