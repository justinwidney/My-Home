// ModeCardGrid.tsx
import React from "react";
import { DeckCard } from "../deckCard/DeckCard";
import type { ModeCardGridProps } from "./types";

export const ModeCardGrid: React.FC<ModeCardGridProps> = ({
	modeCards,
	selectedMode,
	onAbilitySelect,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full justify-items-center">
			{modeCards.map((mode) => (
				<div key={mode.id} className="w-full max-w-sm flex justify-center">
					<DeckCard
						abilities={mode.abilities}
						artwork={mode.artwork}
						name={mode.name}
						type={mode.type}
						illustrator={mode.illustrator}
						cardNumber={mode.cardNumber}
						totalCards="4"
						rating={mode.rating}
						initialRotation={mode.initialRotation}
						onAbilitySelect={(abilityId) => onAbilitySelect(mode.id, abilityId)}
						className={selectedMode === mode.id ? "selected-mode" : ""}
					/>
				</div>
			))}
		</div>
	);
};
