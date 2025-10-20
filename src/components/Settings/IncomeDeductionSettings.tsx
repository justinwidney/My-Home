import { useState } from "react";
import { Setting } from "./settings";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const IncomeDeductionsSettings: React.FC = (): JSX.Element => {
	const [monthlyIncome, setMonthlyIncome] = useState("5000");
	const [taxRate, setTaxRate] = useState("22");
	const [healthInsurance, setHealthInsurance] = useState("200");
	const [retirement401k, setRetirement401k] = useState("10");

	const handleCalculateTakeHome = (): void => {
		const income = parseFloat(monthlyIncome) || 0;
		const tax = parseFloat(taxRate) || 0;
		const health = parseFloat(healthInsurance) || 0;
		const retirement = parseFloat(retirement401k) || 0;

		const taxAmount = income * (tax / 100);
		const retirementAmount = income * (retirement / 100);
		const takeHome = income - taxAmount - health - retirementAmount;

		console.log("Take-home calculation:", {
			grossIncome: income,
			taxAmount,
			healthInsurance: health,
			retirementAmount,
			takeHome,
		});

		alert(`Take-home pay: $${takeHome.toFixed(2)}`);
	};

	const handleReset = (): void => {
		setMonthlyIncome("5000");
		setTaxRate("22");
		setHealthInsurance("200");
		setRetirement401k("10");
	};

	return (
		<Setting title="Income & Deductions">
			<p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
				Configure your income sources and standard deductions to accurately
				simulate your take-home pay and budgeting scenarios.
			</p>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Monthly Gross Income ($)
					</label>
					<Input
						value={monthlyIncome}
						onChange={(e) => setMonthlyIncome(e.target.value)}
						type="number"
						placeholder="5000"
					/>
				</div>

				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Tax Rate (%)
					</label>
					<Input
						value={taxRate}
						onChange={(e) => setTaxRate(e.target.value)}
						type="number"
						placeholder="22"
					/>
				</div>

				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Health Insurance ($)
					</label>
					<Input
						value={healthInsurance}
						onChange={(e) => setHealthInsurance(e.target.value)}
						type="number"
						placeholder="200"
					/>
				</div>

				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						401k Contribution (%)
					</label>
					<Input
						value={retirement401k}
						onChange={(e) => setRetirement401k(e.target.value)}
						type="number"
						placeholder="10"
					/>
				</div>
			</div>

			<div>
				<Button onClick={handleCalculateTakeHome}>Calculate Take-Home</Button>
				<Button onClick={handleReset} variant="secondary">
					Reset
				</Button>
			</div>
		</Setting>
	);
};
