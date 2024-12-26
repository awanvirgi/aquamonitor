/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors:{
                "main":"#60a5fa"
            }
        },
    },
    plugins: [],
};
