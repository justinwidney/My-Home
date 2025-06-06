import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

// MenuButton Stories
const menuMeta = {
	title: "Components/Tabs",
	component: Tabs,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Tabs>;

export default menuMeta;

type TabStory = StoryObj<object>;

export const TextAndRefreshButton: TabStory = {
	args: {
		text: "Refresh",
		object: "icon",
		size: "small",
		onClick: () => {
			console.log("Refresh clicked");
		},
	},
	render: () => (
		<div className="flex w-full max-w-sm flex-col gap-6 justify-content-center">
			<Tabs className="w-[600px]" defaultValue="account">
				<TabsList>
					<TabsTrigger value="account">Situation</TabsTrigger>
					<TabsTrigger value="password">How it Works?</TabsTrigger>
					<TabsTrigger value="templates">Templates</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					Make changes to your account here.
				</TabsContent>
				<TabsContent value="password">Change your password here.</TabsContent>
				<TabsContent value="templates">Change your password here.</TabsContent>
			</Tabs>
		</div>
	),
};
