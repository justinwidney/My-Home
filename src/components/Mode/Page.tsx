// Page.tsx (Enhanced with visual effects)
import React, { useState } from "react";
import { Tabs, TabsContent } from "../ui/tabs";
import { FreeButton } from "../buttons/Buttons";
import { Header } from "./Header";
import { ModeCardGrid } from "./ModeCardGrid";
import { BackgroundPattern } from "./BackgroundPattern";
import { defaultUser, modeCardsData } from "./data";
import type { ModeSelectionProps } from "./types";
import Stepper, { type Step } from "../stepper/Stepper";

const stepperSteps: Step[] = [
	{ id: "select", label: "Pick a Mode" },
	{ id: "configure", label: "Configure" },
	{ id: "review", label: "Review" },
	{ id: "start", label: "Start" },
];

const ModeSelectionPage: React.FC<ModeSelectionProps> = ({
	onModeSelect,
	onContinue,
	initialSelectedMode = "",
}) => {
	const [selectedMode, setSelectedMode] = useState<string>(initialSelectedMode);

	const handleAbilitySelect = (cardId: string, abilityId: string) => {
		setSelectedMode(cardId);
		onModeSelect?.(cardId);
		console.log(`Selected ${abilityId} from ${cardId}`);
	};

	const handleContinue = () => {
		if (selectedMode) {
			onContinue?.(selectedMode);
			console.log("Selected mode:", selectedMode);
		}
	};

	// Determine current step based on selected mode
	const getCurrentStep = () => {
		if (!selectedMode) return 0;
		return 1; // Move to step 1 when mode is selected
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
			<BackgroundPattern />

			{/* Glassmorphism effect overlay */}
			<div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px] pointer-events-none"></div>

			<Tabs defaultValue="overview" className="min-h-screen relative z-10">
				<Header user={defaultUser} />

				{/* Main content with proper spacing */}
				<div className="px-6 pt-4 pb-24">
					<div className="relative z-20 m-auto w-full">
						<TabsContent value="overview" className="block">
							<div className="space-y-16">
								{/* Hero Section with enhanced styling */}
								<div className="text-center space-y-6 relative">
									{/* Subtle background for hero text */}
									<div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl -mx-8 -my-8 pointer-events-none"></div>

									<div className="relative z-10 pt-8">
										<h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4 drop-shadow-sm">
											Choose your experience
										</h1>
										<p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">
											Select the mode that best fits your needs. You can always
											change this later.
										</p>
									</div>
								</div>

								{/* Mode Cards - Enhanced container */}
								<div className="w-full relative">
									{/* Subtle background for cards area */}
									<div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-3xl pointer-events-none"></div>

									<div className="relative z-10 ">
										<ModeCardGrid
											modeCards={modeCardsData}
											selectedMode={selectedMode}
											onAbilitySelect={handleAbilitySelect}
										/>
									</div>
								</div>

								{/* Continue Button with enhanced styling */}
								<div className="flex justify-center pt-8">
									<div className="relative">
										{/* Button glow effect when enabled */}
										{selectedMode && (
											<div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur-lg opacity-30 animate-pulse"></div>
										)}

										<FreeButton
											text="Continue"
											variant="blue"
											onClick={handleContinue}
											disabled={!selectedMode}
											className={`relative px-8 py-3 text-base font-semibold transition-all duration-300 ${
												!selectedMode
													? "opacity-50 cursor-not-allowed"
													: "hover:scale-105 hover:shadow-xl transform"
											}`}
											style={{ backgroundColor: "#67C865" }}
										/>
									</div>
								</div>

								{/* Progress Stepper with enhanced container */}
								<div className="flex justify-center">
									<div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
										<Stepper
											steps={stepperSteps}
											currentStep={getCurrentStep()}
											className=""
										/>
									</div>
								</div>

								{/* Info Section with enhanced background */}
								<div className="max-w-3xl mx-auto text-center space-y-6 pt-16 relative">
									<div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl -mx-8 -my-8 pointer-events-none"></div>

									<div className="relative z-10 py-8">
										<h2 className="text-2xl font-semibold text-gray-900 mb-4">
											What are these modes?
										</h2>
										<p className="text-gray-600 leading-relaxed text-lg">
											Each mode is designed to optimize your workflow for
											different use cases. Whether you're managing projects,
											analyzing data, or collaborating with teams, we have the
											right tools for you.
										</p>
									</div>
								</div>
							</div>
						</TabsContent>

						{/* Enhanced other tabs */}
						<TabsContent value="about" className="block pt-8">
							<div className="text-center space-y-6 relative">
								<div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl -mx-8 -my-8 pointer-events-none"></div>

								<div className="relative z-10 py-8">
									<h1 className="text-4xl font-bold text-gray-900 mb-4">
										About Us
									</h1>
									<p className="text-lg text-gray-600 max-w-2xl mx-auto">
										Learn more about our mission and values.
									</p>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="how-it-works" className="block pt-8">
							<div className="text-center space-y-6 relative">
								<div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl -mx-8 -my-8 pointer-events-none"></div>

								<div className="relative z-10 py-8">
									<h1 className="text-4xl font-bold text-gray-900 mb-4">
										How It Works
									</h1>
									<p className="text-lg text-gray-600 max-w-2xl mx-auto">
										Discover how our platform can transform your workflow.
									</p>
								</div>
							</div>
						</TabsContent>
					</div>
				</div>
			</Tabs>
		</div>
	);
};

export default ModeSelectionPage;
