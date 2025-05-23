import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Settings, Home, X } from "lucide-react";
import { ExpenseRow } from "./ExpenseRow";
import { DraggableWrapper } from "./DraggableWrapper";
import { DraggableExpenseRow } from "./DraggableExpenseRow";
import { BudgetCategoryCard } from "./BudgetCategoryCard";
import { BudgetSummary } from "./BudgetSummary";
import { ExpenseGrid } from "./ExpenseGrid";
import { BudgetCalculator, BudgetCategory } from "./BudgetCalculator";
import { PriceDropdown } from "./PriceDropDown";
import { useState } from "react";
// =============================================================================
// ExpenseRow Stories
// =============================================================================
const expenseRowMeta = {
	title: "Budget/ExpenseRow",
	component: ExpenseRow,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Pure expense row component for displaying expense items with optional edit and remove functionality.",
			},
		},
	},
	argTypes: {
		amount: { control: { type: "number", min: 0, step: 0.01 } },
		showRemoveButton: { control: "boolean" },
		isEditable: { control: "boolean" },
	},
} satisfies Meta<typeof ExpenseRow>;

export default expenseRowMeta;

type ExpenseRowStory = StoryObj<typeof ExpenseRow>;

// Story with editable price that updates
export const WithEditablePrice: ExpenseRowStory = {
	args: {
		amount: 15000,
	},

	render: () => {
		const [amount, setAmount] = useState(1500);

		return (
			<div
				style={{
					width: "300px",
					padding: "20px",
					backgroundColor: "white",
					borderRadius: "8px",
					border: "1px solid #e2e8f0",
				}}
			>
				<ExpenseRow
					id="rent"
					name="Monthly Rent"
					amount={amount}
					showRemoveButton={true}
					isEditable={false}
					onRemove={(id) => console.log("Remove expense:", id)}
					onAmountEdit={(id, newAmount) => {
						console.log("Amount edited:", id, newAmount);
						setAmount(newAmount);
					}}
				/>
				<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
					💡 Click the underlined price to edit it
				</p>
			</div>
		);
	},
};

// Story with price dropdown that updates
export const WithPriceDropdown: ExpenseRowStory = {
	render: () => {
		const [amount, setAmount] = useState(0);

		return (
			<div
				style={{
					width: "300px",
					padding: "20px",
					backgroundColor: "white",
					borderRadius: "8px",
					border: "1px solid #e2e8f0",
				}}
			>
				<ExpenseRow
					id="coffee"
					name="Morning Coffee"
					amount={amount}
					showRemoveButton={true}
					isEditable={false}
					onRemove={(id) => console.log("Remove expense:", id)}
					onAmountEdit={(id, newAmount) => {
						console.log("Amount selected:", id, newAmount);
						setAmount(newAmount);
					}}
					DropdownComponent={PriceDropdown}
				/>
				<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
					💡 Click "Add price" to select from dropdown
				</p>
			</div>
		);
	},
};

// Story showing both behaviors in a list with state management
export const ExpenseList: ExpenseRowStory = {
	render: () => {
		const [expenses, setExpenses] = useState([
			{ id: "1", name: "Rent", amount: 1200 },
			{ id: "2", name: "Groceries", amount: 0 },
			{ id: "3", name: "Gas", amount: 45.2 },
			{ id: "4", name: "Coffee", amount: 0 },
			{ id: "5", name: "Internet", amount: 79.99 },
		]);

		const handleAmountEdit = (id: string, newAmount: number) => {
			console.log("Edit amount:", id, newAmount);
			setExpenses((prev) =>
				prev.map((expense) =>
					expense.id === id ? { ...expense, amount: newAmount } : expense
				)
			);
		};

		const handleRemove = (id: string) => {
			console.log("Remove:", id);
			setExpenses((prev) => prev.filter((expense) => expense.id !== id));
		};

		return (
			<div
				style={{
					width: "400px",
					padding: "20px",
					backgroundColor: "white",
					borderRadius: "8px",
					border: "1px solid #e2e8f0",
				}}
			>
				<h3
					style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}
				>
					Monthly Expenses
				</h3>
				<div
					style={{
						border: "1px solid #e2e8f0",
						borderRadius: "8px",
						overflow: "hidden",
					}}
				>
					{expenses.map((expense, index) => (
						<ExpenseRow
							key={expense.id}
							id={expense.id}
							name={expense.name}
							amount={expense.amount}
							showRemoveButton={true}
							onRemove={handleRemove}
							onAmountEdit={handleAmountEdit}
							DropdownComponent={PriceDropdown}
							className={index === expenses.length - 1 ? "border-b-0" : ""}
						/>
					))}
				</div>
				<p style={{ fontSize: "12px", color: "#64748b", marginTop: "12px" }}>
					💡 Items with prices are editable (underlined). Items without prices
					show dropdown.
				</p>
			</div>
		);
	},
};

