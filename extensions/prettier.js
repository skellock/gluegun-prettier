const prettier = require('prettier')

const PRETTIER_DEFAULTS = {
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

/**
 * Attach to gluegun.
 *
 * @param {*} plugin - The gluegun plugin that is running.
 * @param {*} command - The command that is running.
 * @param {*} context - The gluegun context.
 */
function attach (plugin, command, context) {
  /**
   * Formats a string using prettier.
   *
   * @param {string} source - The source code to format.
   * @param {*} prettierOptions - The prettier options.
   * @return {string} The prettified code.
   */
  function format (source, prettierOptions) {
    if (!source) throw new Error('invalid source to format')
    prettierOptions = Object.assign(
      {},
      PRETTIER_DEFAULTS,
      prettierOptions || {}
    )

    return prettier.format(source, prettierOptions)
  }

  /**
   * Rewrites a file using prettier.  This overwrites the file if successful.
   *
   * @param {string} source - The source code to format.
   * @param {*} prettierOptions - The prettier options.
   * @return {string} The prettified code.
   */
  function reformat (pathToFile, prettierOptions) {
    if (!context.filesystem.exist(pathToFile)) {
      throw new Error(`${pathToFile} not found to make pretty`)
    }
    const source = context.filesystem.read(pathToFile)
    const formattedSource = format(source, prettierOptions)
    context.filesystem.write(pathToFile, formattedSource)
    return formattedSource
  }

  return {
    format,
    reformat
  }
}

module.exports = attach
