import type { Meta, StoryObj } from "@storybook/react";
import { RefreshCw, ChevronDown } from "lucide-react";
import { MenuButton, FreeButton } from "./Buttons";

// MenuButton Stories
const menuMeta = {
	title: "Components/MenuButton",
	component: MenuButton,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof MenuButton>;

export default menuMeta;

type MenuButtonStory = StoryObj<{
	text: string;
	object: "slider" | "icon";
	size: "small" | "large";
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	sliderValue?: number;
	onSliderChange?: (value: number) => void;
	onClick?: () => void;
}>;

export const TextAndRefreshButton: MenuButtonStory = {
	args: {
		text: "Refresh",
		object: "icon",
		icon: RefreshCw,
		size: "small",
		onClick: () => {
			console.log("Refresh clicked");
		},
	},
	render: (args) => (
		<div style={{ width: "300px" }}>
			<MenuButton {...args} />
		</div>
	),
};

export const TextAndDropdownCarrot: MenuButtonStory = {
	args: {
		text: "Alberta",
		object: "icon",
		icon: ChevronDown,
		onClick: () => {
			console.log("Dropdown clicked");
		},
	},
	render: (args) => (
		<div style={{ width: "300px" }}>
			<MenuButton {...args} />
		</div>
	),
};

export const TextAndSlider: MenuButtonStory = {
	args: {
		text: "Price Range",
		object: "slider",
		sliderValue: 65,
		onSliderChange: (value) => {
			console.log("Slider value:", value);
		},
		onClick: () => {
			console.log("Button clicked");
		},
	},
	render: (args) => (
		<div style={{ width: "350px" }}>
			<MenuButton {...args} />
		</div>
	),
};
