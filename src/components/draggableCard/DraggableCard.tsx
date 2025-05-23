import React, { useState, useEffect, useRef } from "react";
import { Plus, GripVertical, X } from "lucide-react";
import {
	draggable,
	dropTargetForElements,
	monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

// Type definitions
interface ExpenseItem {
	id: string;
	name: string;
	amount: number;
}

interface ExpenseCard {
	id: string;
	title: string;
	expenses: ExpenseItem[];
	budgetPercentage: number;
}

interface ExpenseItemComponentProps {
	expense: ExpenseItem;
	cardId: string;
	onRemoveExpense: (cardId: string, expenseId: string) => void;
	isDragging: boolean;
}

interface ExpenseCardComponentProps {
	card: ExpenseCard;
	index: number;
	onAddExpense: (cardId: string) => void;
	onRemoveExpense: (cardId: string, expenseId: string) => void;
	isDragging: boolean;
	isDropTarget: boolean;
	draggedItemType: "card" | "expense" | null;
}

// Individual Expense Item Component
const ExpenseItemComponent: React.FC<ExpenseItemComponentProps> = ({
	expense,
	cardId,
	onRemoveExpense,
	isDragging,
}) => {
	const itemRef = useRef<HTMLDivElement>(null);
	const dragHandleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const itemElement = itemRef.current;
		const dragHandleElement = dragHandleRef.current;

		if (!itemElement || !dragHandleElement) return;

		const cleanup = draggable({
			element: itemElement,
			dragHandle: dragHandleElement,
			getInitialData: () => ({
				type: "expense",
				expenseId: expense.id,
				sourceCardId: cardId,
				expense: expense,
			}),
		});

		return cleanup;
	}, [expense.id, cardId, expense]);

	return (
		<div
			ref={itemRef}
			className={`flex justify-between items-center py-2 border-b border-gray-100 group transition-all ${
				isDragging ? "opacity-50 bg-blue-50" : "hover:bg-gray-50"
			}`}
		>
			<div className="flex items-center gap-2 flex-1">
				<div
					ref={dragHandleRef}
					className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<GripVertical className="w-3 h-3 text-gray-400" />
				</div>
				<span className="text-gray-700 text-sm flex-1">{expense.name}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="font-medium text-gray-800">${expense.amount}</span>
				<button
					onClick={() => onRemoveExpense(cardId, expense.id)}
					className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1"
				>
					<X className="w-3 h-3" />
				</button>
			</div>
		</div>
	);
};

