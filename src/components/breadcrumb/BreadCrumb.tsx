import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal, Minus } from "lucide-react";
import { cn } from "./../../lib/utils";
import { FlexibleDropdown, type DropdownItem } from "../Menu/DropDownMenu";

const Breadcrumb = React.forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav"> & {
		separator?: React.ReactNode;
	}
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
	HTMLOListElement,
	React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
	<ol
		ref={ref}
		className={cn(
			"flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
			className
		)}
		{...props}
	/>
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		className={cn("inline-flex items-center gap-1.5", className)}
		{...props}
	/>
));

BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<"a"> & {
		asChild?: boolean;
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "a";
	return (
		<Comp
			ref={ref}
			className={cn("transition-colors hover:text-foreground", className)}
			{...props}
		/>
	);
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		role="link"
		aria-disabled="true"
		aria-current="page"
		className={cn("font-normal text-foreground", className)}
		{...props}
	/>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
	children,
	className,
	...props
}: React.ComponentProps<"li">) => (
	<li
		role="presentation"
		aria-hidden="true"
		className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
		{...props}
	>
		{children ?? <Minus />}
	</li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Enhanced BreadcrumbEllipsis with dropdown support using FlexibleDropdown
interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {
	items?: DropdownItem[];
	onItemSelect?: (item: DropdownItem) => void;
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
}

const BreadcrumbEllipsis = ({
	className,
	items,
	onItemSelect,
	align = "center",
	side = "bottom",
	title,
	...props
}: BreadcrumbEllipsisProps) => {
	// If no items provided, render the original ellipsis
	if (!items || items.length === 0) {
		return (
			<span
				role="presentation"
				aria-hidden="true"
				className={cn("flex h-9 w-9 items-center justify-center", className)}
				title={title}
				{...props}
			>
				<MoreHorizontal className="h-4 w-4" />
				<span className="sr-only">More</span>
			</span>
		);
	}

	// Use your existing FlexibleDropdown component
	return (
		<FlexibleDropdown
			variant="ellipsis"
			items={items}
			onItemSelect={onItemSelect}
			ellipsisTitle={title}
			align={align}
			className={className}
		/>
	);
};
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
	type DropdownItem,
};
