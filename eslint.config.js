// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.specstory/**',
  ],
}, {
  files: ['test/**/*.ts'],
  rules: {
    'no-console': 'off',
  },
})
