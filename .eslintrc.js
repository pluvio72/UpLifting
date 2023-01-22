module.exports = {
  root: true,
  extends: [
    '@react-native-community/eslint-config', // Default RN config
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Required for Standard plugin
  },
};
