/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// Map each “sidebar-…” variable name to hsl(var(--…)).
				// Notice we wrap the CSS variable in hsl( var(...) ) because
				// you defined “--sidebar-background” as “0 0% 98%” (i.e. H S% L%).
				sidebar: "hsl(var(--sidebar-background))",
				"sidebar-foreground": "hsl(var(--sidebar-foreground))",
				"sidebar-primary": "hsl(var(--sidebar-primary))",
				"sidebar-primary-foreground": "hsl(var(--sidebar-primary-foreground))",
				"sidebar-accent": "hsl(var(--sidebar-accent))",
				"sidebar-accent-foreground": "hsl(var(--sidebar-accent-foreground))",
				"sidebar-border": "hsl(var(--sidebar-border))",
				"sidebar-ring": "hsl(var(--sidebar-ring))",
			},
		},
	},
	plugins: [],
};
