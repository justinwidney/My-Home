// Sidebar.tsx
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
				"h-screen flex flex-col justify-start fixed top-0 left-0 p-2 z-50",
				"transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
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

// Header Section
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
	return (
		<div className="bg-background border border-border rounded-lg w-full mb-3 overflow-hidden shadow-sm flex-shrink-0">
			<div className="h-full w-full relative">
				{React.Children.map(children, (child) =>
					React.isValidElement(child)
						? React.cloneElement(child as React.ReactElement, {
								isExpanded,
								onMenuOpenChange,
							})
						: child
				)}
			</div>
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
		<div className="bg-background border border-border rounded-lg w-full mb-2 overflow-y-auto shadow-sm flex-shrink-0 flex-grow-0">
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
		<div className="bg-background border border-border rounded-lg w-full shadow-sm flex-shrink-0 mt-auto">
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
			className={cn("size-10", className)}
			size="icon"
			variant="ghost"
			onClick={onClick}
		>
			<PanelLeft size={20} />
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
	return <main className={cn("flex-1 ", className)}>{children}</main>;
}
