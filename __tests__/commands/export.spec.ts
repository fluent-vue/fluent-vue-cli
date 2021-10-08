import { sync as rimraf } from 'rimraf'

import fs from 'fs'
import path from 'path'

import ExportCommand from '../../src/commands/export'

interface FileInfo {
  filepath: string
  content: string
}

/**
 * Read files synchronously from a folder, with natural sorting
 * @param dir Absolute path to directory
 * @returns File content
 */
function readFilesSync (dir: string): FileInfo[] {
  return fs.readdirSync(dir)
    .flatMap(filename => {
      const filepath = path.resolve(dir, filename)
      const stat = fs.statSync(filepath)
      const isFile = stat.isFile()

      if (isFile) {
        const content = fs.readFileSync(filepath).toString()

        return { filepath: path.relative(process.cwd(), filepath), content }
      }

      return readFilesSync(filepath)
    })
}

describe('export', () => {
  let result: string | Uint8Array | undefined

  beforeEach(() => {
    result = undefined
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation((val: string | Uint8Array): boolean => {
        result = val
        return true
      })
  })

  afterEach(() => {
    jest.restoreAllMocks()

    rimraf('translations')
  })

  it('extracts ftl messages from .vue files', async () => {
    // Act
    await ExportCommand.run(['__tests__/fixtures/*.vue'])

    // Assert
    expect(result).toContain('Extracted messages from 2 files')

    readFilesSync('translations').forEach(file => {
      expect(file.content).toMatchSnapshot(file.filepath)
    })
  })
})
