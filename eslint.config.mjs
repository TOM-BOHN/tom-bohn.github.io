import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      // This project uses a common hydration-safe ThemeProvider pattern.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
