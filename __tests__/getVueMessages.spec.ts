import { promises as fs } from 'fs'
import { resolve } from 'path'

import { getVueMessages, MessagesWithLocale } from '../src'

describe('getVueMessages', () => {
  it('extracts locale messages from SFC', async () => {
    // Arrange
    const source = await fs.readFile(resolve(__dirname, 'fixtures', './Simple.vue'))

    // Act
    const messages = getVueMessages(source.toString())

    // Assert
    expect(messages).toHaveLength(1)
    expect(messages).toMatchInlineSnapshot(`
Array [
  Object {
    "locale": "en",
    "messages": Object {
      "aria-key": "Aria value",
      "greeting": "Hello, { $name }
    .aria-label = Label value",
      "user-name": "World",
    },
    "source": "user-name = World
aria-key = Aria value
greeting = Hello, {$name}
  .aria-label = Label value
",
  },
]
`)
  })

  it('extracts multiple SFC blocks', async () => {
    // Arrange
    const source = await fs.readFile(resolve(__dirname, 'fixtures', './Multiple.vue'))

    // Act
    const messages = getVueMessages(source.toString())

    // Assert
    expect(messages).toHaveLength(2)
    expect(messages).toMatchInlineSnapshot(`
Array [
  Object {
    "locale": "en",
    "messages": Object {
      "aria-key": "Aria value",
      "greeting": "Hello, { $name }
    .aria-label = Label value",
      "user-name": "World",
    },
    "source": "user-name = World
aria-key = Aria value
greeting = Hello, {$name}
  .aria-label = Label value
",
  },
  Object {
    "locale": "uk",
    "messages": Object {
      "aria-key": "Значення aria",
      "greeting": "Привіт, { $name }
    .aria-label = Значення мітки",
      "user-name": "Світ",
    },
    "source": "user-name = Світ
aria-key = Значення aria
greeting = Привіт, {$name}
  .aria-label = Значення мітки
",
  },
]
`)
  })

  it('throws if fluent block does not have locale', () => {
    // Arrange
    const source = `
<fluent>
key = value
</fluent>
`

    // Act
    const func = (): MessagesWithLocale[] => getVueMessages(source)

    // Assert
    expect(func).toThrowError('fluent custom block does not have locale specified')
  })

  it('ignores non-fluent blocks', () => {
    // Arrange
    const source = `
<fluent locale="en">
key = value
fluent-key = fluent value
</fluent>

<i18n>
{
  "en": {
    "key": "value",
    "i18n-key": "i18n value"
  }
}
</i18n>
`

    // Act
    const messages = getVueMessages(source)

    // Assert
    expect(messages).toMatchInlineSnapshot(`
Array [
  Object {
    "locale": "en",
    "messages": Object {
      "fluent-key": "fluent value",
      "key": "value",
    },
    "source": "key = value
fluent-key = fluent value
",
  },
]
`)
  })
})
