"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

interface EarningsSummaryItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	amount: string | number;
	subText?: string;
	subTextVariant?: "default" | "muted" | "success" | "danger";
}

export function EarningsSummaryItem({
	label,
	amount,
	subText,
	subTextVariant = "muted",
	className,
	...props
}: EarningsSummaryItemProps) {
	const formattedAmount =
		typeof amount === "number"
			? new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}).format(amount)
			: amount;

	const subTextClasses = {
		default: "text-gray-700",
		muted: "text-gray-500",
		success: "text-green-600",
		danger: "text-red-600",
	};

	return (
		<div
			className={cn("flex flex-col", className)}
			data-slot="earnings-summary-item"
			{...props}
		>
			<span
				className="text-sm font-medium text-gray-600 mb-1"
				data-slot="earnings-label"
			>
				{label}
			</span>
			<span
				className="text-2xl font-semibold text-gray-900"
				data-slot="earnings-amount"
			>
				{formattedAmount}
			</span>
			{subText && (
				<span
					className={cn("text-xs mt-1", subTextClasses[subTextVariant])}
					data-slot="earnings-subtext"
				>
					{subText}
				</span>
			)}
		</div>
	);
}

// Example usage with the Table component
export function EarningsSummaryExample() {
	return (
		<div className="flex gap-8 p-6">
			<EarningsSummaryItem
				label="Total Revenue"
				amount={125430.5}
				subText="+12.5% from last month"
				subTextVariant="success"
			/>

			<EarningsSummaryItem
				label="Net Profit"
				amount={45200.0}
				subText="-3.2% from last month"
				subTextVariant="danger"
			/>

			<EarningsSummaryItem
				label="Average Order Value"
				amount={87.25}
				subText="Based on 1,437 orders"
			/>

			<EarningsSummaryItem label="Pending Payouts" amount={8750.0} />
		</div>
	);
}

// Example of using EarningsSummaryItem within a Table Row
import { TableRow } from "./Table";

export function EarningsSummaryRow() {
	return (
		<TableRow className="py-6">
			<div className="flex flex-1 justify-between items-center">
				<EarningsSummaryItem
					label="Today's Earnings"
					amount={3245.8}
					subText="+18 orders"
					className="flex-1"
				/>

				<EarningsSummaryItem
					label="This Week"
					amount={18750.0}
					subText="+24.3% vs last week"
					subTextVariant="success"
					className="flex-1"
				/>

				<EarningsSummaryItem
					label="This Month"
					amount={84320.5}
					subText="On track to beat target"
					subTextVariant="success"
					className="flex-1"
				/>
			</div>
		</TableRow>
	);
}
