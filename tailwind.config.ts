import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
      require("daisyui")
  ],
  daisyui: {
    themes: ["lofi"],
  },
}
export default config
