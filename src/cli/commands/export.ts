import { stream } from 'fast-glob'
import { promises as fs, existsSync } from 'fs'
import {resolve, dirname, join, relative} from 'path'
import unixify from 'unixify'
import { getVueMessages, mergeFtl } from '../..'

interface Options {
  inDir: string
  outDir: string
  clean: boolean
}

const log = console.log.bind(console)

export const run = async (flags: Options) => {
  let count = 0
  for await (const file of stream(unixify(flags.inDir) + '/**', {ignore: ['**/node_modules']})) {
    count ++
    const data = await fs.readFile(file)

    const vueMessages = getVueMessages(data.toString())
    for (const { locale, source, messages } of vueMessages) {
      const outputPath = join(flags.outDir, locale, relative(flags.inDir, `${file}.ftl`))
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
