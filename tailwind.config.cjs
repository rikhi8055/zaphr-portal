// CommonJS to avoid TS config parsing in restricted runners
module.exports = {
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.{css}", "./data/**/*.{ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        heading: "var(--color-heading)",
        text: "var(--color-text)",
        surface: "var(--color-bg)"
      },
      borderRadius: { '2xl': '1rem' },
      boxShadow: {
        card: "0 10px 25px -10px rgb(0 0 0 / 0.15)",
        glow: "0 0 0 2px rgb(12 188 185 / 0.25)"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
        '.elevate-card': {
          '@apply shadow-card rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur border border-white/20': {}
        },
        '.focus-ring': {
          boxShadow: "0 0 0 3px color-mix(in oklab, var(--color-primary) 40%, transparent)",
          outline: 'none'
        }
      })
    }
  ]
}
