import type { Meta, StoryObj } from "@storybook/react";
import { ResponsiveTitle } from "./SectionTitle";

const meta = {
	title: "Components/SectionTitle",
	component: ResponsiveTitle,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ResponsiveTitle>;

export default meta;

type Story = StoryObj<{
	title: string;
	showHelp: boolean;
}>;

export const Default: Story = {
	args: {
		title: "Starting  Perks",
		showHelp: true,
	},
	render: ({ title, showHelp }) => (
		<div style={{ width: "1200px" }}>
			<ResponsiveTitle showHelp={showHelp} title={title}></ResponsiveTitle>
		</div>
	),
};
