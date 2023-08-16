import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['src/http/**', './prisma/prisma-test-environment.js']
    ],
    dir: 'src'
  }
})
