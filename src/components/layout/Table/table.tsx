"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

interface TableContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function Table({ children, className, ...props }: TableProps) {
	return (
		<div
			className={cn("flex flex-col w-full", className)}
			data-slot="table"
			{...props}
		>
			{children}
		</div>
	);
}

export function TableHeader({
	children,
	className,
	...props
}: TableHeaderProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-between gap-2 mb-4 px-6 py-3",
				className
			)}
			data-slot="table-header"
			{...props}
		>
			<div className="flex items-center gap-2">{children}</div>
		</div>
	);
}

export function TableContent({
	children,
	className,
	...props
}: TableContentProps) {
	return (
		<div
			className={cn(
				"bg-white border border-black rounded-lg overflow-hidden",
				className
			)}
			data-slot="table-content"
			{...props}
		>
			{children}
		</div>
	);
}

export function TableRow({ children, className, ...props }: TableRowProps) {
	return (
		<div
			className={cn(
				"flex items-center px-6 py-4 border-b border-gray-200 last:border-b-0",
				"hover:bg-gray-50 transition-colors",
				className
			)}
			data-slot="table-row"
			{...props}
		>
			{children}
		</div>
	);
}

// Example usage component
export function TableExample() {
	return (
		<Table>
			<TableHeader>
				<Button variant="outline" size="sm">
					Action 1
				</Button>
				<Button variant="outline" size="sm">
					Action 2
				</Button>
				<Button variant="default" size="sm">
					Primary Action
				</Button>
			</TableHeader>

			<TableContent>
				<TableRow>
					<div className="flex-1">Row 1 Content</div>
				</TableRow>
				<TableRow>
					<div className="flex-1">Row 2 Content</div>
				</TableRow>
				<TableRow>
					<div className="flex-1">Row 3 Content</div>
				</TableRow>
			</TableContent>
		</Table>
	);
}
