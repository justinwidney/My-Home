import React from "react";
import { Plus } from "lucide-react";
import { BudgetCategory } from "./BudgetCalculator";
import { DraggableExpenseRow } from "./DraggableExpenseRow";
import { DraggableWrapper } from "./DraggableWrapper";

export interface BudgetCategoryCardProps {
	category: BudgetCategory;
	index: number;
	total: number;
	onAddExpense: (categoryId: string) => void;
	onRemoveExpense: (categoryId: string, expenseId: string) => void;
	onEditExpense: (
		categoryId: string,
		expenseId: string,
		name: string,
		amount: number
	) => void;
	isDragging?: boolean;
	isDropTarget?: boolean;
	draggedItemType?: "card" | "expense" | null;
	draggedExpenseIds?: string[];
}

/**
 * Clean budget category card component
 * Handles display of category with expenses and drag/drop zones
 */
export const BudgetCategoryCard: React.FC<BudgetCategoryCardProps> = ({
	category,
	index,
	total,
	onAddExpense,
	onRemoveExpense,
	onEditExpense,
	isDragging = false,
	isDropTarget = false,
	draggedItemType = null,
	draggedExpenseIds = [],
}) => {
	const cardDragData = {
		type: "card",
		id: category.id,
		index,
	};

	const cardDropData = {
		type: "card",
		id: category.id,
		index,
	};

	const expenseDropData = {
		type: "expense-area",
		id: category.id,
		categoryId: category.id,
	};

	const canDropCard = (dragData: any) => {
		return dragData.type === "card" && dragData.id !== category.id;
	};

	const canDropExpense = (dragData: any) => {
		return dragData.type === "expense" && dragData.categoryId !== category.id;
	};

	const getCardClasses = () => {
		const baseClasses =
			"bg-white rounded-lg shadow-lg relative overflow-visible transition-all hover:shadow-xl";
		const stateClasses = [];

		if (isDropTarget && draggedItemType === "card") {
			stateClasses.push("ring-2 ring-blue-400 bg-blue-50");
		}

		return `${baseClasses} ${stateClasses.join(" ")}`;
	};

	const getExpenseAreaClasses = () => {
		const baseClasses =
			"space-y-1 mb-6 min-h-[60px] rounded p-2 transition-all";
		const stateClasses = [];

		if (isDropTarget && draggedItemType === "expense") {
			stateClasses.push("bg-green-50 border-2 border-dashed border-green-300");
		}

		return `${baseClasses} ${stateClasses.join(" ")}`;
	};

	return (
		<DraggableWrapper
			dragData={cardDragData}
			dropData={cardDropData}
			canDrop={canDropCard}
			isDragging={isDragging}
			isDropTarget={isDropTarget && draggedItemType === "card"}
			showDragHandle={true}
			dragHandlePosition="top"
			className={getCardClasses()}
			dragHandleClassName="absolute top-2 left-2 z-10"
		>
			<div style={{ padding: "16px" }}>
				{/* Add Button */}
				<div className="flex justify-end mb-4">
					<button
						onClick={() => onAddExpense(category.id)}
						className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors shadow-md"
						aria-label={`Add expense to ${category.title}`}
					>
						<Plus className="w-4 h-4" />
					</button>
				</div>

				{/* Card Title */}
				<div className="mb-4">
					<h3 className="text-xl font-semibold text-gray-800 text-center">
						{category.title}
					</h3>
				</div>

				{/* Expense Items - Drop target area */}
				<DraggableWrapper
					dragData={expenseDropData}
					dropData={expenseDropData}
					canDrop={canDropExpense}
					isDropTarget={isDropTarget && draggedItemType === "expense"}
					showDragHandle={false}
					className={getExpenseAreaClasses()}
				>
					{category.expenses.map((expense) => (
						<DraggableExpenseRow
							key={expense.id}
							id={expense.id}
							name={expense.name}
							amount={expense.amount}
							categoryId={category.id}
							onRemove={(expenseId) => onRemoveExpense(category.id, expenseId)}
							onEdit={(expenseId, name, amount) =>
								onEditExpense(category.id, expenseId, name, amount)
							}
							isDragging={draggedExpenseIds.includes(expense.id)}
							isEditable={true}
						/>
					))}

					{category.expenses.length === 0 && (
						<div className="text-center text-gray-500 text-sm py-4">
							{isDropTarget && draggedItemType === "expense"
								? "Drop expense here"
								: "No expenses added yet"}
						</div>
					)}
				</DraggableWrapper>

				{/* Total Amount */}
				<div className="mb-6">
					<div className="flex justify-between items-center py-2 border-t-2 border-gray-200">
						<span className="font-semibold text-gray-800">Total</span>
						<span className="font-bold text-lg text-gray-800">
							${total.toFixed(2)}
						</span>
					</div>
				</div>

				{/* Blue box with budget percentage */}
				<div
					className="absolute -bottom-2 bg-blue-600 text-white rounded shadow-lg flex items-center justify-center"
					style={{
						height: "42px",
						left: "-16px",
						right: "-16px",
					}}
				>
					<p className="font-bold text-2xl">{category.budgetPercentage}%</p>
				</div>
			</div>
		</DraggableWrapper>
	);
};