// Story with full editing capabilities
export const FullyEditable: ExpenseRowStory = {
	args: {
		isEditable: true,
	},

	render: () => {
		const [expense, setExpense] = useState({
			id: "utilities",
			name: "Utilities",
			amount: 125.5,
		});

		const handleFullEdit = (id: string, name: string, amount: number) => {
			console.log("Full edit:", id, name, amount);
			setExpense({ id, name, amount });
		};

		const handleAmountEdit = (id: string, amount: number) => {
			console.log("Amount edited:", id, amount);
			setExpense((prev) => ({ ...prev, amount }));
		};

		return (
			<div
				style={{
					width: "300px",
					padding: "20px",
					backgroundColor: "white",
					borderRadius: "8px",
					border: "1px solid #e2e8f0",
				}}
			>
				<ExpenseRow
					{...expense}
					showRemoveButton={true}
					isEditable={true}
					onRemove={(id) => console.log("Remove expense:", id)}
					onEdit={handleFullEdit}
					onAmountEdit={handleAmountEdit}
				/>
				<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
					💡 Click anywhere to edit name, or click price to edit amount
				</p>
			</div>
		);
	},
};
// =============================================================================
// DraggableWrapper Stories
// =============================================================================
export const DraggableWrapperBasic: StoryObj<typeof DraggableWrapper> = {
	render: () => (
		<div style={{ padding: "40px" }}>
			<h3>Draggable Wrapper Examples</h3>
			<div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
				<DraggableWrapper
					dragData={{ type: "example", id: "1" }}
					showDragHandle={true}
					dragHandlePosition="left"
				>
					<div
						style={{
							padding: "16px",
							backgroundColor: "white",
							borderRadius: "8px",
							border: "1px solid #ddd",
						}}
					>
						<strong>Left Handle</strong>
						<p>Drag me using the handle on the left</p>
					</div>
				</DraggableWrapper>

				<DraggableWrapper
					dragData={{ type: "example", id: "2" }}
					showDragHandle={true}
					dragHandlePosition="right"
				>
					<div
						style={{
							padding: "16px",
							backgroundColor: "white",
							borderRadius: "8px",
							border: "1px solid #ddd",
						}}
					>
						<strong>Right Handle</strong>
						<p>Drag me using the handle on the right</p>
					</div>
				</DraggableWrapper>

				<DraggableWrapper
					dragData={{ type: "example", id: "3" }}
					showDragHandle={true}
					dragHandlePosition="top"
				>
					<div
						style={{
							padding: "16px",
							backgroundColor: "white",
							borderRadius: "8px",
							border: "1px solid #ddd",
							position: "relative",
						}}
					>
						<strong>Top Handle</strong>
						<p>Drag me using the handle at the top</p>
					</div>
				</DraggableWrapper>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates the flexible DraggableWrapper with different handle positions.",
			},
		},
	},
};

// =============================================================================
// DraggableExpenseRow Stories
// =============================================================================
export const DraggableExpenseRowDemo: StoryObj<typeof DraggableExpenseRow> = {
	render: () => (
		<div style={{ padding: "40px" }}>
			<h3>Draggable Expense Rows</h3>
			<div
				style={{
					width: "400px",
					backgroundColor: "white",
					borderRadius: "8px",
					padding: "16px",
				}}
			>
				<DraggableExpenseRow
					id="rent"
					name="Monthly Rent"
					amount={1500}
					categoryId="housing"
					onRemove={(id) => console.log("Remove:", id)}
					onEdit={(id, name, amount) =>
						console.log("Edit:", { id, name, amount })
					}
					isEditable={true}
				/>
				<DraggableExpenseRow
					id="utilities"
					name="Utilities"
					amount={200}
					categoryId="housing"
					onRemove={(id) => console.log("Remove:", id)}
					onEdit={(id, name, amount) =>
						console.log("Edit:", { id, name, amount })
					}
					isEditable={true}
				/>
				<DraggableExpenseRow
					id="internet"
					name="Internet"
					amount={80}
					categoryId="housing"
					onRemove={(id) => console.log("Remove:", id)}
					onEdit={(id, name, amount) =>
						console.log("Edit:", { id, name, amount })
					}
					isEditable={true}
				/>
			</div>
			<p style={{ fontSize: "12px", color: "#666", marginTop: "16px" }}>
				💡 Hover to see drag handles • Click rows to edit • Click X to remove
			</p>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Shows multiple draggable expense rows with edit and remove functionality.",
			},
		},
	},
};

