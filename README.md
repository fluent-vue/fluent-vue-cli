fluent-vue-cli
==============

fluent-vue CLI to manage translation resources

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fluent-vue-cli.svg)](https://npmjs.org/package/fluent-vue-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fluent-vue-cli.svg)](https://npmjs.org/package/fluent-vue-cli)
[![License](https://img.shields.io/npm/l/fluent-vue-cli.svg)](https://github.com/Demivan/fluent-vue-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g fluent-vue-cli
$ fluent-vue-cli COMMAND
running command...
$ fluent-vue-cli (-v|--version|version)
fluent-vue-cli/0.0.0 linux-x64 node-v16.8.0
$ fluent-vue-cli --help [COMMAND]
USAGE
  $ fluent-vue-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fluent-vue-cli export FILES`](#fluent-vue-cli-export-files)
* [`fluent-vue-cli help [COMMAND]`](#fluent-vue-cli-help-command)

## `fluent-vue-cli export FILES`

Exports translation from Vue.js SFC files into ftl files.

```
USAGE
  $ fluent-vue-cli export FILES

ARGUMENTS
  FILES  list of Vue.js files

OPTIONS
  -c, --clean          clean output directory
  -d, --outDir=outDir  [default: translations] output directory
  -h, --help           show CLI help

EXAMPLE
  $ fluent-vue-cli export **/*.src --outDir translations/
```

_See code: [src/commands/export.ts](https://github.com/Demivan/fluent-vue-cli/blob/v0.0.0/src/commands/export.ts)_

## `fluent-vue-cli help [COMMAND]`

display help for fluent-vue-cli

```
USAGE
  $ fluent-vue-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
