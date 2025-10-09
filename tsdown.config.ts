import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/query.ts',
    'src/mutation.ts',
  ],
  clean: true,
  dts: true,
})
