module.exports = {
  root: true,
  plugins: ['import', 'react-hooks'],
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       paths: ['src'],
  //       alias: {
  //         assets: './assets',
  //         components: './components',
  //       },
  //     },
  //   },
  // },
  rules: {
    'react-native/no-inline-styles': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    /*'@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-submodule-imports': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/jsx-no-lambda': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-console': 'off',
    'sort-keys': 'off',
    'sort-imports': 'off', */
  },
};
