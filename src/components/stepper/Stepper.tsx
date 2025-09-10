// Stepper.tsx
import React from "react";

export interface Step {
	id: string;
	label: string;
}

export interface StepperProps {
	steps: Step[];
	currentStep: number;
	className?: string;
}

const Stepper: React.FC<StepperProps> = ({
	steps,
	currentStep,
	className = "",
}) => {
	return (
		<div className={`flex items-center space-x-4 ${className}`}>
			{steps.map((step, index) => (
				<React.Fragment key={step.id}>
					{/* Step Circle */}
					<div className="flex items-center">
						<div
							className={`
								relative flex items-center justify-center w-8 h-8 rounded-full
								text-sm font-semibold transition-all duration-300
								${
									index <= currentStep
										? "bg-blue-600 text-white shadow-lg"
										: "bg-gray-200 text-gray-500"
								}
							`}
						>
							{index < currentStep ? (
								// Checkmark for completed steps
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								// Step number
								<span>{index + 1}</span>
							)}
						</div>

						{/* Step Label */}
						<span
							className={`
								ml-3 text-sm font-medium transition-colors duration-300
								${index <= currentStep ? "text-gray-900" : "text-gray-500"}
							`}
						>
							{step.label}
						</span>
					</div>

					{/* Connector Line */}
					{index < steps.length - 1 && (
						<div
							className={`
								h-px flex-1 transition-all duration-300
								${index < currentStep ? "bg-blue-600" : "bg-gray-200"}
							`}
							style={{ minWidth: "2rem" }}
						/>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default Stepper;
