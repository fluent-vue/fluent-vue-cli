import cac from 'cac'

import { run as runExport } from './commands/export'

import { run as runImport } from './commands/import'

const cli = cac('fluent-vue')

cli
  .command('export', 'Exports translation from Vue.js SFC files into ftl files.')
  .option('--in-dir', 'Input directory with vue files', { default: 'example/' })
  .option('--out-dir', 'Output directory for extracted ftl files', { default: 'translations/' })
  .option('--clean', 'Whether to clean output directory', { default: true })
  .action(runExport)

cli
  .command('import', 'Import translation from ftl files into Vue.js SFC')
  .option('--in-dir', 'Input directory with ftl files', { default: 'translations/' })
  .option('--out-dir', 'Output directory for extracted vue files', { default: 'example/' })
  .action(runImport)

cli.help()

cli.parse()
