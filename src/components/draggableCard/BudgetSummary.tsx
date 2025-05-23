import React from "react";
import {
	BudgetCategory,
	BudgetSummary as BudgetSummaryType,
} from "./BudgetCalculator";

export interface BudgetSummaryProps {
	categories: BudgetCategory[];
	summary: BudgetSummaryType;
	className?: string;
}

/**
 * Clean budget summary component
 * Displays overview statistics and category breakdowns
 */
export const BudgetSummary: React.FC<BudgetSummaryProps> = ({
	categories,
	summary,
	className = "",
}) => {
	return (
		<div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Budget Summary</h2>

			{/* Category Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
				{categories.map((category) => {
					const categoryTotal = summary.categoryTotals.find(
						(ct) => ct.categoryId === category.id
					);

					return (
						<div
							key={category.id}
							className="text-center p-4 bg-gray-50 rounded-lg"
						>
							<h3
								className="font-semibold text-gray-700 mb-2 truncate"
								title={category.title}
							>
								{category.title}
							</h3>
							<p className="text-2xl font-bold text-blue-600 mb-1">
								{category.budgetPercentage}%
							</p>
							<p className="text-sm text-gray-500 mb-1">
								${categoryTotal?.total.toFixed(2) || "0.00"}
							</p>
							<p className="text-xs text-gray-400">
								{categoryTotal?.itemCount || 0} item
								{categoryTotal?.itemCount !== 1 ? "s" : ""}
							</p>
						</div>
					);
				})}
			</div>

			{/* Summary Totals */}
			<div className="flex flex-col md:flex-row justify-center gap-4">
				<div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center flex-1 md:flex-none">
					<div className="text-sm opacity-90">Total Budget</div>
					<div className="text-lg font-semibold">
						${summary.totalAmount.toFixed(2)}
					</div>
				</div>

				<div className="bg-purple-600 text-white px-6 py-3 rounded-lg text-center flex-1 md:flex-none">
					<div className="text-sm opacity-90">Allocated</div>
					<div className="text-lg font-semibold">
						{summary.totalAllocatedPercentage}%
					</div>
				</div>

				<div
					className={`px-6 py-3 rounded-lg text-center flex-1 md:flex-none text-white ${
						summary.remainingPercentage > 0 ? "bg-green-600" : "bg-red-600"
					}`}
				>
					<div className="text-sm opacity-90">
						{summary.remainingPercentage > 0 ? "Remaining" : "Over Budget"}
					</div>
					<div className="text-lg font-semibold">
						{Math.abs(summary.remainingPercentage)}%
					</div>
				</div>
			</div>

			{/* Quick Stats */}
			<div className="mt-6 pt-4 border-t border-gray-200">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
					<div>
						<div className="text-sm text-gray-500">Categories</div>
						<div className="text-lg font-semibold text-gray-800">
							{categories.length}
						</div>
					</div>
					<div>
						<div className="text-sm text-gray-500">Total Items</div>
						<div className="text-lg font-semibold text-gray-800">
							{summary.categoryTotals.reduce(
								(sum, ct) => sum + ct.itemCount,
								0
							)}
						</div>
					</div>
					<div>
						<div className="text-sm text-gray-500">Avg per Category</div>
						<div className="text-lg font-semibold text-gray-800">
							$
							{categories.length > 0
								? (summary.totalAmount / categories.length).toFixed(0)
								: "0"}
						</div>
					</div>
					<div>
						<div className="text-sm text-gray-500">Budget Health</div>
						<div
							className={`text-lg font-semibold ${
								summary.remainingPercentage >= 20
									? "text-green-600"
									: summary.remainingPercentage >= 0
										? "text-yellow-600"
										: "text-red-600"
							}`}
						>
							{summary.remainingPercentage >= 20
								? "Great"
								: summary.remainingPercentage >= 0
									? "Good"
									: "Over"}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
