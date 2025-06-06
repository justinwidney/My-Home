// StepperContent.tsx
import type { ReactNode } from "react";

export interface StepperContentProps {
	/** Anything inside here will be the “body” of the active step. */
	children: ReactNode;
}

const StepperContent: React.FC<StepperContentProps> = ({ children }) => {
	return (
		<div
			className="stepper-content-box"
			style={{
				padding: "1rem",
				border: "1px solid #e0e0e0",
				borderRadius: "4px",
				backgroundColor: "#fafafa",
				minHeight: "8rem",
			}}
		>
			{children}
		</div>
	);
};

export default StepperContent;
