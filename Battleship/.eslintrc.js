module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'editorconfig',
        'react',
        'react-hooks'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        'editorconfig/editorconfig': [
            'error',
            {
                'indent': {
                    'SwitchCase': 1,
                    'ignoredNodes': [
                        'JSXAttribute'
                    ]
                }
            }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-case-declarations': 'off',
        'max-len': [
            'error',
            80
        ],
        'comma-dangle': [
            'error',
            'never'
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'react/jsx-indent-props': [
            'error',
            'first'
        ],
        /*todo enable*/
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error'
    }
};
