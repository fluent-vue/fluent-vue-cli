import { Command, flags } from '@oclif/command'
import { stream } from 'fast-glob'
import { promises as fs, existsSync } from 'fs'
import { resolve, dirname } from 'path'

import { getVueMessages, mergeFtl } from '..'

export default class Export extends Command {
  static description = 'Exports translation from Vue.js SFC files into ftl files.'

  static examples = [
    `$ fluent-vue-cli export **/*.src --outDir translations/`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    outDir: flags.string({ name: 'out-dir', char: 'd', description: 'output directory', default: 'translations' }),
    clean: flags.boolean({ name: 'clean', char: 'c', description: 'clean output directory', default: true })
  }

  static args = [{
    name: 'FILES',
    description: 'list of Vue.js files',
    required: true
  }]

  static strict = false

  async run() {
    const { argv, flags } = this.parse(Export)

    for await (const file of stream(argv)) {
      const data = await fs.readFile(file)

      const vueMessages = getVueMessages(data.toString())

      for (const { locale, source, messages } of vueMessages) {
        const outputPath = resolve(flags.outDir, locale, `${file}.ftl`)

        await fs.mkdir(dirname(outputPath), { recursive: true })

        if (flags.clean || !existsSync(outputPath)) {
          console.log('clean')
          await fs.writeFile(outputPath, source)
        } else {
          console.log('merge')
          const existingFtlData = await fs.readFile(outputPath)

          const newData = mergeFtl(existingFtlData.toString(), messages)

          await fs.writeFile(outputPath, newData)
        }
      }
    }
  }
}