// Individual Expense Card Component
const ExpenseCardComponent: React.FC<ExpenseCardComponentProps> = ({
	card,
	index,
	onAddExpense,
	onRemoveExpense,
	isDragging,
	isDropTarget,
	draggedItemType,
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const dragHandleRef = useRef<HTMLDivElement>(null);
	const expenseAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cardElement = cardRef.current;
		const dragHandleElement = dragHandleRef.current;
		const expenseAreaElement = expenseAreaRef.current;

		if (!cardElement || !dragHandleElement || !expenseAreaElement) return;

		// Make card draggable
		const cardDraggableCleanup = draggable({
			element: cardElement,
			dragHandle: dragHandleElement,
			getInitialData: () => ({ type: "card", cardId: card.id, index }),
		});

		// Make card a drop target for other cards
		const cardDropTargetCleanup = dropTargetForElements({
			element: cardElement,
			getData: () => ({ type: "card", index }),
			canDrop: ({ source }) =>
				source.data.type === "card" && source.data.cardId !== card.id,
		});

		// Make expense area a drop target for expense items
		const expenseDropTargetCleanup = dropTargetForElements({
			element: expenseAreaElement,
			getData: () => ({ type: "expense-area", cardId: card.id }),
			canDrop: ({ source }) =>
				source.data.type === "expense" && source.data.sourceCardId !== card.id,
		});

		return () => {
			cardDraggableCleanup();
			cardDropTargetCleanup();
			expenseDropTargetCleanup();
		};
	}, [card.id, index]);

	const totalAmount = card.expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0
	);

	return (
		<div
			ref={cardRef}
			className={`bg-white rounded-lg shadow-lg relative overflow-visible transition-all ${
				isDragging ? "opacity-50 rotate-2 scale-105" : "hover:shadow-xl"
			} ${isDropTarget && draggedItemType === "card" ? "ring-2 ring-blue-400 bg-blue-50" : ""}`}
			style={{ padding: "16px" }}
		>
			{/* Drag handle and Add button */}
			<div className="flex justify-between items-start mb-4">
				{/* Drag Handle */}
				<div
					ref={dragHandleRef}
					className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
				>
					<GripVertical className="w-4 h-4 text-gray-400" />
				</div>

				{/* Add Button */}
				<button
					onClick={() => onAddExpense(card.id)}
					className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors shadow-md"
				>
					<Plus className="w-4 h-4" />
				</button>
			</div>

			{/* Card Title */}
			<div className="mb-4">
				<h3 className="text-xl font-semibold text-gray-800 text-center">
					{card.title}
				</h3>
			</div>

			{/* Expense Items - Drop target area */}
			<div
				ref={expenseAreaRef}
				className={`space-y-1 mb-6 min-h-[60px] rounded p-2 transition-all ${
					isDropTarget && draggedItemType === "expense"
						? "bg-green-50 border-2 border-dashed border-green-300"
						: ""
				}`}
			>
				{card.expenses.map((expense) => (
					<ExpenseItemComponent
						key={expense.id}
						expense={expense}
						cardId={card.id}
						onRemoveExpense={onRemoveExpense}
						isDragging={false} // This will be managed by the monitor
					/>
				))}
				{card.expenses.length === 0 && (
					<div className="text-center text-gray-500 text-sm py-4">
						{isDropTarget && draggedItemType === "expense"
							? "Drop expense here"
							: "No expenses added yet"}
					</div>
				)}
			</div>

			{/* Total Amount */}
			<div className="mb-6">
				<div className="flex justify-between items-center py-2 border-t-2 border-gray-200">
					<span className="font-semibold text-gray-800">Total</span>
					<span className="font-bold text-lg text-gray-800">
						${totalAmount}
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
				<p className="font-bold text-2xl">{card.budgetPercentage}%</p>
			</div>
		</div>
	);
};

