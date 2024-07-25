import nextPlugin from '@next/eslint-plugin-next'
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  react: true,
  formatters: true,
  plugins: { '@next/next': nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    '@next/next/no-duplicate-head': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks':'off'
  },
})