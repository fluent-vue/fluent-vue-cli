import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/cli/index.ts'],
  format: ['cjs'],
  splitting: true,
  clean: true,
  dts: true,
})
