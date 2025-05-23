import { useState, useCallback } from "react";
import {
	BudgetCategory,
	BudgetCalculator,
	BudgetSummary,
} from "./BudgetCalculator";

export interface UseBudgetReturn {
	categories: BudgetCategory[];
	summary: BudgetSummary;
	validation: ReturnType<typeof BudgetCalculator.validateBudget>;
	actions: {
		addExpense: (categoryId: string, name: string, amount: number) => void;
		removeExpense: (categoryId: string, expenseId: string) => void;
		editExpense: (
			categoryId: string,
			expenseId: string,
			name: string,
			amount: number
		) => void;
		moveExpense: (
			expenseId: string,
			sourceCategoryId: string,
			targetCategoryId: string
		) => void;
		addCategory: (title: string, budgetPercentage?: number) => void;
		removeCategory: (categoryId: string) => void;
		editCategory: (
			categoryId: string,
			updates: Partial<Pick<BudgetCategory, "title" | "budgetPercentage">>
		) => void;
		reorderCategories: (sourceIndex: number, targetIndex: number) => void;
		setCategories: (categories: BudgetCategory[]) => void;
		resetBudget: () => void;
	};
}

const DEFAULT_CATEGORIES: BudgetCategory[] = [
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
];

/**
 * Custom hook for budget management
 * Encapsulates all budget state and operations
 * Uses BudgetCalculator for pure business logic
 */
export const useBudget = (
	initialCategories: BudgetCategory[] = DEFAULT_CATEGORIES
): UseBudgetReturn => {
	const [categories, setCategories] =
		useState<BudgetCategory[]>(initialCategories);

	// Memoized calculations
	const summary = BudgetCalculator.calculateBudgetSummary(categories);
	const validation = BudgetCalculator.validateBudget(categories);

	// Action creators using useCallback for performance
	const addExpense = useCallback(
		(categoryId: string, name: string, amount: number) => {
			setCategories((prev) =>
				BudgetCalculator.addExpenseToCategory(prev, categoryId, {
					name,
					amount,
				})
			);
		},
		[]
	);

	const removeExpense = useCallback((categoryId: string, expenseId: string) => {
		setCategories((prev) =>
			BudgetCalculator.removeExpenseFromCategory(prev, categoryId, expenseId)
		);
	}, []);

	const editExpense = useCallback(
		(categoryId: string, expenseId: string, name: string, amount: number) => {
			setCategories((prev) =>
				BudgetCalculator.updateExpenseInCategory(prev, categoryId, expenseId, {
					name,
					amount,
				})
			);
		},
		[]
	);

	const moveExpense = useCallback(
		(expenseId: string, sourceCategoryId: string, targetCategoryId: string) => {
			setCategories((prev) =>
				BudgetCalculator.moveExpenseBetweenCategories(
					prev,
					expenseId,
					sourceCategoryId,
					targetCategoryId
				)
			);
		},
		[]
	);

	const addCategory = useCallback(
		(title: string, budgetPercentage: number = 0) => {
			setCategories((prev) =>
				BudgetCalculator.addCategory(prev, {
					title,
					expenses: [],
					budgetPercentage,
				})
			);
		},
		[]
	);

	const removeCategory = useCallback((categoryId: string) => {
		setCategories((prev) => BudgetCalculator.removeCategory(prev, categoryId));
	}, []);

	const editCategory = useCallback(
		(
			categoryId: string,
			updates: Partial<Pick<BudgetCategory, "title" | "budgetPercentage">>
		) => {
			setCategories((prev) =>
				BudgetCalculator.updateCategory(prev, categoryId, updates)
			);
		},
		[]
	);

	const reorderCategories = useCallback(
		(sourceIndex: number, targetIndex: number) => {
			setCategories((prev) =>
				BudgetCalculator.reorderCategories(prev, sourceIndex, targetIndex)
			);
		},
		[]
	);

	const resetBudget = useCallback(() => {
		setCategories(DEFAULT_CATEGORIES);
	}, []);

	return {
		categories,
		summary,
		validation,
		actions: {
			addExpense,
			removeExpense,
			editExpense,
			moveExpense,
			addCategory,
			removeCategory,
			editCategory,
			reorderCategories,
			setCategories,
			resetBudget,
		},
	};
};
