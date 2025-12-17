/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'abyss': '#020617', // Slate 950
                'abyss-light': '#0f172a', // Slate 900
                'neon-gold': '#FCD34D', // Amber 300
                'neon-cyan': '#22d3ee', // Cyan 400
                'glass-border': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                'display': ['"Cinzel"', 'serif'],
                'sans': ['"Outfit"', 'sans-serif'],
            },
            backgroundImage: {
                'ocean-gradient': 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
            },
            boxShadow: {
                'neon': '0 0 20px rgba(34, 211, 238, 0.5)',
                'neon-gold': '0 0 20px rgba(252, 211, 77, 0.5)',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            animation: {
                shimmer: 'shimmer 2s infinite',
            }
        },
    },
    plugins: [],
}
