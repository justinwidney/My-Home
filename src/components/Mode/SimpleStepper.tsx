// SimpleStepper.tsx

import React from "react";

interface SimpleStepperProps {
	totalSteps: number;
	currentStep: number;
	className?: string;
}

export const SimpleStepper: React.FC<SimpleStepperProps> = ({
	totalSteps,
	currentStep,
	className = "",
}) => {
	return (
		<div className={`flex items-center justify-center gap-4 ${className}`}>
			{Array.from({ length: totalSteps }, (_, index) => {
				const stepNumber = index + 1;
				const isActive = stepNumber <= currentStep;

				return (
					<div
						key={stepNumber}
						className={`
              w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors
              ${
								isActive
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-600"
							}
            `}
					>
						{stepNumber}
					</div>
				);
			})}
		</div>
	);
};
