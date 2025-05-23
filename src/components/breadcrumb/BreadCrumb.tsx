import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { MoreHorizontal, Minus } from "lucide-react";
import { cn } from "./../../lib/utils";
import { FlexibleDropdown, type DropdownItem } from "../menu/DropDownMenu";

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
		aria-current="page"
		aria-disabled="true"
		className={cn("font-normal text-foreground", className)}
		role="link"
		{...props}
	/>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
	children,
	className,
	...props
}: React.ComponentProps<"li">): React.ReactElement => (
	<li
		aria-hidden="true"
		className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
		role="presentation"
		{...props}
	>
		{children ?? <Minus />}
	</li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Enhanced BreadcrumbEllipsis with dropdown support using FlexibleDropdown
interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {
	items?: Array<DropdownItem>;
	onItemSelect?: (item: DropdownItem) => void;
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
}

const BreadcrumbEllipsis = ({
	className,
	items,
	onItemSelect,
	align = "center",
	title,
	...props
}: BreadcrumbEllipsisProps): React.ReactElement => {
	// If no items provided, render the original ellipsis
	if (!items || items.length === 0) {
		return (
			<span
				aria-hidden="true"
				className={cn("flex h-9 w-9 items-center justify-center", className)}
				role="presentation"
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
			align={align}
			className={className}
			ellipsisTitle={title}
			items={items}
			variant="ellipsis"
			onItemSelect={onItemSelect}
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
