import type { Meta, StoryObj } from "@storybook/react";
import { DeckCard } from "./DeckCard";

const meta = {
	title: "Components/DeckCard",
	component: DeckCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [
				{ name: "dark", value: "#1a1a1a" },
				{ name: "light", value: "#f5f5f5" },
			],
		},
	},
	argTypes: {
		onAbilitySelect: { action: "ability selected" },
		rating: {
			control: { type: "number", min: 0, max: 3, step: 1 },
			description: "Star rating from 0 to 3",
		},
	},
} satisfies Meta<typeof DeckCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Dragon Egg card
export const DragonEgg: Story = {
	args: {
		name: "Dragon Egg",
		type: "creature",
		rating: 2,
		abilities: [
			{
				id: "hatch",
				name: "Hatch",
				description: "Take the top card from the draw pile.",
			},
			{
				id: "study",
				name: "Study",
				description: "Wait 2 turns, then take a card from any family.",
			},
		],
		artwork: {
			baseImage: "https://assets.codepen.io/2153413/dragonEgg-base.png",
			raysImage: "https://assets.codepen.io/2153413/dragonEgg-rays.png",
			frontImage: "https://assets.codepen.io/2153413/dragonEgg-front.png",
		},
		illustrator: "Christian Alder",
		cardNumber: "12",
		totalCards: "64",
	},
};

// Lightning Elemental card
export const LightningElemental: Story = {
	args: {
		name: "Lightning Elemental",
		type: "elemental",
		rating: 3,
		abilities: [
			{
				id: "shock",
				name: "Shock",
				description: "Deal 3 damage to any target.",
			},
			{
				id: "charge",
				name: "Charge",
				description: "Gain +2/+0 and haste until end of turn.",
			},
		],
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1605273608666-4034fb77b3cc?w=600&h=400&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/dragonEgg-rays.png",
		},
		illustrator: "Storm Weaver",
		cardNumber: "23",
		totalCards: "64",
	},
};

// Forest Guardian card
export const ForestGuardian: Story = {
	args: {
		name: "Forest Guardian",
		type: "creature",
		rating: 1,
		abilities: [
			{
				id: "protect",
				name: "Protect",
				description: "Prevent the next 2 damage to any ally.",
			},
			{
				id: "growth",
				name: "Growth",
				description: "Put a +1/+1 counter on target creature.",
			},
			{
				id: "heal",
				name: "Heal",
				description: "Restore 3 health to any target.",
			},
		],
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop",
		},
		illustrator: "Nature Artist",
		cardNumber: "45",
		totalCards: "120",
	},
};

// Mystic Portal card (spell type)
export const MysticPortal: Story = {
	args: {
		name: "Mystic Portal",
		type: "spell",
		rating: 0,
		abilities: [
			{
				id: "teleport",
				name: "Teleport",
				description: "Move any creature to a different zone.",
			},
		],
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/dragonEgg-rays.png",
		},
		illustrator: "Portal Master",
		cardNumber: "7",
		totalCards: "32",
	},
};

// Custom back image card
export const CustomBackCard: Story = {
	args: {
		name: "Ancient Artifact",
		type: "artifact",
		rating: 3,
		abilities: [
			{
				id: "activate",
				name: "Activate",
				description: "Draw 2 cards, then discard 1 card.",
			},
			{
				id: "sacrifice",
				name: "Sacrifice",
				description: "Destroy this to gain 5 mana of any color.",
			},
		],
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
		},
		backImage:
			"https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=300&h=420&fit=crop",
		illustrator: "Artifact Smith",
		cardNumber: "1",
		totalCards: "8",
	},
};

// Interactive demo with state
export const InteractiveDemo: Story = {
	render: (args) => {
		return (
			<div style={{ padding: "2rem" }}>
				<h3
					style={{
						color: "white",
						marginBottom: "1rem",
						fontFamily: "system-ui",
					}}
				>
					Click the card to flip it, or select abilities to see animations!
				</h3>
				<DeckCard {...args} />
			</div>
		);
	},
	args: {
		name: "Phoenix Rising",
		type: "legendary creature",
		rating: 3,
		abilities: [
			{
				id: "hatch",
				name: "Rebirth",
				description: "Return Phoenix from graveyard to battlefield.",
			},
			{
				id: "study",
				name: "Immolate",
				description: "Deal damage equal to Phoenix's power to all creatures.",
			},
		],
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/dragonEgg-rays.png",
		},
		illustrator: "Fire Artist",
		cardNumber: "100",
		totalCards: "100",
	},
};

