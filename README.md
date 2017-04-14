# gluegun-prettier

## format

Formats a string containing JavaScript code through prettier.

```js
const prettierCode = context.prettier.format("console.log ('hi!!' )")
```

## reformat

Reformats an existing file through prettier.

```js
context.prettier.reformat('/path/to/file')
```

## Prettier Options

Both `format` and `reformat` accept a 2nd parameter with [overrides](https://github.com/prettier/prettier#api) for prettier's formatting options.

These are the default options.

```js
{
  useTabs: false,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: 'babylon',
  semi: true
}
```
