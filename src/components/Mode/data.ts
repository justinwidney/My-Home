// data.ts

import type { ModeData, User } from "./types";

export const defaultUser: User = {
	name: "John Doe",
	initials: "JD",
};

export const modeCardsData: ModeData[] = [
	{
		id: "fast",
		name: "Fast Mode",
		type: "mode",
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/card-rays.png",
		},
		abilities: [
			{
				id: "automation",
				name: "Smart Automation",
				description: "Automated configurations and instant deployment",
			},
			{
				id: "templates",
				name: "Pre-built Templates",
				description: "Ready-to-use templates for quick setup",
			},
		],
		illustrator: "Tech Team",
		cardNumber: "1",
		rating: 3,
		initialRotation: { x: -5, y: 5, z: 2 },
	},
	{
		id: "story",
		name: "My Story Mode",
		type: "mode",
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/card-rays.png",
		},
		abilities: [
			{
				id: "personalization",
				name: "Personal Journey",
				description: "Custom onboarding based on your story",
			},
			{
				id: "recommendations",
				name: "Smart Suggestions",
				description: "Tailored recommendations for your workflow",
			},
		],
		illustrator: "Design Team",
		cardNumber: "2",
		rating: 2,
		initialRotation: { x: 3, y: -2, z: -1 },
	},
	{
		id: "affordability",
		name: "Affordability Mode",
		type: "mode",
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/card-rays.png",
		},
		abilities: [
			{
				id: "budget",
				name: "Budget Tracking",
				description: "Monitor and optimize your costs",
			},
			{
				id: "freetier",
				name: "Free Options",
				description: "Access powerful features at no cost",
			},
		],
		illustrator: "Finance Team",
		cardNumber: "3",
		rating: 2,
		initialRotation: { x: -2, y: 4, z: 1 },
	},
	{
		id: "template",
		name: "Template Mode",
		type: "mode",
		artwork: {
			baseImage:
				"https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=400&h=300&fit=crop",
			raysImage: "https://assets.codepen.io/2153413/card-rays.png",
		},
		abilities: [
			{
				id: "industry",
				name: "Industry Templates",
				description: "Proven templates for your sector",
			},
			{
				id: "customization",
				name: "Easy Customization",
				description: "Modify templates to fit your needs",
			},
		],
		illustrator: "Template Team",
		cardNumber: "4",
		rating: 3,
		initialRotation: { x: 2, y: -3, z: -2 },
	},
];
