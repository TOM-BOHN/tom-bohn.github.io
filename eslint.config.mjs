import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    files: ['components/ThemeProvider.tsx'],
    rules: {
      // Hydration-safe theme init sets state after mount; keep this scoped.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
