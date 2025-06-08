import type { Meta, StoryObj } from "@storybook/react";
import { MonthPicker } from "./MonthPicker";
import { useState } from "react";

const meta = {
	title: "Components/MonthPicker",
	component: MonthPicker,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		mode: {
			control: { type: "select" },
			options: ["single", "range"],
		},
		numberOfMonths: {
			control: { type: "number", min: 6, max: 24, step: 1 },
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
} satisfies Meta<typeof MonthPicker>;

export default meta;
type Story = StoryObj<typeof MonthPicker>;

export const SingleMonth: Story = {
	args: {
		mode: "single",
		numberOfMonths: 12,
	},
	render: (args) => {
		const [value, setValue] = useState<string>("2025-06");

		return (
			<div className="p-8">
				<MonthPicker
					{...args}
					value={value}
					onValueChange={(newValue) => setValue(newValue as string)}
				/>
				<div className="mt-4 text-sm text-gray-600">Selected: {value}</div>
			</div>
		);
	},
};

export const RangeSelection: Story = {
	args: {
		mode: "range",
		numberOfMonths: 12,
	},
	render: (args) => {
		const [value, setValue] = useState<string[]>(["2025-03", "2025-06"]);

		return (
			<div className="p-8">
				<MonthPicker
					{...args}
					value={value}
					onValueChange={(newValue) => setValue(newValue as string[])}
				/>
				<div className="mt-4 text-sm text-gray-600">
					Selected range: {value.join(" to ")}
				</div>
			</div>
		);
	},
};

export const WithMinMaxDates: Story = {
	args: {
		mode: "single",
		numberOfMonths: 12,
		minDate: new Date(2024, 5), // June 2024
		maxDate: new Date(2025, 11), // December 2025
	},
	render: (args) => {
		const [value, setValue] = useState<string>("2025-01");

		return (
			<div className="p-8">
				<MonthPicker
					{...args}
					value={value}
					onValueChange={(newValue) => setValue(newValue as string)}
				/>
				<div className="mt-4 text-sm text-gray-600">
					<div>Min date: June 2024</div>
					<div>Max date: December 2025</div>
					<div>Selected: {value}</div>
				</div>
			</div>
		);
	},
};

export const Disabled: Story = {
	args: {
		mode: "single",
		numberOfMonths: 12,
		disabled: true,
		defaultValue: "2025-06",
	},
};

export const ManyMonths: Story = {
	args: {
		mode: "single",
		numberOfMonths: 18,
	},
	render: (args) => {
		const [value, setValue] = useState<string>("2025-06");

		return (
			<div className="p-8 max-w-4xl">
				<MonthPicker
					{...args}
					value={value}
					onValueChange={(newValue) => setValue(newValue as string)}
				/>
				<div className="mt-4 text-sm text-gray-600">
					Showing 18 months at once
				</div>
			</div>
		);
	},
};

export const Uncontrolled: Story = {
	args: {
		mode: "single",
		numberOfMonths: 12,
		defaultValue: "2025-03",
	},
	render: (args) => {
		return (
			<div className="p-8">
				<MonthPicker
					{...args}
					onValueChange={(value) => console.log("Selected:", value)}
				/>
				<div className="mt-4 text-sm text-gray-600">
					Check console for selection events
				</div>
			</div>
		);
	},
};

export const FiscalYearExample: Story = {
	render: () => {
		const [q1Range, setQ1Range] = useState<string[]>(["2025-01", "2025-03"]);
		const [q2Range, setQ2Range] = useState<string[]>(["2025-04", "2025-06"]);

		return (
			<div className="p-8 space-y-6">
				<div>
					<h3 className="text-lg font-semibold mb-2">Q1 Fiscal Year</h3>
					<MonthPicker
						mode="range"
						numberOfMonths={12}
						value={q1Range}
						onValueChange={(newValue) => setQ1Range(newValue as string[])}
					/>
				</div>

				<div>
					<h3 className="text-lg font-semibold mb-2">Q2 Fiscal Year</h3>
					<MonthPicker
						mode="range"
						numberOfMonths={12}
						value={q2Range}
						onValueChange={(newValue) => setQ2Range(newValue as string[])}
					/>
				</div>
			</div>
		);
	},
};

export const CustomStyling: Story = {
	render: () => {
		const [value, setValue] = useState<string>("2025-06");

		return (
			<div className="p-8 space-y-4">
				<div className="p-4 bg-blue-50 rounded-lg">
					<h3 className="text-sm font-medium text-blue-900 mb-2">
						Budget Period
					</h3>
					<MonthPicker
						mode="single"
						numberOfMonths={12}
						value={value}
						onValueChange={(newValue) => setValue(newValue as string)}
						className="bg-white p-2 rounded-md shadow-sm"
					/>
				</div>

				<div className="p-4 bg-gray-100 rounded-lg">
					<h3 className="text-sm font-medium text-gray-700 mb-2">
						Reporting Period
					</h3>
					<MonthPicker
						mode="range"
						numberOfMonths={12}
						defaultValue={["2025-01", "2025-06"]}
						className="bg-white p-2 rounded-md border border-gray-300"
					/>
				</div>
			</div>
		);
	},
};

export const CompactView: Story = {
	render: () => {
		const [value, setValue] = useState<string>("2025-06");

		return (
			<div className="p-8">
				<div className="max-w-sm">
					<MonthPicker
						mode="single"
						numberOfMonths={6}
						value={value}
						onValueChange={(newValue) => setValue(newValue as string)}
					/>
				</div>
				<div className="mt-4 text-sm text-gray-600">
					Compact view with only 6 months visible
				</div>
			</div>
		);
	},
};
