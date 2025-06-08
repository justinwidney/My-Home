// StepperHeader.tsx
import { Slot } from "@radix-ui/react-slot";
import React, { type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

export interface StepperHeaderProps {
	/** Index of this step (0-based) */
	index: number;
	/** If true, make this square “fully filled” (active or previously completed) */
	isHighlighted: boolean;
	/** If true, make this square non-clickable/greyed-out */
	isDisabled: boolean;
	/** Called when user clicks this square (unless isDisabled) */
	onClick: () => void;
}

const StepperHeader = React.forwardRef<HTMLButtonElement, StepperHeaderProps>(
	({ isHighlighted, isDisabled, onClick }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				className={cn(
					// 20px × 20px square + md (rounded-md) border radius
					"w-5 h-5 rounded-md border transition-colors ",
					// Disabled state
					isDisabled
						? "cursor-not-allowed bg-gray-100 border-gray-200"
						: "cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring",
					// Highlighted = “filled” (applies to both current and all previous steps)
					isHighlighted
						? "bg-gray-500 border-gray-500"
						: "bg-white border-gray-300"
				)}
				onClick={() => {
					if (!isDisabled) {
						onClick();
					}
				}}
			/>
		);
	}
);

StepperHeader.displayName = "StepperHeader";

export default StepperHeader;
