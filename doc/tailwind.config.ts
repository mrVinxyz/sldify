import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', '../pkg/**/*.{js,jsx,ts,tsx}'],
	theme: {},
	plugins: [require('@tailwindcss/forms')],
	darkMode: 'class',
};

export default config;
