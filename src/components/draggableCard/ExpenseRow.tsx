import { X } from "lucide-react";

export interface ExpenseRowProps {
	id: string;
	name: string;
	amount: number;
	onRemove?: (id: string) => void;
	showRemoveButton?: boolean;
	className?: string;
	isEditable?: boolean;
	onEdit?: (id: string, name: string, amount: number) => void;
}

/**
 * Pure expense row component - handles display and basic interactions
 * No drag functionality - just a clean row with name, amount, and optional remove
 */
export const ExpenseRow: React.FC<ExpenseRowProps> = ({
	id,
	name,
	amount,
	onRemove,
	showRemoveButton = true,
	className = "",
	isEditable = false,
	onEdit,
}) => {
	const handleEdit = () => {
		if (!onEdit) return;

		const newName = prompt("Edit expense name:", name);
		const newAmount = prompt("Edit expense amount:", amount.toString());

		if (newName && newAmount) {
			onEdit(id, newName, parseFloat(newAmount) || 0);
		}
	};

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		onRemove?.(id);
	};

	return (
		<div
			className={`flex justify-between items-center py-2 border-b border-gray-100 group transition-all hover:bg-gray-50 ${className}`}
			onClick={isEditable ? handleEdit : undefined}
		>
			<div className="flex items-center gap-2 flex-1">
				<span
					className={`text-gray-700 text-sm flex-1 ${isEditable ? "cursor-pointer" : ""}`}
				>
					{name}
				</span>
			</div>

			<div className="flex items-center gap-2">
				<span
					className={`font-medium text-gray-800 ${isEditable ? "cursor-pointer" : ""}`}
				>
					${amount.toFixed(2)}
				</span>

				{showRemoveButton && onRemove && (
					<button
						onClick={handleRemove}
						className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1 rounded"
						aria-label={`Remove ${name}`}
					>
						<X className="w-3 h-3" />
					</button>
				)}
			</div>
		</div>
	);
};
