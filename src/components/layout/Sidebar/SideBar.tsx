// Updated Sidebar.tsx
"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PanelLeftIcon } from "lucide-react";
import { Button } from "../../ui/button";

// Main Sidebar Container
interface SidebarProps {
	children: React.ReactNode;
	className?: string;
	defaultWidth?: number;
	collapsedWidth?: number;
}

export function Sidebar({
	children,
	className,
	defaultWidth = 240,
	collapsedWidth = 70,
}: SidebarProps): JSX.Element {
	const [isExpanded, setIsExpanded] = React.useState(false);
	const [isAnyMenuOpen, setIsAnyMenuOpen] = React.useState(false);

	// Effective expanded state - stays expanded when any menu is open
	const effectiveExpanded = isExpanded || isAnyMenuOpen;

	return (
		<aside
			style={{ width: effectiveExpanded ? defaultWidth : collapsedWidth }}
			className={cn(
				"h-screen flex-shrink-0 flex-col desktop:overflow-hidden desktop:rounded-tl-[10px] desktop:rounded-bl-[10px] justify-between fixed top-0 pb-4 items-center hidden md:flex z-50",
				"bg-background border-r border-border",
				"transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
				"hidden md:flex",
				className
			)}
			onMouseEnter={() => {
				setIsExpanded(true);
			}}
			onMouseLeave={() => {
				setIsExpanded(false);
			}}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(child as React.ReactElement, {
							isExpanded: effectiveExpanded,
							onMenuOpenChange: setIsAnyMenuOpen,
						})
					: child
			)}
		</aside>
	);
}

// Updated Header Section
interface SidebarHeaderProps {
	children: React.ReactNode;
	isExpanded?: boolean;
	onMenuOpenChange?: (open: boolean) => void;
}

export function SidebarHeader({
	children,
	isExpanded,
	onMenuOpenChange,
}: SidebarHeaderProps): JSX.Element {
	const injectExpanded = (node: React.ReactNode): React.ReactNode =>
		React.isValidElement(node)
			? React.cloneElement(node as React.ReactElement, {
					isExpanded,
					onMenuOpenChange,
				})
			: node;

	return (
		<div className="h-[70px] bg-background border-b border-border w-full relative">
			{children && injectExpanded(children)}
		</div>
	);
}

// Content Section
interface SidebarContentProps {
	children: React.ReactNode;
	isExpanded?: boolean;
	onMenuOpenChange?: (open: boolean) => void;
}

export function SidebarContent({
	children,
	isExpanded,
	onMenuOpenChange,
}: SidebarContentProps): JSX.Element {
	return (
		<div className="flex-1 flex flex-col w-full">
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(child as React.ReactElement, {
							isExpanded,
							onAnyMenuOpenChange: onMenuOpenChange,
						})
					: child
			)}
		</div>
	);
}

// Footer Section
interface SidebarFooterProps {
	children: React.ReactNode;
	isExpanded?: boolean;
}

export function SidebarFooter({
	children,
	isExpanded,
}: SidebarFooterProps): JSX.Element {
	return (
		<div className="pb-4 w-full">
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(child as React.ReactElement, { isExpanded })
					: child
			)}
		</div>
	);
}

// Trigger Button (for mobile/manual toggle)
interface SidebarTriggerProps {
	className?: string;
	onClick?: () => void;
}

export function SidebarTrigger({
	className,
	onClick,
}: SidebarTriggerProps): JSX.Element {
	return (
		<Button
			className={cn("size-7", className)}
			size="icon"
			variant="ghost"
			onClick={onClick}
		>
			<PanelLeftIcon />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}

// Inset for main content
interface SidebarInsetProps {
	children: React.ReactNode;
	className?: string;
}

export function SidebarInset({
	children,
	className,
}: SidebarInsetProps): JSX.Element {
	return <main className={cn("flex-1 ml-[70px]", className)}>{children}</main>;
}
