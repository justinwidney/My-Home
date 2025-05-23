import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export interface ExpenseRowProps {
	id: string;
	name: string;
	amount: number;
	onRemove?: (id: string) => void;
	showRemoveButton?: boolean;
	className?: string;
	isEditable?: boolean;
	onEdit?: (id: string, name: string, amount: number) => void;
	onNameEdit?: (id: string, name: string) => void;
	onAmountEdit?: (id: string, amount: number) => void;
	DropdownComponent?: React.ComponentType<{
		onSelect: (value: number) => void;
		onClose: () => void;
	}>;
}

/**
 * Pure expense row component - handles display and basic interactions
 * Features editable name and price with inline editing
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
	onNameEdit,
	onAmountEdit,
	DropdownComponent,
}) => {
	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingAmount, setIsEditingAmount] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [editName, setEditName] = useState(name);
	const [editAmount, setEditAmount] = useState(amount.toString());
	const nameInputRef = useRef<HTMLInputElement>(null);
	const amountInputRef = useRef<HTMLInputElement>(null);

	const hasAmount = amount > 0;

	useEffect(() => {
		if (isEditingName && nameInputRef.current) {
			nameInputRef.current.focus();
			nameInputRef.current.select();
		}
	}, [isEditingName]);

	useEffect(() => {
		if (isEditingAmount && amountInputRef.current) {
			amountInputRef.current.focus();
			amountInputRef.current.select();
		}
	}, [isEditingAmount]);

	// Update local state when props change
	useEffect(() => {
		setEditName(name);
	}, [name]);

	useEffect(() => {
		setEditAmount(amount.toString());
	}, [amount]);

	const handleNameClick = (event: React.MouseEvent): void => {
		event.stopPropagation();
		if (!isEditable) return;

		setIsEditingName(true);
		setEditName(name);
	};

	const handleNameSubmit = (): void => {
		const trimmedName = editName.trim();
		if (trimmedName && trimmedName !== name) {
			if (onNameEdit) {
				onNameEdit(id, trimmedName);
			} else if (onEdit) {
				onEdit(id, trimmedName, amount);
			}
		}
		setIsEditingName(false);
		// Reset to current name if empty
		if (!trimmedName) {
			setEditName(name);
		}
	};

	const handleNameKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === "Enter") {
			handleNameSubmit();
		} else if (event.key === "Escape") {
			setIsEditingName(false);
			setEditName(name);
		}
	};

	const handleNameBlur = (): void => {
		handleNameSubmit();
	};

	const handleAmountClick = (event: React.MouseEvent): void => {
		event.stopPropagation();

		if (!hasAmount && DropdownComponent) {
			setShowDropdown(true);
		} else if (hasAmount) {
			setIsEditingAmount(true);
			setEditAmount(amount.toString());
		}
	};

	const handleAmountSubmit = (): void => {
		const newAmount = parseFloat(editAmount) || 0;
		if (onAmountEdit) {
			onAmountEdit(id, newAmount);
		} else if (onEdit && newAmount !== amount) {
			onEdit(id, name, newAmount);
		}
		setIsEditingAmount(false);
	};

	const handleAmountKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === "Enter") {
			handleAmountSubmit();
		} else if (event.key === "Escape") {
			setIsEditingAmount(false);
			setEditAmount(amount.toString());
		}
	};

	const handleAmountBlur = (): void => {
		handleAmountSubmit();
	};

	const handleDropdownSelect = (value: number): void => {
		if (onAmountEdit) {
			onAmountEdit(id, value);
		} else if (onEdit) {
			onEdit(id, name, value);
		}
		setShowDropdown(false);
	};

	const handleDropdownClose = (): void => {
		setShowDropdown(false);
	};

	const handleRemove = (event: React.MouseEvent): void => {
		event.stopPropagation();
		onRemove?.(id);
	};

	return (
		<div
			className={`flex justify-between items-center py-2  border-gray-100 group transition-all hover:bg-gray-50 relative ${className}`}
		>
			<div className="flex items-center gap-2">
				{isEditingName ? (
					<input
						ref={nameInputRef}
						autoFocus
						type="text"
						value={editName}
						className="
                        w-40
                        !appearance-none    /* kill the browser’s built-in textfield skin */
                        !px-3 !py-0.5 
                        box-border         /* include padding+border in that 5 rem */
                        font-medium text-gray-800
                        border border-blue-300 !rounded
                        focus:outline-none
                        focus:ring-1 focus:ring-blue-500
                    "
						onBlur={handleNameBlur}
						onKeyDown={handleNameKeyDown}
						onChange={(event) => {
							setEditName(event.target.value);
						}}
					/>
				) : (
					<span
						className={`text-gray-700 text-sm flex-1 px-3 ${
							isEditable
								? "cursor-pointer  decoration-gray-300 hover:text-blue-600 hover:decoration-blue-600"
								: ""
						}`}
						onClick={handleNameClick}
					>
						{name}
					</span>
				)}
			</div>

			<div className="flex items-center gap-2">
				<div className="relative">
					{isEditingAmount ? (
						<input
							ref={amountInputRef}
							className="w-20 px-1 py-0.5 text-right font-bold text-blue-800 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
							min="0"
							type="number"
							value={editAmount}
							onBlur={handleAmountBlur}
							onKeyDown={handleAmountKeyDown}
							onChange={(event) => {
								setEditAmount(event.target.value);
							}}
						/>
					) : (
						<span
							className={`font-medium cursor-pointer transition-colors ${
								hasAmount
									? "text-blue-800 underline decoration-gray-300 hover:text-blue-600 hover:decoration-blue-600"
									: "text-gray-400 hover:text-gray-600"
							}`}
							onClick={handleAmountClick}
						>
							{hasAmount ? `$${amount.toFixed(2)}` : "Add price"}
						</span>
					)}

					{showDropdown && DropdownComponent && (
						<div className="absolute right-0 top-full mt-1 z-10">
							<DropdownComponent
								onClose={handleDropdownClose}
								onSelect={handleDropdownSelect}
							/>
						</div>
					)}
				</div>

				{showRemoveButton && onRemove && (
					<button
						aria-label={`Remove ${name}`}
						className="opacity-0 group-hover:opacity-100 text-black-500 hover:text-black-700 transition-all p-1 rounded"
						onClick={handleRemove}
					>
						<X className="w-3 h-3" />
					</button>
				)}
			</div>
		</div>
	);
};
