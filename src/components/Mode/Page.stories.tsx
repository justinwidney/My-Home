// Page.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import ModeSelectionPage from "./Page";
import { Header } from "./Header";
import { ModeCardGrid } from "./ModeCardGrid";
import { BackgroundPattern } from "./BackgroundPattern";
import { DeckCard } from "../deckCard/DeckCard";
import Stepper from "../stepper/Stepper";
import { FreeButton } from "../buttons/Buttons";
import { defaultUser, modeCardsData } from "./data";

import { within, userEvent, expect } from "@storybook/test";

// Individual Card Tests
const FastModeCard = () => (
	<div className="flex justify-center p-8 bg-gray-50 min-h-screen items-center">
		<DeckCard
			abilities={modeCardsData[0].abilities}
			artwork={modeCardsData[0].artwork}
			name={modeCardsData[0].name}
			type={modeCardsData[0].type}
			illustrator={modeCardsData[0].illustrator}
			cardNumber={modeCardsData[0].cardNumber}
			totalCards="4"
			rating={modeCardsData[0].rating}
			initialRotation={modeCardsData[0].initialRotation}
			onAbilitySelect={(abilityId) => console.log("Selected:", abilityId)}
		/>
	</div>
);

const StoryModeCard = () => (
	<div className="flex justify-center p-8 bg-gray-50 min-h-screen items-center">
		<DeckCard
			abilities={modeCardsData[1].abilities}
			artwork={modeCardsData[1].artwork}
			name={modeCardsData[1].name}
			type={modeCardsData[1].type}
			illustrator={modeCardsData[1].illustrator}
			cardNumber={modeCardsData[1].cardNumber}
			totalCards="4"
			rating={modeCardsData[1].rating}
			initialRotation={modeCardsData[1].initialRotation}
			onAbilitySelect={(abilityId) => console.log("Selected:", abilityId)}
		/>
	</div>
);

const AffordabilityModeCard = () => (
	<div className="flex justify-center p-8 bg-gray-50 min-h-screen items-center">
		<DeckCard
			abilities={modeCardsData[2].abilities}
			artwork={modeCardsData[2].artwork}
			name={modeCardsData[2].name}
			type={modeCardsData[2].type}
			illustrator={modeCardsData[2].illustrator}
			cardNumber={modeCardsData[2].cardNumber}
			totalCards="4"
			rating={modeCardsData[2].rating}
			initialRotation={modeCardsData[2].initialRotation}
			onAbilitySelect={(abilityId) => console.log("Selected:", abilityId)}
		/>
	</div>
);

const TemplateModeCard = () => (
	<div className="flex justify-center p-8 bg-gray-50 min-h-screen items-center">
		<DeckCard
			abilities={modeCardsData[3].abilities}
			artwork={modeCardsData[3].artwork}
			name={modeCardsData[3].name}
			type={modeCardsData[3].type}
			illustrator={modeCardsData[3].illustrator}
			cardNumber={modeCardsData[3].cardNumber}
			totalCards="4"
			rating={modeCardsData[3].rating}
			initialRotation={modeCardsData[3].initialRotation}
			onAbilitySelect={(abilityId) => console.log("Selected:", abilityId)}
		/>
	</div>
);

// Header Component Test
const HeaderTest = () => (
	<div className="min-h-screen bg-gray-50 relative">
		<Header user={defaultUser} />
		<div className="pt-32 text-center">
			<h1 className="text-2xl">Header with Navigation Tabs</h1>
			<p className="text-gray-600 mt-4">
				Click the tabs to see the navigation states
			</p>
		</div>
	</div>
);

// Mode Card Grid Test
const ModeCardGridTest = () => {
	const handleAbilitySelect = (cardId: string, abilityId: string) => {
		console.log(`Selected ${abilityId} from ${cardId}`);
	};

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">
					Mode Card Grid Component
				</h1>
				<ModeCardGrid
					modeCards={modeCardsData}
					selectedMode=""
					onAbilitySelect={handleAbilitySelect}
				/>
			</div>
		</div>
	);
};

// Stepper Component Test
const StepperTest = () => {
	const handleStepChange = (newIndex: number) => {
		console.log("Step changed to:", newIndex);
	};

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">
					Mode Selection Stepper
				</h1>
				<Stepper
					steps={stepperStepsData}
					initialActiveStep={0}
					linear={true}
					onStepChange={handleStepChange}
				/>
			</div>
		</div>
	);
};

// Button Test
const ButtonTest = () => {
	return (
		<div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
			<div className="space-y-4">
				<h1 className="text-3xl font-bold text-center mb-8">
					FreeButton Variants
				</h1>
				<div className="flex gap-4">
					<FreeButton
						text="Blue Button"
						variant="blue"
						onClick={() => console.log("Blue clicked")}
					/>
					<FreeButton
						text="Yellow Button"
						variant="yellow"
						onClick={() => console.log("Yellow clicked")}
					/>
					<FreeButton
						text="Black Button"
						variant="black"
						onClick={() => console.log("Black clicked")}
					/>
				</div>
				<div className="mt-4">
					<FreeButton
						text="Disabled Style"
						variant="blue"
						onClick={() => console.log("Should not work")}
						className="opacity-50 cursor-not-allowed"
					/>
				</div>
			</div>
		</div>
	);
};

