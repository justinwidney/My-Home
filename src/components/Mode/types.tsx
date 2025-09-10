// types.ts

export interface User {
	name: string;
	avatar?: string;
	initials: string;
}

export interface ModeAbility {
	id: string;
	name: string;
	description: string;
}

export interface ModeArtwork {
	baseImage: string;
	frontImage?: string;
	raysImage?: string;
}

export interface ModeData {
	id: string;
	name: string;
	type: string;
	artwork: ModeArtwork;
	abilities: Array<ModeAbility>;
	illustrator: string;
	cardNumber: string;
	rating: number;
	initialRotation?: {
		x?: number;
		y?: number;
		z?: number;
	};
}

export interface ModeSelectionProps {
	onModeSelect?: (modeId: string) => void;
	onContinue?: (selectedMode: string) => void;
	initialSelectedMode?: string;
}

export interface HeaderProps {
	user: User;
}

export interface ModeCardGridProps {
	modeCards: Array<ModeData>;
	selectedMode: string;
	onAbilitySelect: (cardId: string, abilityId: string) => void;
}
