import { stream } from 'fast-glob'
import { promises as fs, existsSync } from 'fs'
import { dirname, join, relative, extname} from 'path'
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
  for await (const file of stream(unixify(flags.inDir) + '/**', {ignore: ['**/node_modules', unixify(flags.outDir)]})) {
    count ++
    const data = await fs.readFile(file)
    const isVueFile = extname(file.toString()) === '.vue'
    const isFtlFile = extname(file.toString()) === '.ftl'
    if(isVueFile) {
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
    else if(isFtlFile) {
      const fileData = file.toString().split('.')
      const locale = fileData[fileData.length - 2]
      const outputPath = join(flags.outDir, locale, relative(flags.inDir, `${file}`))
      await fs.mkdir(dirname(outputPath), { recursive: true })
      await fs.copyFile(file, outputPath)
    }
  }

  log(`Extracted messages from ${count} files`)
}
