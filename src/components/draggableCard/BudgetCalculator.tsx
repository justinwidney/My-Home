export interface ExpenseItem {
	id: string;
	name: string;
	amount: number;
}

export interface BudgetCategory {
	id: string;
	title: string;
	expenses: ExpenseItem[];
	budgetPercentage: number;
	color?: string;
}

export interface BudgetSummary {
	totalAmount: number;
	totalAllocatedPercentage: number;
	remainingPercentage: number;
	categoryTotals: Array<{
		categoryId: string;
		total: number;
		itemCount: number;
	}>;
}

/**
 * Pure business logic for budget calculations
 * No React dependencies - just pure functions
 */
export class BudgetCalculator {
	/**
	 * Calculate total amount for a single category
	 */
	static getCategoryTotal(category: BudgetCategory): number {
		return category.expenses.reduce((sum, expense) => sum + expense.amount, 0);
	}

	/**
	 * Calculate comprehensive budget summary
	 */
	static calculateBudgetSummary(categories: BudgetCategory[]): BudgetSummary {
		const totalAmount = categories.reduce(
			(sum, category) => sum + this.getCategoryTotal(category),
			0
		);

		const totalAllocatedPercentage = categories.reduce(
			(sum, category) => sum + category.budgetPercentage,
			0
		);

		const categoryTotals = categories.map((category) => ({
			categoryId: category.id,
			total: this.getCategoryTotal(category),
			itemCount: category.expenses.length,
		}));

		return {
			totalAmount,
			totalAllocatedPercentage,
			remainingPercentage: Math.max(0, 100 - totalAllocatedPercentage),
			categoryTotals,
		};
	}

	/**
	 * Add expense to category
	 */
	static addExpenseToCategory(
		categories: BudgetCategory[],
		categoryId: string,
		expense: Omit<ExpenseItem, "id">
	): BudgetCategory[] {
		return categories.map((category) =>
			category.id === categoryId
				? {
						...category,
						expenses: [
							...category.expenses,
							{
								...expense,
								id: `${categoryId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
							},
						],
					}
				: category
		);
	}

	/**
	 * Remove expense from category
	 */
	static removeExpenseFromCategory(
		categories: BudgetCategory[],
		categoryId: string,
		expenseId: string
	): BudgetCategory[] {
		return categories.map((category) =>
			category.id === categoryId
				? {
						...category,
						expenses: category.expenses.filter(
							(expense) => expense.id !== expenseId
						),
					}
				: category
		);
	}

	/**
	 * Move expense between categories
	 */
	static moveExpenseBetweenCategories(
		categories: BudgetCategory[],
		expenseId: string,
		sourceCategoryId: string,
		targetCategoryId: string
	): BudgetCategory[] {
		if (sourceCategoryId === targetCategoryId) return categories;

		// Find the expense to move
		const sourceCategory = categories.find(
			(cat) => cat.id === sourceCategoryId
		);
		const expenseToMove = sourceCategory?.expenses.find(
			(exp) => exp.id === expenseId
		);

		if (!expenseToMove) return categories;

		return categories.map((category) => {
			if (category.id === sourceCategoryId) {
				// Remove from source
				return {
					...category,
					expenses: category.expenses.filter((exp) => exp.id !== expenseId),
				};
			} else if (category.id === targetCategoryId) {
				// Add to target
				return {
					...category,
					expenses: [...category.expenses, expenseToMove],
				};
			}
			return category;
		});
	}

	/**
	 * Update expense in category
	 */
	static updateExpenseInCategory(
		categories: BudgetCategory[],
		categoryId: string,
		expenseId: string,
		updates: Partial<Omit<ExpenseItem, "id">>
	): BudgetCategory[] {
		return categories.map((category) =>
			category.id === categoryId
				? {
						...category,
						expenses: category.expenses.map((expense) =>
							expense.id === expenseId ? { ...expense, ...updates } : expense
						),
					}
				: category
		);
	}

	/**
	 * Reorder categories
	 */
	static reorderCategories(
		categories: BudgetCategory[],
		sourceIndex: number,
		targetIndex: number
	): BudgetCategory[] {
		if (sourceIndex === targetIndex) return categories;

		const newCategories = [...categories];
		const [movedCategory] = newCategories.splice(sourceIndex, 1);
		newCategories.splice(targetIndex, 0, movedCategory);

		return newCategories;
	}

	/**
	 * Add new category
	 */
	static addCategory(
		categories: BudgetCategory[],
		category: Omit<BudgetCategory, "id">
	): BudgetCategory[] {
		return [
			...categories,
			{
				...category,
				id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			},
		];
	}

	/**
	 * Remove category
	 */
	static removeCategory(
		categories: BudgetCategory[],
		categoryId: string
	): BudgetCategory[] {
		return categories.filter((category) => category.id !== categoryId);
	}

	/**
	 * Update category properties
	 */
	static updateCategory(
		categories: BudgetCategory[],
		categoryId: string,
		updates: Partial<Omit<BudgetCategory, "id" | "expenses">>
	): BudgetCategory[] {
		return categories.map((category) =>
			category.id === categoryId ? { ...category, ...updates } : category
		);
	}

	/**
	 * Get percentage of total budget for a category based on amount
	 */
	static calculateCategoryPercentage(
		categoryAmount: number,
		totalBudget: number
	): number {
		if (totalBudget === 0) return 0;
		return Math.round((categoryAmount / totalBudget) * 100);
	}

	/**
	 * Validate budget data
	 */
	static validateBudget(categories: BudgetCategory[]): {
		isValid: boolean;
		errors: string[];
		warnings: string[];
	} {
		const errors: string[] = [];
		const warnings: string[] = [];

		// Check for duplicate category IDs
		const categoryIds = categories.map((cat) => cat.id);
		const duplicateIds = categoryIds.filter(
			(id, index) => categoryIds.indexOf(id) !== index
		);
		if (duplicateIds.length > 0) {
			errors.push(`Duplicate category IDs found: ${duplicateIds.join(", ")}`);
		}

		// Check for negative amounts
		categories.forEach((category) => {
			category.expenses.forEach((expense) => {
				if (expense.amount < 0) {
					warnings.push(
						`Negative amount in ${category.title}: ${expense.name}`
					);
				}
			});
		});

		// Check if total percentage exceeds 100%
		const summary = this.calculateBudgetSummary(categories);
		if (summary.totalAllocatedPercentage > 100) {
			warnings.push(
				`Total allocated percentage (${summary.totalAllocatedPercentage}%) exceeds 100%`
			);
		}

		return {
			isValid: errors.length === 0,
			errors,
			warnings,
		};
	}
}
