import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import Settings from "./settings-components";

// Storybook Meta and Stories
const meta = {
	title: "Components/Settings",
	component: Settings,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#f8f9fa" },
				{ name: "white", value: "#ffffff" },
				{ name: "dark", value: "#1a1a1a" },
			],
		},
	},
	argTypes: {
		initialBudgetName: {
			control: { type: "text" },
			description: "Initial budget name displayed in mobile view",
		},
	},
} satisfies Meta<typeof Settings>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Settings page
export const Default: Story = {
	args: {
		initialBudgetName: "My Budget Simulation",
	},
};

// Settings with custom budget name
export const CustomBudgetName: Story = {
	args: {
		initialBudgetName: "Annual Financial Planning 2025",
	},
};

// Mobile responsive view
export const MobileView: Story = {
	args: {
		initialBudgetName: "Mobile Budget App",
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

// Interactive demo with console logging
export const InteractiveDemo: Story = {
	render: (args) => {
		return (
			<div style={{ minHeight: "100vh" }}>
				<div
					style={{
						position: "fixed",
						top: "10px",
						left: "10px",
						background: "#4f46e5",
						color: "white",
						padding: "8px 12px",
						borderRadius: "4px",
						fontSize: "14px",
						zIndex: 1000,
						margin: 0,
					}}
				>
					Check console for interactions!
				</div>
				<Settings {...args} />
			</div>
		);
	},
	args: {
		initialBudgetName: "Interactive Demo Budget",
	},
};

// Playground for testing all variations
export const Playground: Story = {
	args: {
		initialBudgetName: "Playground Budget Simulator",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Use the controls below to test different budget names and see how the settings component responds.",
			},
		},
	},
};
