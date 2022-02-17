import cac from 'cac'

import { run as runExport } from './commands/export'

const cli = cac('fluent-vue')

cli
  .command('export <files>', 'Exports translation from Vue.js SFC files into ftl files.')
  .option('--out-dir', 'Output directory for extracted ftl files', { default: 'translations/' })
  .option('--clean', 'Whether to clean output directory', { default: true })
  .action(runExport)

cli.help()

cli.parse()
