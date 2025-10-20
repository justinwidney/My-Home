import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Setting } from "./settings";

interface LocationData {
	costOfLivingIndex: number;
	averageRent: number;
	salesTaxRate: number;
}

export const LocationSettings: React.FC = (): JSX.Element => {
	const [location, setLocation] = useState("Vancouver, BC");
	const [currency, setCurrency] = useState("CAD");
	const [timezone, setTimezone] = useState("America/Vancouver");
	const [locationData, setLocationData] = useState<LocationData | null>(null);

	const handleUpdateLocationData = (): void => {
		// Mock location data - in real app, this would fetch from an API
		const mockData: Record<string, LocationData> = {
			"Vancouver, BC": {
				costOfLivingIndex: 75.8,
				averageRent: 2400,
				salesTaxRate: 12.0,
			},
			"Toronto, ON": {
				costOfLivingIndex: 71.2,
				averageRent: 2200,
				salesTaxRate: 13.0,
			},
			"New York, NY": {
				costOfLivingIndex: 100.0,
				averageRent: 3500,
				salesTaxRate: 8.25,
			},
			"London, UK": {
				costOfLivingIndex: 85.3,
				averageRent: 2800,
				salesTaxRate: 20.0,
			},
		};

		const data = mockData[location] || {
			costOfLivingIndex: 70.0,
			averageRent: 1800,
			salesTaxRate: 10.0,
		};

		setLocationData(data);
		console.log("Updated location data for", location, data);
	};

	const getCurrencySymbol = (currencyCode: string): string => {
		const symbols: Record<string, string> = {
			CAD: "$",
			USD: "$",
			EUR: "€",
			GBP: "£",
		};
		return symbols[currencyCode] || "$";
	};

	return (
		<Setting title="Location Settings">
			<p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
				Configure your location settings to ensure accurate cost-of-living
				calculations, tax rates, and regional financial data.
			</p>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Location
					</label>
					<Input
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						placeholder="Vancouver, BC"
					/>
				</div>

				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Currency
					</label>
					<select
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
						style={{
							padding: "8px 12px",
							border: "1px solid #d1d5db",
							borderRadius: "4px",
							fontSize: "14px",
							backgroundColor: "white",
						}}
					>
						<option value="CAD">CAD - Canadian Dollar</option>
						<option value="USD">USD - US Dollar</option>
						<option value="EUR">EUR - Euro</option>
						<option value="GBP">GBP - British Pound</option>
					</select>
				</div>

				<div>
					<label style={{ fontWeight: "500", fontSize: "14px" }}>
						Timezone
					</label>
					<select
						value={timezone}
						onChange={(e) => setTimezone(e.target.value)}
						style={{
							padding: "8px 12px",
							border: "1px solid #d1d5db",
							borderRadius: "4px",
							fontSize: "14px",
							backgroundColor: "white",
						}}
					>
						<option value="America/Vancouver">Pacific Time (Vancouver)</option>
						<option value="America/Toronto">Eastern Time (Toronto)</option>
						<option value="America/New_York">Eastern Time (New York)</option>
						<option value="America/Los_Angeles">
							Pacific Time (Los Angeles)
						</option>
						<option value="Europe/London">GMT (London)</option>
					</select>
				</div>
			</div>

			<Button onClick={handleUpdateLocationData}>Update Location Data</Button>

			{locationData && (
				<div
					style={{
						backgroundColor: "#f8f9fa",
						padding: "16px",
						borderRadius: "6px",
						display: "flex",
						flexDirection: "column",
						gap: "8px",
					}}
				>
					<h4
						style={{
							margin: 0,
							fontWeight: "600",
							fontSize: "14px",
						}}
					>
						Location Data for {location}
					</h4>
					<p style={{ margin: 0, fontSize: "13px" }}>
						Cost of Living Index: {locationData.costOfLivingIndex}%
					</p>
					<p style={{ margin: 0, fontSize: "13px" }}>
						Average Rent: {getCurrencySymbol(currency)}
						{locationData.averageRent.toLocaleString()}/month
					</p>
					<p style={{ margin: 0, fontSize: "13px" }}>
						Sales Tax Rate: {locationData.salesTaxRate}%
					</p>
				</div>
			)}

			<p
				style={{
					margin: 0,
					fontSize: "12px",
					color: "#6b7280",
					lineHeight: "1.4",
				}}
			>
				Location data is used to adjust budget recommendations and provide
				region-specific financial insights for your simulations.
			</p>
		</Setting>
	);
};
