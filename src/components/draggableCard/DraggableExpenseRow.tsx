import { ExpenseRow, type ExpenseRowProps } from "./ExpenseRow";
import { type DragData, DraggableWrapper } from "./DraggableWrapper";

export interface DraggableExpenseRowProps extends ExpenseRowProps {
	categoryId: string;
	isDragging?: boolean;
	dragData?: Partial<DragData>;
}

/**
 * Composed component that combines ExpenseRow with drag functionality
 * Clean separation of concerns - ExpenseRow handles display, DraggableWrapper handles drag
 */
export const DraggableExpenseRow: React.FC<DraggableExpenseRowProps> = ({
	categoryId,
	isDragging = false,
	dragData,
	...expenseRowProps
}) => {
	const defaultDragData: DragData = {
		type: "expense",
		id: expenseRowProps.id,
		categoryId,
		expense: {
			id: expenseRowProps.id,
			name: expenseRowProps.name,
			amount: expenseRowProps.amount,
		},
		...dragData,
	};

	return (
		<DraggableWrapper
			className="group cursor-grab active:cursor-grabbing" // <-- Add cursor styles
			dragData={defaultDragData}
			isDragging={isDragging}
			showDragHandle={false} // <-- Change this to false
		>
			<ExpenseRow {...expenseRowProps} />
		</DraggableWrapper>
	);
};