// Show all star rating variations
export const StarRatings: Story = {
	render: () => {
		const ratings = [0, 1, 2, 3];

		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",
					gap: "2rem",
					padding: "2rem",
					background: "#1a1a1a",
				}}
			>
				{ratings.map((rating) => (
					<DeckCard
						key={rating}
						name={`${rating} Star Card`}
						rating={rating}
						abilities={[
							{
								id: "test",
								name: "Test Ability",
								description: "This card has a rating.",
							},
						]}
						artwork={{
							baseImage: `https://picsum.photos/600/400?random=${rating}`,
						}}
						illustrator="Rating Demo"
						cardNumber={String(rating + 1)}
						totalCards="4"
					/>
				))}
			</div>
		);
	},
};

// Long card names with ratings
export const LongNames: Story = {
	render: () => {
		const cards = [
			{ name: "Eternal Dragon of the Ancient Mountains", rating: 3 },
			{ name: "The Legendary Sword of Infinite Power", rating: 2 },
			{ name: "A Very Long Card Name That Might Wrap", rating: 1 },
		];

		return (
			<div
				style={{
					display: "flex",
					gap: "2rem",
					padding: "2rem",
					background: "#1a1a1a",
				}}
			>
				{cards.map((card, i) => (
					<DeckCard
						key={i}
						name={card.name}
						rating={card.rating}
						abilities={[
							{
								id: "test",
								name: "Test",
								description: "Testing long names with ratings.",
							},
						]}
						artwork={{
							baseImage: `https://picsum.photos/600/400?random=${i + 10}`,
						}}
						illustrator="Name Test"
						cardNumber={String(i + 1)}
						totalCards="3"
					/>
				))}
			</div>
		);
	},
};

// Showcase all props
export const Playground: Story = {
	args: {
		name: "Your Card Name",
		type: "creature",
		rating: 2,
		abilities: [
			{
				id: "ability1",
				name: "First Ability",
				description: "Description of the first ability.",
			},
			{
				id: "ability2",
				name: "Second Ability",
				description: "Description of the second ability.",
			},
		],
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/dragonEgg-rays.png",
			frontImage: "https://assets.codepen.io/2153413/dragonEgg-front.png",
		},
		illustrator: "Your Artist Name",
		cardNumber: "1",
		totalCards: "100",
		backImage: "https://assets.codepen.io/2153413/card-back.jpg",
		initialRotation: { x: 0, y: 0, z: 0 },
	},
};

// Multiple cards with different rotations
export const CardHand: Story = {
	render: () => {
		const cards = [
			{
				name: "Fire Dragon",
				rotation: { x: 0, y: -15, z: -5 },
				rating: 3,
				abilities: [
					{
						id: "flame",
						name: "Flame Breath",
						description: "Deal 4 damage to any target.",
					},
					{
						id: "fly",
						name: "Fly",
						description:
							"This creature can't be blocked by creatures without flying.",
					},
				],
				artwork: {
					baseImage:
						"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
				},
			},
			{
				name: "Ice Phoenix",
				rotation: { x: 0, y: 0, z: 0 },
				rating: 2,
				abilities: [
					{
						id: "freeze",
						name: "Freeze",
						description: "Tap target creature. It doesn't untap next turn.",
					},
					{
						id: "rebirth",
						name: "Rebirth",
						description: "When this dies, return it to play at end of turn.",
					},
				],
				artwork: {
					baseImage:
						"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop",
				},
			},
			{
				name: "Storm Elemental",
				rotation: { x: 0, y: 15, z: 5 },
				rating: 1,
				abilities: [
					{
						id: "lightning",
						name: "Lightning Strike",
						description: "Deal 3 damage to any target.",
					},
					{
						id: "thunder",
						name: "Thunder",
						description: "All creatures get -1/-1 until end of turn.",
					},
				],
				artwork: {
					baseImage:
						"https://images.unsplash.com/photo-1605273608666-4034fb77b3cc?w=600&h=400&fit=crop",
				},
			},
		];

		return (
			<div
				style={{
					display: "flex",
					gap: "2rem",
					padding: "3rem",
					background: "radial-gradient(circle, #2a2a2a 0%, #1a1a1a 100%)",
					borderRadius: "1rem",
					perspective: "1000px",
				}}
			>
				{cards.map((card, index) => (
					<DeckCard
						key={index}
						abilities={card.abilities}
						artwork={card.artwork}
						cardNumber={String(index + 1)}
						illustrator="Fantasy Artist"
						initialRotation={card.rotation}
						name={card.name}
						rating={card.rating}
						totalCards="3"
					/>
				))}
			</div>
		);
	},
};
