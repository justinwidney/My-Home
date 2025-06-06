import type { Meta, StoryObj } from "@storybook/react";
import Stepper, { type Step } from "./Stepper";

const meta = {
	title: "Components/Stepper",
	component: Stepper,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof Stepper>;

const handleStepChange = (newIndex: number) => {
	console.log("User switched to step", newIndex);
};

const steps: Step[] = [
	{
		header: <span>Account Info</span>,
		content: (
			<div>
				<h2>Step 1: Enter Account Info</h2>
				<p>Form fields for username, email, password…</p>
			</div>
		),
	},
	{
		header: <span>Profile Details</span>,
		content: (
			<div>
				<h2>Step 2: Profile Details</h2>
				<p>Form fields for name, address, phone…</p>
			</div>
		),
	},
	{
		header: <span>Confirmation</span>,
		content: (
			<div>
				<h2>Step 3: Confirm & Submit</h2>
				<p>Summary of all entered data and a “Submit” button.</p>
			</div>
		),
	},
];

export const TextAndRefreshButton: Story = {
	args: {},
	render: () => (
		<div style={{ maxWidth: 600, margin: "2rem auto" }}>
			<h1>My Three-Step Wizard</h1>
			<Stepper
				initialActiveStep={0}
				linear={false} // set to true to prevent skipping ahead
				steps={steps}
				onStepChange={handleStepChange}
			/>
		</div>
	),
};
