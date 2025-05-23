import React from "react";
import { ExpenseRow, ExpenseRowProps } from "./ExpenseRow";
import { DraggableWrapper, DragData } from "./DraggableWrapper";

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
			dragData={defaultDragData}
			isDragging={isDragging}
			showDragHandle={true}
			dragHandlePosition="left"
			dragHandleClassName="opacity-0 group-hover:opacity-100"
			className="group"
		>
			<ExpenseRow {...expenseRowProps} />
		</DraggableWrapper>
	);
};
