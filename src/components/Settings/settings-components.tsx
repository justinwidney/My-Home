import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Page } from "../Page";
import { Setting, AdvancedToggle } from "./settings";
import { IncomeDeductionsSettings } from "./IncomeDeductionSettings";
import { BudgetRandomnessSettings } from "./BudgetRandomnessSettings";
import { LocationSettings } from "./location-settings";

// About Component
const About: React.FC = (): JSX.Element => {
	const version = "1.0.0";
	const buildDate = "June 2025";
	const isUpToDate = true;

	return (
		<Setting>
			<p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
				<strong>Budget Simulator</strong> is a comprehensive financial planning
				tool for managing your income, expenses, and testing various budget
				scenarios with realistic variability.
			</p>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
					gap: "10px",
				}}
			>
				<p style={{ margin: 0, fontSize: "14px" }}>
					Client version: v{version}
				</p>
				<p style={{ margin: 0, fontSize: "14px" }}>Build: {buildDate}</p>
				{isUpToDate ? (
					<p
						style={{
							margin: 0,
							fontSize: "14px",
							color: "black",
							fontWeight: 600,
						}}
					>
						You're up to date!
					</p>
				) : (
					<p
						style={{
							margin: 0,
							fontSize: "14px",
							color: "#dc2626",
							fontWeight: 600,
						}}
					>
						Update available
					</p>
				)}
				<p style={{ margin: 0, fontSize: "14px" }}>
					<a
						href="#"
						style={{ color: "#7c3aed", textDecoration: "underline" }}
						onClick={(e) => {
							e.preventDefault();
							console.log("View release notes");
						}}
					>
						Release Notes
					</a>
				</p>
			</div>
		</Setting>
	);
};

// System Info Component
const SystemInfo: React.FC = (): JSX.Element => {
	const userId = "user_12345";
	const sessionId = "session_67890";
	const buildId = "build_202506081545";

	return (
		<Setting title="System Information">
			<p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
				<strong>IDs</strong> are used internally to identify your session and
				preferences. This information can be useful for troubleshooting.
			</p>
			<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
				<p style={{ margin: 0, fontSize: "14px" }}>
					<span style={{ fontWeight: 500 }}>User ID:</span> {userId}
				</p>
				<p style={{ margin: 0, fontSize: "14px" }}>
					<span style={{ fontWeight: 500 }}>Session ID:</span> {sessionId}
				</p>
				<p style={{ margin: 0, fontSize: "14px" }}>
					<span style={{ fontWeight: 500 }}>Build ID:</span> {buildId}
				</p>
			</div>
		</Setting>
	);
};

// Data Management Component
const DataManagement: React.FC = (): JSX.Element => {
	const [isExporting, setIsExporting] = useState(false);

	const handleExportData = async (): Promise<void> => {
		setIsExporting(true);
		// Mock export process
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log("Export completed");
		setIsExporting(false);
		alert("Budget data exported successfully!");
	};

	const handleClearCache = (): void => {
		if (
			window.confirm(
				"Are you sure you want to clear the cache? This will reset temporary data."
			)
		) {
			console.log("Cache cleared");
			alert("Cache cleared successfully!");
		}
	};

	const handleResetSettings = (): void => {
		if (
			window.confirm(
				"Are you sure you want to reset all settings? This action cannot be undone."
			)
		) {
			console.log("Settings reset");
			alert("All settings have been reset to defaults!");
		}
	};

	return (
		<Setting title="Data Management">
			<p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
				Manage your budget simulation data and preferences. Export your data for
				backup or analysis, or reset settings to start fresh.
			</p>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<Button
					onClick={handleExportData}
					disabled={isExporting}
					variant="success"
				>
					{isExporting ? "Exporting..." : "Export Budget Data"}
				</Button>
				<Button
					onClick={handleClearCache}
					style={{ backgroundColor: "#f59e0b" }}
				>
					Clear Cache
				</Button>
				<Button onClick={handleResetSettings} variant="danger">
					Reset All Settings
				</Button>
			</div>

			<p
				style={{
					margin: 0,
					fontSize: "12px",
					color: "#6b7280",
					lineHeight: "1.4",
				}}
			>
				<strong>Warning:</strong> Resetting settings will restore all
				preferences to their default values and cannot be undone.
			</p>
		</Setting>
	);
};

// Main Settings Component
export interface SettingsProps {
	initialBudgetName?: string;
}

export const Settings: React.FC<SettingsProps> = ({
	initialBudgetName = "My Budget Simulation",
}): JSX.Element => {
	const isNarrowWidth = false;

	const [budgetName] = useState(initialBudgetName);

	const handleSwitchFile = (): void => {
		console.log("Switch budget file");
		// In a real app, this would trigger file selection dialog
		alert("Switch file functionality would open here");
	};

	useEffect(() => {
		// Load preferences or initialize settings
		console.log("Settings component mounted");

		return () => {
			console.log("Settings component unmounted");
		};
	}, []);

	return (
		<Page
			header="Settings"
			style={{
				paddingBottom: isNarrowWidth ? MOBILE_NAV_HEIGHT : 0,
			}}
		>
			<div
				data-testid="settings"
				style={{
					marginTop: 10,
					flexShrink: 0,
					maxWidth: 530,
					display: "flex",
					flexDirection: "column",
					gap: 30,
				}}
			>
				{isNarrowWidth && (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "flex-end",
							gap: 10,
							flexWrap: "wrap",
						}}
					>
						<div style={{ flex: 1, minWidth: "200px", ...fieldStyle }}>
							<label style={{ fontWeight: "500", fontSize: "14px" }}>
								Budget name
							</label>
							<Input value={budgetName} disabled />
						</div>
						<Button onClick={handleSwitchFile}>Switch file</Button>
					</div>
				)}

				<About />
				<IncomeDeductionsSettings />
				<BudgetRandomnessSettings />
				<LocationSettings />

				<AdvancedToggle>
					<SystemInfo />
					<DataManagement />
				</AdvancedToggle>
			</div>
		</Page>
	);
};

export default Settings;
