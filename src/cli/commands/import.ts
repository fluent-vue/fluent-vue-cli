import { stream } from 'fast-glob'
import { promises as fs } from 'fs'
import { resolve, dirname, basename, extname, sep, relative, join } from 'path'
import unixify from 'unixify'
import { getFtlMessages, mergeVue } from '../..'

interface Options {
  outDir: string,
  inDir: string
}

const log = console.log.bind(console)

export const run = async (flags: Options) => {
  let count = 0
  for await (const file of stream(unixify(flags.inDir) + '/**', {ignore: ['**/node_modules']})) {
    count ++
    const fileString = file.toString()
    const fileDirName= dirname(file.toString())

    const vueComponentName = basename(fileString).replace(extname(fileString), '')
    const outputPath = join(relative(flags.inDir, fileDirName), vueComponentName)
    const [locale, ...rest] = outputPath.split(sep)
    const realOutputPath = join(flags.outDir, rest.join(sep))

    const vueFile = await fs.readFile(realOutputPath)
    const data = await fs.readFile(file)
    const ftlMessages = getFtlMessages(data.toString())
    const newData = mergeVue(vueFile.toString(), locale, ftlMessages)

    await fs.writeFile(realOutputPath, newData)
  }

  log(`Imported messages to ${count} files`)
}

