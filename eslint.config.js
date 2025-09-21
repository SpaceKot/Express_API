//npm uninstall eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier globals
//npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['**/*.test.ts', '**/*.spec.ts', 'dist/', 'node_modules/', 'tests/**/*.ts'], //Заработал jest и users.service.spec.ts
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: ['dist/', 'node_modules/', '**/*.test.ts', '**/*.spec.ts', 'tests/**/*.ts'], //Заработал jest и users.service.spec.ts
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      "@typescript-eslint/no-explicit-any":'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    }
  }
];