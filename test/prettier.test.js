const test = require('ava')
const extension = require('../extensions/prettier')
const sinon = require('sinon')

test('gluegun interface', t => {
  const ext = extension(null, null, {})

  t.is(typeof ext.format, 'function')
  t.is(typeof ext.reformat, 'function')
})

test('handles crap input', t => {
  const { format } = extension(null, null, {})

  t.throws(() => format(null))
  t.throws(() => format({}))
  t.throws(() => format([]))
  t.throws(() => format(undefined))
  t.throws(() => format(3))
  t.throws(() => format(() => true))
  t.throws(() => format(';'))
})

test('formats strings', t => {
  const { format } = extension(null, null, {})
  const actual = format(`console.log ('hi')`)

  t.is(actual, `console.log("hi");\n`)
})

test('formats strings with options', t => {
  const { format } = extension(null, null, {})
  const options = { semi: false, singleQuote: true }
  const actual = format(`console.log ('hi')`, options)

  t.is(actual, `console.log('hi')\n`)
})

test('reformats files', t => {
  const read = sinon.stub().returns(`console.log ('hi')`)
  const write = sinon.spy()
  const exist = sinon.stub().returns(true)
  const filePath = '/some/path'
  const filesystem = { read, write, exist }
  const context = { filesystem }
  const { reformat } = extension(null, null, context)
  const actual = reformat(filePath)
  const expected = `console.log("hi");\n`

  t.is(actual, expected)
  t.is(write.callCount, 1)
  t.is(write.args[0][0], filePath)
  t.is(write.args[0][1], expected)
})

test('ensures files exist before replacing', t => {
  const exist = sinon.stub().returns(false)
  const context = { filesystem: { exist } }
  const { reformat } = extension(null, null, context)
  t.throws(() => reformat('/somewhere'), Error)
})
