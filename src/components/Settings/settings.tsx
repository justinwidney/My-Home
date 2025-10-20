import { useState } from "react";
import { Button } from "../ui/button";

// Setting wrapper component
export interface SettingProps {
	children: React.ReactNode;
	title?: string;
}

export const Setting: React.FC<SettingProps> = ({
	children,
	title,
}): JSX.Element => (
	<div
		style={{
			backgroundColor: "white",
			border: "1px solid #e5e7eb",
			borderRadius: "8px",
			padding: "20px",
			display: "flex",
			flexDirection: "column",
			gap: "16px",
			boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
		}}
	>
		{title && (
			<h3
				style={{
					margin: 0,
					fontSize: "16px",
					fontWeight: "600",
					color: "#111827",
				}}
			>
				{title}
			</h3>
		)}
		{children}
	</div>
);

// Advanced Toggle Component
export interface AdvancedToggleProps {
	children: React.ReactNode;
}

export const AdvancedToggle: React.FC<AdvancedToggleProps> = ({
	children,
}): JSX.Element => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = (): void => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
			<Button
				style={{
					backgroundColor: "transparent",
					color: "#6b7280",
					textDecoration: "underline",
					border: "none",
					padding: "4px 0",
					fontSize: "14px",
				}}
				onClick={handleToggle}
			>
				{isExpanded ? "Hide Advanced Settings" : "Show Advanced Settings"}
			</Button>
			{isExpanded && (
				<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					{children}
				</div>
			)}
		</div>
	);
};