// Background Pattern Test
const BackgroundPatternTest = () => (
	<div className="min-h-screen bg-gray-50 relative">
		<BackgroundPattern />
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center bg-white p-8 rounded-lg shadow-sm relative z-10">
				<h1 className="text-3xl font-bold mb-4">
					Background Pattern Component
				</h1>
				<p className="text-gray-600">
					The subtle grid pattern and decorative lines are visible behind this
					content
				</p>
			</div>
		</div>
	</div>
);

// Storybook configuration
const meta: Meta = {
	title: "Pages/ModeSelection",
	component: ModeSelectionPage,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
Modularized Mode Selection page with separated components for better maintainability.

## Architecture

### **Modular Components:**
- \`Header\` - Navigation with tabs and user profile
- \`ModeCardGrid\` - Grid layout for mode selection cards  
- \`BackgroundPattern\` - Subtle grid and line patterns
- \`Page\` - Main orchestrating component

### **Data & Types:**
- \`types.ts\` - All TypeScript interfaces and types
- \`data.ts\` - Static data for modes, user, and stepper steps

### **Features:**
- **Real DeckCard Integration** - Uses your existing DeckCard component
- **Tabbed Navigation** - Overview, About Us, How It Works
- **Stepper Component** - 4-step process below continue button
- **FreeButton** - Your button component with variants
- **Horizontal Layout** - 4 cards across with no stacking
- **Props Support** - Callbacks for mode selection and continue actions

## Component Structure

\`\`\`
Page.tsx (Main Component)
├── types.ts (Interfaces)
├── data.ts (Static Data)
├── Header.tsx (Navigation)
├── ModeCardGrid.tsx (Card Layout)
├── BackgroundPattern.tsx (Visual Effects)
└── Dependencies:
    ├── DeckCard (Your existing component)
    ├── Stepper (Your stepper component)
    ├── FreeButton (Your button component)
    └── Tabs (Your tabs component)
\`\`\`

## Usage

\`\`\`tsx
import ModeSelectionPage from './Page';

<ModeSelectionPage 
  onModeSelect={(modeId) => console.log('Selected:', modeId)}
  onContinue={(selectedMode) => navigate('/next', { state: { mode: selectedMode }})}
  initialSelectedMode="fast"
/>
\`\`\`
        `,
			},
		},
	},
	argTypes: {
		onModeSelect: { action: "mode-selected" },
		onContinue: { action: "continue-clicked" },
		initialSelectedMode: {
			control: { type: "select" },
			options: ["", "fast", "story", "affordability", "template"],
		},
	},
};

export default meta;
type Story = StoryObj;

// Main stories
export const CompletePage: StoryObj<typeof ModeSelectionPage> = {
	name: "Complete Mode Selection Page",
	args: {
		initialSelectedMode: "",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Click the "How It Works" tab, then back to "Overview"
		await userEvent.click(
			await canvas.findByRole("tab", { name: /how it works/i })
		);
		await expect(
			await canvas.findByRole("heading", { name: /how it works/i })
		).toBeInTheDocument();

		await userEvent.click(
			await canvas.findByRole("tab", { name: /overview/i })
		);
		await expect(
			await canvas.findByRole("heading", { name: /choose your experience/i })
		).toBeInTheDocument();

		// Click a card ability button (DeckCard renders them—adjust selector text if needed)
		// Example: a button labelled "Use Fast Mode"
		const maybeFast = await canvas.findAllByRole("button", { name: /fast/i });
		if (maybeFast.length) {
			await userEvent.click(maybeFast[0]);
		}

		// Click Continue
		const continueBtn = await canvas.findByRole("button", {
			name: /continue/i,
		});
		await userEvent.click(continueBtn);
	},
};

export const HeaderComponent: Story = {
	name: "Header with Navigation",
	render: () => <HeaderTest />,
	parameters: {
		docs: {
			description: {
				story:
					"Isolated Header component with logo, tabbed navigation, and user profile. Click tabs to see active states.",
			},
		},
	},
};

export const ModeCardGridComponent: Story = {
	name: "Mode Card Grid",
	render: () => <ModeCardGridTest />,
	parameters: {
		docs: {
			description: {
				story:
					"Isolated ModeCardGrid component showing the horizontal layout of all 4 mode cards with proper spacing.",
			},
		},
	},
};

export const StepperComponent: Story = {
	name: "Stepper Component",
	render: () => <StepperTest />,
	parameters: {
		docs: {
			description: {
				story:
					"Isolated Stepper component with 4-step mode selection process. Linear navigation enabled.",
			},
		},
	},
};

export const ButtonVariants: Story = {
	name: "FreeButton Variants",
	render: () => <ButtonTest />,
	parameters: {
		docs: {
			description: {
				story:
					"Testing all variants of the FreeButton component including blue, yellow, black, and disabled states.",
			},
		},
	},
};

export const BackgroundPatternComponent: Story = {
	name: "Background Pattern",
	render: () => <BackgroundPatternTest />,
	parameters: {
		docs: {
			description: {
				story:
					"Isolated BackgroundPattern component showing the subtle grid and decorative lines.",
			},
		},
	},
};
