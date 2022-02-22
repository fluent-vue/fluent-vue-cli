import { stream } from 'fast-glob'
import { promises as fs } from 'fs'
import { dirname, basename, extname, sep, relative, join } from 'path'
import unixify from 'unixify'
import {getFtlMessages, mergeFtl, mergeVue} from '../..'

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

    const data = await fs.readFile(file)
    const ftlMessages = getFtlMessages(data.toString())

    if(checkExistingFtlFile(file.toString())) {
      const existingFtlData = await fs.readFile(realOutputPath + '.ftl')
      const newData = mergeFtl(existingFtlData.toString(), ftlMessages)

      await fs.writeFile(realOutputPath + '.ftl', newData)
    }
    else {
      const vueFile = await fs.readFile(realOutputPath)
      const newData = mergeVue(vueFile.toString(), locale, ftlMessages)

      await fs.writeFile(realOutputPath, newData)
    }
  }

  log(`Imported messages to ${count} files`)
}

const checkExistingFtlFile = (file: string):boolean => {
  const fileData = file.split('.')
  const locale = fileData[fileData.length - 2]
  return extname(file) === '.ftl' && locale !== 'vue'
}

