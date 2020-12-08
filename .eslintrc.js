module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'template-curly-spacing': 'off',
    'indent': ['error', 2, {
      'ignoredNodes': ['TemplateLiteral'],
      'SwitchCase': 1
    }],
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'import/order': ['error', {
      'newlines-between': 'always',
      'groups': ['builtin', 'external', 'parent', 'sibling', 'index']
    }],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', { 'vue': 'never', 'js': 'never' }]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],

  globals: {
    _: true
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue', '.json']
      }
    }
  }
}