// Main Expense Grid Component
export const ExpenseGrid: React.FC = () => {
	const [cards, setCards] = useState<ExpenseCard[]>([
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

	const [dragState, setDragState] = useState<{
		draggedCardId: string | null;
		draggedExpenseId: string | null;
		dropTargetIndex: number | null;
		dropTargetCardId: string | null;
		draggedItemType: "card" | "expense" | null;
	}>({
		draggedCardId: null,
		draggedExpenseId: null,
		dropTargetIndex: null,
		dropTargetCardId: null,
		draggedItemType: null,
	});

	useEffect(() => {
		return monitorForElements({
			onDragStart: ({ source }) => {
				if (source.data.type === "card") {
					setDragState({
						draggedCardId: source.data.cardId as string,
						draggedExpenseId: null,
						dropTargetIndex: null,
						dropTargetCardId: null,
						draggedItemType: "card",
					});
				} else if (source.data.type === "expense") {
					setDragState({
						draggedCardId: null,
						draggedExpenseId: source.data.expenseId as string,
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
							dropTargetCardId: dropTarget.data.cardId as string,
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
					// Handle card reordering
					const sourceIndex = source.data.index as number;
					const targetIndex = dropTarget.data.index as number;

					if (sourceIndex === targetIndex) return;

					setCards((prevCards) => {
						const newCards = [...prevCards];
						const [draggedCard] = newCards.splice(sourceIndex, 1);
						newCards.splice(targetIndex, 0, draggedCard);
						return newCards;
					});
				} else if (
					source.data.type === "expense" &&
					dropTarget.data.type === "expense-area"
				) {
					// Handle expense item movement between cards
					const expenseData = source.data.expense as ExpenseItem;
					const sourceCardId = source.data.sourceCardId as string;
					const targetCardId = dropTarget.data.cardId as string;

					if (sourceCardId === targetCardId) return;

					setCards((prevCards) => {
						return prevCards.map((card) => {
							if (card.id === sourceCardId) {
								// Remove expense from source card
								return {
									...card,
									expenses: card.expenses.filter(
										(exp) => exp.id !== expenseData.id
									),
								};
							} else if (card.id === targetCardId) {
								// Add expense to target card
								return {
									...card,
									expenses: [...card.expenses, expenseData],
								};
							}
							return card;
						});
					});
				}
			},
		});
	}, []);

	const handleAddExpense = (cardId: string) => {
		const expenseName = prompt("Enter expense name:");
		const expenseAmount = prompt("Enter expense amount:");

		if (expenseName && expenseAmount) {
			setCards((prevCards) =>
				prevCards.map((card) =>
					card.id === cardId
						? {
								...card,
								expenses: [
									...card.expenses,
									{
										id: `${cardId}-${Date.now()}`,
										name: expenseName,
										amount: parseFloat(expenseAmount) || 0,
									},
								],
							}
						: card
				)
			);
		}
	};

	const handleRemoveExpense = (cardId: string, expenseId: string) => {
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id === cardId
					? {
							...card,
							expenses: card.expenses.filter(
								(expense) => expense.id !== expenseId
							),
						}
					: card
			)
		);
	};

	const totalBudgetPercentage = cards.reduce(
		(sum, card) => sum + card.budgetPercentage,
		0
	);
	const totalAmount = cards.reduce(
		(sum, card) =>
			sum +
			card.expenses.reduce((cardSum, expense) => cardSum + expense.amount, 0),
		0
	);

	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Monthly Budget Overview
					</h1>
					<p className="text-lg text-gray-600 mb-2">
						Total Budget: <span className="font-semibold">${totalAmount}</span>{" "}
						• Allocated:{" "}
						<span className="font-semibold">{totalBudgetPercentage}%</span>
					</p>
					<p className="text-sm text-gray-500">
						💡 Drag cards to reorder • Drag expense items between categories •
						Hover to see controls
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{cards.map((card, index) => (
						<ExpenseCardComponent
							key={card.id}
							card={card}
							index={index}
							onAddExpense={handleAddExpense}
							onRemoveExpense={handleRemoveExpense}
							isDragging={dragState.draggedCardId === card.id}
							isDropTarget={
								(dragState.dropTargetIndex === index &&
									dragState.draggedItemType === "card") ||
								(dragState.dropTargetCardId === card.id &&
									dragState.draggedItemType === "expense")
							}
							draggedItemType={dragState.draggedItemType}
						/>
					))}
				</div>

				{/* Quick Add Card */}
				<div className="mb-8">
					<button
						onClick={() => {
							const title = prompt("Enter category name:");
							if (title) {
								const newCard: ExpenseCard = {
									id: `category-${Date.now()}`,
									title,
									expenses: [],
									budgetPercentage: 0,
								};
								setCards((prev) => [...prev, newCard]);
							}
						}}
						className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
					>
						<Plus className="w-5 h-5" />
						Add New Category
					</button>
				</div>

				{/* Summary Section */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Budget Summary
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
						{cards.map((card) => {
							const cardTotal = card.expenses.reduce(
								(sum, expense) => sum + expense.amount,
								0
							);
							return (
								<div
									key={card.id}
									className="text-center p-4 bg-gray-50 rounded-lg"
								>
									<h3 className="font-semibold text-gray-700 mb-2">
										{card.title}
									</h3>
									<p className="text-2xl font-bold text-blue-600">
										{card.budgetPercentage}%
									</p>
									<p className="text-sm text-gray-500">${cardTotal}</p>
									<p className="text-xs text-gray-400">
										{card.expenses.length} items
									</p>
								</div>
							);
						})}
					</div>

					<div className="flex flex-col md:flex-row justify-center gap-4">
						<div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center">
							<span className="text-lg font-semibold">
								Total Allocated: {totalBudgetPercentage}%
							</span>
						</div>
						<div className="bg-green-600 text-white px-6 py-3 rounded-lg text-center">
							<span className="text-lg font-semibold">
								Remaining: {100 - totalBudgetPercentage}%
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExpenseGrid;
