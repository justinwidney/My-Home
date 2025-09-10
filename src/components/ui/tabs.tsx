"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>): JSX.Element {
	return (
		<TabsPrimitive.Root
			className={cn("flex flex-col gap-2", className)}
			data-slot="tabs"
			{...props}
		/>
	);
}

function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>): JSX.Element {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				"bg-gray-100 dark:bg-white border-gray-500 border-2 inline-flex items-center justify-center rounded-2xl relative w-full",
				className
			)}
			{...props}
		/>
	);
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>): JSX.Element {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				// Default (inactive) state
				"inline-flex h-full flex-1 items-center justify-center gap-1.5 \
                rounded-2xl px-4 py-2 text-sm font-medium \
                text-gray-700 transition-colors relative \
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 \
                disabled:pointer-events-none disabled:opacity-50 \
                \
                data-[state=active]:bg-white data-[state=active]:text-black \
                data-[state=active]:shadow-sm data-[state=active]:z-10 \
                data-[state=active]:border-2 data-[state=active]:border-black \
                data-[state=active]:-m-[2px] data-[state=active]:h-[calc(100%+4px)]",
				className
			)}
			{...props}
		/>
	);
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>): JSX.Element {
	return (
		<TabsPrimitive.Content
			className={cn("flex-1 outline-none", className)}
			data-slot="tabs-content"
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
