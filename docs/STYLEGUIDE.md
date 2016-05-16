# Style Guide

## Language

- `Sign Up`, `Sign In`, `Sign Out` to be used in code to standardise how we talk about this process

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

- 1 line per selector

```
.awesome,
.cool,
.fantastic {
    text-align: center;
}
```

## Editors

- Sublime Text 3.0 is the preferred editor but you are fre to use your own.
- `Convert Indentations to Spaces` and `Indent using Spaces` and `Spaces: 4` are your friends in Sublime and there is a file in the root `Neon.sublime-project` which takes care of a lot of these.
