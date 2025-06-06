import React, { useState, useRef } from "react";
import styles from "./DeckCard.module.css";

interface DeckCardProps {
	abilities: Array<{
		id: string;
		name: string;
		description: string;
	}>;
	artwork: {
		baseImage: string;
		frontImage?: string;
		raysImage?: string;
	};
	backImage?: string;
	cardNumber?: string;
	className?: string;
	illustrator?: string;
	name: string;
	onAbilitySelect?: (abilityId: string) => void;
	totalCards?: string;
	type?: string;
	initialRotation?: {
		x?: number;
		y?: number;
		z?: number;
	};
	rating?: number;
}

export const DeckCard: React.FC<DeckCardProps> = ({
	abilities,
	artwork,
	backImage = "https://assets.codepen.io/2153413/card-back.jpg",
	cardNumber = "1",
	className = "",
	illustrator = "Unknown Artist",
	name,
	onAbilitySelect,
	totalCards = "64",
	type = "creature",
	initialRotation = {},
	rating = 0,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [selectedAbility, setSelectedAbility] = useState<string>("");
	const hatchCrackRef = useRef<SVGPathElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const getTransform = (): string => {
		const rotX = initialRotation.x || 0;
		const rotY = initialRotation.y || 0;
		const rotZ = initialRotation.z || 0;

		if (isHovered) {
			return `scale(1.1) rotateX(${rotX + 2}deg) rotateY(${rotY + 2}deg) rotateZ(${rotZ + 2}deg)`;
		}
		return `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
	};

	const handleCardClick = (): void => {
		setIsFlipped(!isFlipped);
	};

	const handleAbilityChange = (abilityId: string): void => {
		setSelectedAbility(abilityId);
		onAbilitySelect?.(abilityId);
	};

	const stopPropagation = (event_: React.MouseEvent): void => {
		event_.stopPropagation();
	};

	return (
		<div
			className={`${styles["card"]} ${isFlipped ? styles["flipped"] : ""} ${className}`}
			style={{ transform: getTransform() }}
			onClick={handleCardClick}
			onMouseEnter={() => {
				setIsHovered(true);
			}}
			onMouseLeave={() => {
				setIsHovered(false);
			}}
		>
			{/* Front Face */}
			<div className={`${styles["cardFace"]} ${styles["cardFront"]}`}>
				<img
					alt=""
					className={styles["overlayEdge"]}
					src="https://assets.codepen.io/2153413/card-edge.png"
				/>

				<svg
					className={styles["overlayTexture"]}
					preserveAspectRatio="xMaxYMax meet"
					viewBox="0 0 630 880"
					xmlns="http://www.w3.org/2000/svg"
				>
					<pattern
						height="4"
						id="card-texture"
						patternTransform="scale(3)"
						patternUnits="userSpaceOnUse"
						width="4"
					>
						<path d="M1 3h1v1H1V3zm2-2h1v1H3V1z" fill="#000000"></path>
					</pattern>
					<rect
						fill="url(#card-texture)"
						height="880"
						opacity=".1"
						width="630"
						x="0"
						y="0"
					/>
				</svg>

				<div className={styles["cardHeader"]}>
					<h2 className={styles["cardName"]}>{name}</h2>
					<div
						aria-label={`${rating} out of 3 stars`}
						className={styles["cardRating"]}
					>
						{[1, 2, 3].map((star) => (
							<svg
								key={star}
								className={`${styles["star"]} ${star <= rating ? styles["starFilled"] : styles["starEmpty"]}`}
								fill="currentColor"
								height="20"
								viewBox="0 0 24 24"
								width="20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
							</svg>
						))}
					</div>
				</div>

				<div
					aria-label={`${type} card artwork`}
					className={styles["cardArt"]}
					role="img"
				>
					{/* Base Image */}
					<img alt="" src={artwork.baseImage} />

					{/* Ability overlays - simplified versions */}
					{abilities.some((a) => a.id === "hatch") && (
						<svg
							className={`${styles["abilityOverlay"]} ${selectedAbility === "hatch" ? styles["activeHatch"] : ""}`}
							preserveAspectRatio="xMaxYMax meet"
							viewBox="0 0 590 380"
							xmlns="http://www.w3.org/2000/svg"
						>
							<defs>
								<pattern
									height="20"
									id="pattern-egg"
									patternTransform="rotate(170)scale(1.4)"
									patternUnits="userSpaceOnUse"
									width="20"
								>
									<rect fill="#adc39e" height="100%" width="100%" />
									<path
										d="M-10-10A10 10 0 0 0-20 0a10 10 0 0 0 10 10A10 10 0 0 1 0 0a10 10 0 0 0-10-10zm20 0A10 10 0 0 0 0 0a10 10 0 0 1 10 10A10 10 0 0 1 20 0a10 10 0 0 0-10-10zm20 0A10 10 0 0 0 20 0a10 10 0 0 1 10 10A10 10 0 0 1 40 0a10 10 0 0 0-10-10z"
										fill="none"
										stroke="rgba(0,0,0,0.2)"
										strokeWidth="2"
									/>
								</pattern>
							</defs>
							<g id="ability-hatch">
								<path
									d="M336.467,178.428C347.513,177.084 412.391,190.174 424.318,288.187C429.248,328.702 400.358,365.598 359.844,370.528C319.329,375.458 282.434,346.568 277.503,306.054C265.576,208.04 326.612,179.627 336.467,178.428Z"
									fill="url(#pattern-egg)"
									id="ability-hatch-egg"
									stroke="var(--color-dark)"
									strokeWidth="5"
								/>
								<path
									ref={hatchCrackRef}
									className={styles["hatchCrack"]}
									d="M336.467,178.428C347.513,177.084 412.391,190.174 424.318,288.187C429.248,328.702 400.358,365.598 359.844,370.528C319.329,375.458 282.434,346.568 277.503,306.054C265.576,208.04 326.612,179.627 336.467,178.428Z"
									fill="none"
									id="ability-hatch-crack"
									stroke="#232820"
									strokeWidth="2px"
								/>
							</g>
						</svg>
					)}

					{abilities.some((a) => a.id === "study") && (
						<svg
							className={`${styles["abilityOverlay"]} ${selectedAbility === "study" ? styles["activeStudy"] : ""}`}
							preserveAspectRatio="xMaxYMax meet"
							viewBox="0 0 590 380"
							xmlns="https://www.w3.org/2000/svg"
						>
							<path
								className={styles["studyUI"]}
								d="M22,24C20.896,24 20,23.104 20,22C20,20.896 20.896,20 22,20L136.731,20C137.835,20 138.731,20.896 138.731,22C138.731,23.104 137.835,24 136.731,24L22,24ZM22,34C20.896,34 20,33.104 20,32C20,30.896 20.896,30 22,30L287.906,30C289.01,30 289.906,30.896 289.906,32C289.906,33.104 289.01,34 287.906,34L22,34Z"
								fill="var(--color-light)"
								id="ability-study"
								opacity="0"
							/>
							<g
								className={styles["studyGlass"]}
								id="ability-study-glass"
								opacity="0"
							>
								<path
									d="m282.115 203.92 5.958 10.32-16.719 9.653-5.959-10.32 16.72-9.653Z"
									fill="var(--color-light)"
								/>
								<path
									d="m273.651 226.817-92.766 53.558a3.887 3.887 0 0 1-5.307-1.422l-5.754-9.966a3.888 3.888 0 0 1 1.422-5.308l92.766-53.558a3.887 3.887 0 0 1 5.307 1.422l5.754 9.966a3.888 3.888 0 0 1-1.422 5.308Z"
									fill="var(--color-dark)"
								/>
								<path
									d="M309.299 110.973c34.825-20.106 79.423-8.157 99.529 26.669 20.106 34.825 8.157 79.423-26.669 99.529-34.825 20.106-79.422 8.156-99.529-26.669-20.106-34.825-8.156-79.423 26.669-99.529Z"
									fill="var(--color-light)"
									style={{ mixBlendMode: "exclusion" }}
								/>
								<path
									d="M309.299 110.973c34.825-20.106 79.423-8.157 99.529 26.669 20.106 34.825 8.157 79.423-26.669 99.529-34.825 20.106-79.422 8.156-99.529-26.669-20.106-34.825-8.156-79.423 26.669-99.529Zm2 3.464c-32.913 19.003-44.207 61.152-25.205 94.065 19.003 32.914 61.152 44.207 94.065 25.205 32.914-19.003 44.208-61.152 25.205-94.065-19.003-32.914-61.152-44.207-94.065-25.205Z"
									fill="var(--color-dark)"
								/>
							</g>
						</svg>
					)}

					{/* Light Rays */}
					{artwork.raysImage && (
						<img alt="" className={styles["rays"]} src={artwork.raysImage} />
					)}

					{/* Top Frame */}
					{artwork.frontImage && <img alt="" src={artwork.frontImage} />}
				</div>

				<fieldset className={styles["cardAbilities"]} onClick={stopPropagation}>
					{abilities.map((ability, index) => (
						<React.Fragment key={ability.id}>
							<label className={styles["ability"]}>
								<input
									checked={selectedAbility === ability.id}
									name="ability"
									type="radio"
									value={ability.id}
									onChange={() => {
										handleAbilityChange(ability.id);
									}}
								/>
								<span>{ability.name}</span>
								<p>{ability.description}</p>
							</label>
							{index < abilities.length - 1 && (
								<span className="text-bold">AND</span>
							)}
						</React.Fragment>
					))}
				</fieldset>

				<div className={styles["cardSource"]}>
					<p>Illus. {illustrator}</p>
					<p>
						{cardNumber}/{totalCards}
					</p>
				</div>
			</div>

			{/* Back Face */}
			<div className={`${styles["cardFace"]} ${styles["cardBack"]}`}>
				<img alt="Card back" src={backImage} />
				<img
					alt=""
					className={styles["overlayEdge"]}
					src="https://assets.codepen.io/2153413/card-edge.png"
				/>
				<svg
					className={styles["overlayTexture"]}
					preserveAspectRatio="xMaxYMax meet"
					viewBox="0 0 630 880"
					xmlns="http://www.w3.org/2000/svg"
				>
					<pattern
						height="4"
						id="card-texture-back"
						patternTransform="scale(3)"
						patternUnits="userSpaceOnUse"
						width="4"
					>
						<path d="M1 3h1v1H1V3zm2-2h1v1H3V1z" fill="#000000"></path>
					</pattern>
					<rect
						fill="url(#card-texture-back)"
						height="880"
						opacity=".25"
						width="630"
						x="0"
						y="0"
					/>
				</svg>
			</div>
		</div>
	);
};
