import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', '.ssr-dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    ...reactHooks.configs.flat.recommended,
  },
  {
    files: ['scripts/**/*.{ts,mjs}', 'tests/**/*.ts', 'vite.config.ts'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly' } },
  },
)
