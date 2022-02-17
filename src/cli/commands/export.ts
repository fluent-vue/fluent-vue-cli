import { stream } from 'fast-glob'
import { promises as fs, existsSync } from 'fs'
import { resolve, dirname } from 'path'

import { getVueMessages, mergeFtl } from '../..'

interface Options {
  outDir: string
  clean: boolean
}

const log = console.log.bind(console)

export const run = async (argv: any[], flags: Options) => {
  let count = 0
  for await (const file of stream(argv)) {
    count ++
    const data = await fs.readFile(file)

    const vueMessages = getVueMessages(data.toString())

    for (const { locale, source, messages } of vueMessages) {
      const outputPath = resolve(flags.outDir, locale, `${file}.ftl`)

      await fs.mkdir(dirname(outputPath), { recursive: true })

      if (flags.clean || !existsSync(outputPath)) {
        await fs.writeFile(outputPath, source)
      } else {
        const existingFtlData = await fs.readFile(outputPath)

        const newData = mergeFtl(existingFtlData.toString(), messages)

        await fs.writeFile(outputPath, newData)
      }
    }
  }

  log(`Extracted messages from ${count} files`)
}
