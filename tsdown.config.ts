import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/query.ts',
    'src/mutation.ts',
  ],
  clean: true,
  dts: true,
  // tsdown 0.23 emits .mjs when this is on; package exports point at .js.
  fixedExtension: false,
})
