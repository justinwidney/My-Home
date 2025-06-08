// Stepper.tsx
import { Fragment, useState, type ReactNode } from "react";
import StepperHeader from "./StepperHeader";
import StepperSeparator from "./StepperSeperator";
import StepperContent from "./StepperContent";
import React from "react";

export interface Step {
	/** Anything you want to show as the “label” inside the header rectangle */
	header: ReactNode;
	/** The ReactNode to render when this step is active */
	content: ReactNode;
}

export interface StepperProps {
	/** Array of steps (each with a header + content) */
	steps: Step[];
	/** Index of the step to show first (0-based). Defaults to 0. */
	initialActiveStep?: number;
	/**
	 * If true, clicking on an **incomplete** step does nothing.
	 * Otherwise, user can jump around freely.
	 */
	linear?: boolean;
	/**
	 * Called whenever the active step changes:
	 * `(newIndex) => void`
	 */
	onStepChange?: (newIndex: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
	steps,
	initialActiveStep = 0,
	linear = false,
	onStepChange,
}) => {
	const [activeStep, setActiveStep] = useState<number>(initialActiveStep);

	const handleHeaderClick = (index: number) => {
		if (linear && index > activeStep) {
			// In linear mode, prevent clicking “ahead” of the current.
			return;
		}
		if (index !== activeStep) {
			setActiveStep(index);
			if (onStepChange) {
				onStepChange(index);
			}
		}
	};

	return (
		<div className="stepper-root" style={{ width: "100%" }}>
			{/* ───── HEADER (Squares + Separators) ───── */}
			<div
				className="stepper-header-container"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "1rem",
					gap: "1rem",
				}}
			>
				{steps.map((step, idx) => {
					const isHighlighted = idx <= activeStep; // ≤ so steps 0..activeStep all filled
					const isDisabled = linear && idx > activeStep;

					return (
						<React.Fragment key={idx}>
							<StepperHeader
								index={idx}
								isDisabled={isDisabled}
								isHighlighted={isHighlighted}
								onClick={() => {
									handleHeaderClick(idx);
								}}
							/>
						</React.Fragment>
					);
				})}
			</div>

			{/* ───── CONTENT (Only show active step’s content) ───── */}
			<div className="stepper-content-container">
				<StepperContent>{steps[activeStep]?.content}</StepperContent>
			</div>
		</div>
	);
};

export default Stepper;
