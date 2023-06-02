/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Montserrat Alternates', 'sans-serif']
		}
	},
	plugins: [
		require('@headlessui/tailwindcss')
	]
}
