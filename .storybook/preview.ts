import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import "../src/styles/tailwind.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		darkMode: {
			classTarget: "html",
			stylePreview: true,
		},
	},
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Global theme for components",
			defaultValue: "light",
			toolbar: {
				icon: "circlehollow",
				items: ["light", "dark"],
				showName: true,
			},
		},
	},
	decorators: [
		// Adds theme switching support.
		// NOTE: requires setting "darkMode" to "class" in your tailwind config
		withThemeByClassName({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
};

export default preview;
