import type { Meta, StoryObj } from "@storybook/react";
import TopBar from "./TopBar";

const meta = {
	title: "Layout/TopBar",
	component: TopBar,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<{
	left?: React.ReactNode;
	center?: React.ReactNode;
	right?: React.ReactNode;
}>;

const Box = ({
	label,
	size = "md",
}: {
	label: string;
	size?: "sm" | "md" | "lg";
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}) => {
	const sizes = {
		sm: "w-16 h-8",
		md: "w-24 h-10",
		lg: "w-32 h-12",
	};
	return (
		<div
			className={`bg-blue-500 text-white rounded flex items-center justify-center ${sizes[size]}`}
		>
			{label}
		</div>
	);
};

export const StartingPerks: Story = {
	args: {
		left: <Box label="Left" />,
		center: <Box label="Middle" />,
		right: (
			<div className="flex gap-2">
				<Box label="Right 1" />
				<Box label="Right 2" />
			</div>
		),
	},
	render: (args) => (
		<div style={{ width: "1200px" }}>
			<TopBar {...args} />
		</div>
	),
};

export const Templates: Story = {
	args: {
		center: (
			<div className="flex gap-2">
				<Box label="Box 1" size="sm" />
				<Box label="Box 2" size="md" />
				<Box label="Box 3" size="lg" />
				<Box label="Box 4" size="md" />
				<Box label="Box 5" size="sm" />
			</div>
		),
	},
	render: (args) => (
		<div style={{ width: "1200px" }}>
			<TopBar {...args} />
		</div>
	),
};

export const OurDreamHome: Story = {
	args: {
		left: (
			<div className="flex gap-2">
				<Box label="Left 1" />
				<Box label="Left 2" />
				<Box label="Left 3" />
			</div>
		),
		right: <Box label="Right" />,
	},
	render: (args) => (
		<div style={{ width: "1200px" }}>
			<TopBar {...args} />
		</div>
	),
};

export const MonthlyExpense: Story = {
	args: {
		left: <Box label="Left" />,
		center: <Box label="Center" />,
		right: (
			<div className="flex gap-2">
				<Box label="Right 1" />
				<Box label="Right 2" />
			</div>
		),
	},
	render: (args) => (
		<div style={{ width: "1200px" }}>
			<TopBar {...args} />
		</div>
	),
};