// =============================================================================
// BudgetCategoryCard Stories
// =============================================================================
const sampleCategory: BudgetCategory = {
	id: "housing",
	title: "Housing",
	expenses: [
		{ id: "rent", name: "Monthly Rent", amount: 1500 },
		{ id: "utilities", name: "Utilities", amount: 200 },
		{ id: "insurance", name: "Renters Insurance", amount: 25 },
	],
	budgetPercentage: 35,
};

export const BudgetCategoryCardStory: StoryObj<typeof BudgetCategoryCard> = {
	args: {
		category: sampleCategory,
		index: 0,
		total: 1725,
		onAddExpense: (categoryId) => console.log("Add expense to:", categoryId),
		onRemoveExpense: (categoryId, expenseId) =>
			console.log("Remove expense:", { categoryId, expenseId }),
		onEditExpense: (categoryId, expenseId, name, amount) =>
			console.log("Edit expense:", { categoryId, expenseId, name, amount }),
		isDragging: false,
		isDropTarget: false,
		draggedItemType: null,
	},
	render: (args) => (
		<div style={{ width: "350px", padding: "20px" }}>
			<BudgetCategoryCard {...args} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Interactive budget category card with drag handles, expense management, and percentage display.",
			},
		},
	},
};

export const EmptyBudgetCategoryCard: StoryObj<typeof BudgetCategoryCard> = {
	args: {
		category: {
			id: "new-category",
			title: "New Category",
			expenses: [],
			budgetPercentage: 0,
		},
		index: 0,
		total: 0,
		onAddExpense: (categoryId) => console.log("Add expense to:", categoryId),
		onRemoveExpense: (categoryId, expenseId) =>
			console.log("Remove expense:", { categoryId, expenseId }),
		onEditExpense: (categoryId, expenseId, name, amount) =>
			console.log("Edit expense:", { categoryId, expenseId, name, amount }),
	},
	render: (args) => (
		<div style={{ width: "350px", padding: "20px" }}>
			<BudgetCategoryCard {...args} />
		</div>
	),
};

// =============================================================================
// BudgetSummary Stories
// =============================================================================
const sampleCategories: BudgetCategory[] = [
	sampleCategory,
	{
		id: "transportation",
		title: "Transportation",
		expenses: [
			{ id: "car-payment", name: "Car Payment", amount: 400 },
			{ id: "gas", name: "Gas", amount: 150 },
		],
		budgetPercentage: 15,
	},
	{
		id: "food",
		title: "Food",
		expenses: [{ id: "groceries", name: "Groceries", amount: 400 }],
		budgetPercentage: 12,
	},
];

export const BudgetSummaryStory: StoryObj<typeof BudgetSummary> = {
	args: {
		categories: sampleCategories,
		summary: BudgetCalculator.calculateBudgetSummary(sampleCategories),
	},
	render: (args) => (
		<div style={{ maxWidth: "800px", padding: "20px" }}>
			<BudgetSummary {...args} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Comprehensive budget summary with category breakdowns, totals, and health indicators.",
			},
		},
	},
};

export const OverBudgetSummary: StoryObj<typeof BudgetSummary> = {
	args: {
		categories: [
			...sampleCategories,
			{
				id: "extra",
				title: "Extra Spending",
				expenses: [{ id: "luxury", name: "Luxury Items", amount: 2000 }],
				budgetPercentage: 50, // This will put us over 100%
			},
		],
		summary: BudgetCalculator.calculateBudgetSummary([
			...sampleCategories,
			{
				id: "extra",
				title: "Extra Spending",
				expenses: [{ id: "luxury", name: "Luxury Items", amount: 2000 }],
				budgetPercentage: 50,
			},
		]),
	},
	render: (args) => (
		<div style={{ maxWidth: "800px", padding: "20px" }}>
			<BudgetSummary {...args} />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Shows budget summary when over 100% allocated with warning indicators.",
			},
		},
	},
};

// =============================================================================
// Full ExpenseGrid Stories
// =============================================================================
export const CompleteExpenseGrid: StoryObj<typeof ExpenseGrid> = {
	render: () => <ExpenseGrid />,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				story:
					"Complete expense grid with all functionality: drag to reorder cards, drag expenses between categories, add/edit/remove items.",
			},
		},
	},
};

export const ExpenseGridMobile: StoryObj<typeof ExpenseGrid> = {
	render: () => <ExpenseGrid />,
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
		layout: "fullscreen",
		docs: {
			description: {
				story: "Mobile responsive view of the expense grid.",
			},
		},
	},
};

export const ExpenseGridTablet: StoryObj<typeof ExpenseGrid> = {
	render: () => <ExpenseGrid />,
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
		layout: "fullscreen",
		docs: {
			description: {
				story: "Tablet view showing the two-column grid layout.",
			},
		},
	},
};
