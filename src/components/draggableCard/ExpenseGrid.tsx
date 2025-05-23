import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { BudgetCategory, BudgetCalculator } from "./BudgetCalculator";
import { BudgetCategoryCard } from "./BudgetCategoryCard";
import { BudgetSummary } from "./BudgetSummary";

interface DragState {
	draggedCardId: string | null;
	draggedExpenseId: string | null;
	dropTargetIndex: number | null;
	dropTargetCardId: string | null;
	draggedItemType: "card" | "expense" | null;
}

/**
 * Main ExpenseGrid component - now much cleaner!
 * Handles only orchestration and drag monitoring
 * All business logic moved to BudgetCalculator
 * All UI components are separate and composable
 */
export const ExpenseGrid: React.FC = () => {
	const [categories, setCategories] = useState<BudgetCategory[]>([
		{
			id: "housing",
			title: "Housing",
			expenses: [
				{ id: "rent", name: "Rent", amount: 1500 },
				{ id: "utilities", name: "Utilities", amount: 200 },
				{ id: "power", name: "Power", amount: 120 },
				{ id: "water", name: "Water", amount: 80 },
			],
			budgetPercentage: 35,
		},
		{
			id: "transportation",
			title: "Transportation",
			expenses: [
				{ id: "car-payment", name: "Car Payment", amount: 400 },
				{ id: "gas", name: "Gas", amount: 150 },
				{ id: "insurance", name: "Insurance", amount: 100 },
			],
			budgetPercentage: 15,
		},
		{
			id: "food",
			title: "Food & Dining",
			expenses: [
				{ id: "groceries", name: "Groceries", amount: 400 },
				{ id: "dining-out", name: "Dining Out", amount: 200 },
			],
			budgetPercentage: 12,
		},
		{
			id: "entertainment",
			title: "Entertainment",
			expenses: [
				{ id: "streaming", name: "Streaming Services", amount: 50 },
				{ id: "hobbies", name: "Hobbies", amount: 100 },
			],
			budgetPercentage: 8,
		},
		{
			id: "savings",
			title: "Savings",
			expenses: [
				{ id: "emergency-fund", name: "Emergency Fund", amount: 300 },
				{ id: "retirement", name: "Retirement", amount: 500 },
			],
			budgetPercentage: 20,
		},
		{
			id: "healthcare",
			title: "Healthcare",
			expenses: [
				{ id: "insurance", name: "Health Insurance", amount: 250 },
				{ id: "medications", name: "Medications", amount: 50 },
			],
			budgetPercentage: 10,
		},
	]);

	const [dragState, setDragState] = useState<DragState>({
		draggedCardId: null,
		draggedExpenseId: null,
		dropTargetIndex: null,
		dropTargetCardId: null,
		draggedItemType: null,
	});

	// Calculate summary using pure business logic
	const summary = BudgetCalculator.calculateBudgetSummary(categories);

	// Setup drag monitoring
	useEffect(() => {
		return monitorForElements({
			onDragStart: ({ source }) => {
				if (source.data.type === "card") {
					setDragState({
						draggedCardId: source.data.id as string,
						draggedExpenseId: null,
						dropTargetIndex: null,
						dropTargetCardId: null,
						draggedItemType: "card",
					});
				} else if (source.data.type === "expense") {
					setDragState({
						draggedCardId: null,
						draggedExpenseId: source.data.id as string,
						dropTargetIndex: null,
						dropTargetCardId: null,
						draggedItemType: "expense",
					});
				}
			},
			onDragEnd: () => {
				setDragState({
					draggedCardId: null,
					draggedExpenseId: null,
					dropTargetIndex: null,
					dropTargetCardId: null,
					draggedItemType: null,
				});
			},
			onDropTargetChange: ({ location }) => {
				const dropTarget = location.current.dropTargets[0];
				if (dropTarget) {
					if (dropTarget.data.type === "card") {
						setDragState((prev) => ({
							...prev,
							dropTargetIndex: dropTarget.data.index as number,
							dropTargetCardId: null,
						}));
					} else if (dropTarget.data.type === "expense-area") {
						setDragState((prev) => ({
							...prev,
							dropTargetIndex: null,
							dropTargetCardId: dropTarget.data.categoryId as string,
						}));
					}
				} else {
					setDragState((prev) => ({
						...prev,
						dropTargetIndex: null,
						dropTargetCardId: null,
					}));
				}
			},
			onDrop: ({ source, location }) => {
				const dropTarget = location.current.dropTargets[0];
				if (!dropTarget) return;

				if (source.data.type === "card" && dropTarget.data.type === "card") {
					// Handle card reordering using BudgetCalculator
					const sourceIndex = source.data.index as number;
					const targetIndex = dropTarget.data.index as number;

					setCategories((prev) =>
						BudgetCalculator.reorderCategories(prev, sourceIndex, targetIndex)
					);
				} else if (
					source.data.type === "expense" &&
					dropTarget.data.type === "expense-area"
				) {
					// Handle expense movement using BudgetCalculator
					const expenseId = source.data.id as string;
					const sourceCardId = source.data.categoryId as string;
					const targetCardId = dropTarget.data.categoryId as string;

					setCategories((prev) =>
						BudgetCalculator.moveExpenseBetweenCategories(
							prev,
							expenseId,
							sourceCardId,
							targetCardId
						)
					);
				}
			},
		});
	}, []);

	// Event handlers using BudgetCalculator
	const handleAddExpense = (categoryId: string) => {
		const expenseName = prompt("Enter expense name:");
		const expenseAmount = prompt("Enter expense amount:");

		if (expenseName && expenseAmount) {
			setCategories((prev) =>
				BudgetCalculator.addExpenseToCategory(prev, categoryId, {
					name: expenseName,
					amount: parseFloat(expenseAmount) || 0,
				})
			);
		}
	};

	const handleRemoveExpense = (categoryId: string, expenseId: string) => {
		setCategories((prev) =>
			BudgetCalculator.removeExpenseFromCategory(prev, categoryId, expenseId)
		);
	};

	const handleEditExpense = (
		categoryId: string,
		expenseId: string,
		name: string,
		amount: number
	) => {
		setCategories((prev) =>
			BudgetCalculator.updateExpenseInCategory(prev, categoryId, expenseId, {
				name,
				amount,
			})
		);
	};

	const handleAddCategory = () => {
		const title = prompt("Enter category name:");
		if (title) {
			setCategories((prev) =>
				BudgetCalculator.addCategory(prev, {
					title,
					expenses: [],
					budgetPercentage: 0,
				})
			);
		}
	};

	// Get category totals for display
	const getCategoryTotal = (category: BudgetCategory) => {
		return BudgetCalculator.getCategoryTotal(category);
	};

	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Monthly Budget Overview
					</h1>
					<p className="text-lg text-gray-600 mb-2">
						Total Budget:{" "}
						<span className="font-semibold">
							${summary.totalAmount.toFixed(2)}
						</span>{" "}
						• Allocated:{" "}
						<span className="font-semibold">
							{summary.totalAllocatedPercentage}%
						</span>
					</p>
					<p className="text-sm text-gray-500">
						💡 Drag cards to reorder • Drag expense items between categories •
						Hover to see controls
					</p>
				</div>

				{/* Categories Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{categories.map((category, index) => (
						<BudgetCategoryCard
							key={category.id}
							category={category}
							index={index}
							total={getCategoryTotal(category)}
							onAddExpense={handleAddExpense}
							onRemoveExpense={handleRemoveExpense}
							onEditExpense={handleEditExpense}
							isDragging={dragState.draggedCardId === category.id}
							isDropTarget={
								(dragState.dropTargetIndex === index &&
									dragState.draggedItemType === "card") ||
								(dragState.dropTargetCardId === category.id &&
									dragState.draggedItemType === "expense")
							}
							draggedItemType={dragState.draggedItemType}
							draggedExpenseIds={
								dragState.draggedExpenseId ? [dragState.draggedExpenseId] : []
							}
						/>
					))}
				</div>

				{/* Add Category Button */}
				<div className="mb-8">
					<button
						onClick={handleAddCategory}
						className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
					>
						<Plus className="w-5 h-5" />
						Add New Category
					</button>
				</div>

				{/* Budget Summary */}
				<BudgetSummary categories={categories} summary={summary} />
			</div>
		</div>
	);
};

export default ExpenseGrid;
