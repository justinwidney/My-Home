import { useState } from "react";
import { Setting } from "./settings";

export const BudgetRandomnessSettings: React.FC = (): JSX.Element => {
	const [enableRandomness, setEnableRandomness] = useState(true);
	const [variabilityLevel, setVariabilityLevel] = useState("medium");
	const [unexpectedExpenses, setUnexpectedExpenses] = useState(true);
	const [seasonalVariation, setSeasonalVariation] = useState(false);

	const handleRandomnessToggle = (checked: boolean): void => {
		setEnableRandomness(checked);
		if (!checked) {
			setUnexpectedExpenses(false);
			setSeasonalVariation(false);
		}
	};

	const getVariabilityDescription = (level: string): string => {
		switch (level) {
			case "low":
				return "Small variations in spending (±5%). Good for stable budgets.";
			case "medium":
				return "Moderate variations in spending (±15%). Realistic for most people.";
			case "high":
				return "Large variations in spending (±25%). Prepares for volatile situations.";
			default:
				return "";
		}
	};

	return (
		<Setting title="Budget Randomness">
			<p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
				Add realistic variability to your budget simulation to better prepare
				for real-world financial scenarios and unexpected expenses.
			</p>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<input
						type="checkbox"
						checked={enableRandomness}
						onChange={(e) => handleRandomnessToggle(e.target.checked)}
						style={{ width: "16px", height: "16px" }}
					/>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Enable Budget Variability
					</label>
				</div>

				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Variability Level
					</label>
					<select
						value={variabilityLevel}
						onChange={(e) => setVariabilityLevel(e.target.value)}
						disabled={!enableRandomness}
						style={{
							padding: "8px 12px",
							border: "1px solid #d1d5db",
							borderRadius: "4px",
							fontSize: "14px",
							backgroundColor: enableRandomness ? "white" : "#f9fafb",
						}}
					>
						<option value="low">Low (±5%)</option>
						<option value="medium">Medium (±15%)</option>
						<option value="high">High (±25%)</option>
					</select>
					{enableRandomness && (
						<p
							style={{
								margin: 0,
								fontSize: "12px",
								color: "#6b7280",
								lineHeight: "1.4",
							}}
						>
							{getVariabilityDescription(variabilityLevel)}
						</p>
					)}
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<input
						type="checkbox"
						checked={unexpectedExpenses}
						onChange={(e) => setUnexpectedExpenses(e.target.checked)}
						disabled={!enableRandomness}
						style={{ width: "16px", height: "16px" }}
					/>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Include Unexpected Expenses
					</label>
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<input
						type="checkbox"
						checked={seasonalVariation}
						onChange={(e) => setSeasonalVariation(e.target.checked)}
						disabled={!enableRandomness}
						style={{ width: "16px", height: "16px" }}
					/>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Seasonal Spending Variations
					</label>
				</div>
			</div>

			<p
				style={{
					margin: 0,
					fontSize: "12px",
					color: "#6b7280",
					lineHeight: "1.4",
				}}
			>
				Randomness helps simulate real-world budget fluctuations and builds
				better financial preparedness habits. This includes things like higher
				heating bills in winter, vacation spending in summer, and random car
				repairs.
			</p>
		</Setting>
	);
};
