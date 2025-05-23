import type { Meta, StoryObj } from "@storybook/react";
import { X, Settings, Home } from "lucide-react";
import { Card } from "./Card";

// Card Stories
const cardMeta = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Card>;

export default cardMeta;

// Image Card Stories
type ImageCardStory = StoryObj<{
	type: "image";
	optionalText?: string;
	showButton?: boolean;
	buttonIcon?: React.ComponentType<any>;
	onButtonClick?: () => void;
	image: string;
	title: string;
	description: string;
}>;

export const ImageCardWithButton: ImageCardStory = {
	args: {
		type: "image",
		optionalText: "Featured Product",
		showButton: true,
		buttonIcon: X,
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop",
		title: "Premium Sneakers",
		description:
			"Experience comfort and style with our latest collection of premium sneakers designed for everyday wear.",
		onButtonClick: () => {
			console.log("Image card button clicked");
		},
	},
	render: (args) => (
		<div style={{ width: "350px" }}>
			<Card {...args} />
		</div>
	),
};

export const ImageCardWithoutButton: ImageCardStory = {
	args: {
		type: "image",
		optionalText: "Office Collection",
		showButton: false,
		image:
			"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop",
		title: "Modern Workspace",
		description:
			"Create the perfect workspace with our curated collection of modern office furniture and accessories.",
	},
	render: (args) => (
		<div style={{ width: "350px" }}>
			<Card {...args} />
		</div>
	),
};

export const ImageCardNoTitle: ImageCardStory = {
	args: {
		type: "image",
		showButton: true,
		buttonIcon: Settings,
		image:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=200&fit=crop",
		title: "Luxury Watch",
		description:
			"Timeless elegance meets modern precision in this exquisite timepiece crafted for the discerning individual.",
		onButtonClick: () => {
			console.log("Watch card button clicked");
		},
	},
	render: (args) => (
		<div style={{ width: "350px" }}>
			<Card {...args} />
		</div>
	),
};

// House Card Stories
type HouseCardStory = StoryObj<{
	type: "house";
	optionalText?: string;
	showButton?: boolean;
	buttonIcon?: React.ComponentType<any>;
	onButtonClick?: () => void;
	location: string;
	houseInfo: string;
	centerImage: string;
	yearsUntilDownPayment: number;
	yearsUntilOwn: number;
	blueSquareText: string;
}>;

export const HouseCardDreamHome: HouseCardStory = {
	args: {
		type: "house",
		optionalText: "Dream Home Plan",
		showButton: true,
		buttonIcon: X,
		location: "Vancouver, BC",
		houseInfo: "3 bed, 2 bath • 1,850 sq ft • Built 2019",
		centerImage:
			"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&h=200&fit=crop",
		yearsUntilDownPayment: 3,
		yearsUntilOwn: 25,
		blueSquareText: "$544,900",
		onButtonClick: () => {
			console.log("Dream home card button clicked");
		},
	},
	render: (args) => (
		<div style={{ width: "350px" }}>
			<Card {...args} />
		</div>
	),
};

export const HouseCardInvestment: HouseCardStory = {
	args: {
		type: "house",
		optionalText: "Investment Property",
		showButton: true,
		buttonIcon: Home,
		location: "Toronto, ON",
		houseInfo: "2 bed, 1 bath • 1,200 sq ft • Condo",
		centerImage:
			"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=200&fit=crop",
		yearsUntilDownPayment: 5,
		yearsUntilOwn: 30,
		blueSquareText: "$544,900",
		onButtonClick: () => {
			console.log("Investment card button clicked");
		},
	},
	render: (args) => (
		<div style={{ width: "350px" }}>
			<Card {...args} />
		</div>
	),
};

export const HouseCardNoButton: HouseCardStory = {
	args: {
		type: "house",
		location: "Calgary, AB",
		houseInfo: "4 bed, 3 bath • 2,400 sq ft • Detached",
		centerImage:
			"https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=200&h=200&fit=crop",
		yearsUntilDownPayment: 2,
		yearsUntilOwn: 15,
		blueSquareText: "$544,900",
		showButton: false,
	},
	render: (args) => (
		<div style={{ width: "350px" }}>
			<Card {...args} />
		</div>
	),
};
