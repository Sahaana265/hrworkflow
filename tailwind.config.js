/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0E0E10',
        card: '#1A1A1E',
        'border-color': '#2A2A30',
        primary: '#1DB87A', // Teal
        blue: '#3B8BD4',
        purple: '#cfbcff', // From YAML
        amber: '#e7c365', // From YAML
        coral: '#ffb4ab', // From YAML
        textMain: '#FFFFFF',
        textMuted: '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, #2A2A30 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-size': '24px 24px',
      }
    },
  },
  plugins: [],
}
