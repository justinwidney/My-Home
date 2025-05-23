import { DropdownItem } from "./FlexibleDropdown";
import { useEffect, useRef, useState } from "react";

interface PriceDropdownProps {
	onSelect: (value: number) => void;
	onClose: () => void;
}

// Common price options - you can customize these
const PRICE_OPTIONS: DropdownItem[] = [
	{ label: "$5.00", value: "5" },
	{ label: "$10.00", value: "10" },
	{ label: "$15.00", value: "15" },
	{ label: "$20.00", value: "20" },
	{ label: "$25.00", value: "25" },
	{ label: "$50.00", value: "50" },
	{ label: "$100.00", value: "100" },
	{ label: "Custom...", value: "custom" },
];

export const PriceDropdown: React.FC<PriceDropdownProps> = ({
	onSelect,
	onClose,
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Handle clicking outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	const handleItemSelect = (item: DropdownItem) => {
		if (item.value === "custom") {
			const customAmount = prompt("Enter custom amount:");
			if (customAmount) {
				const amount = parseFloat(customAmount);
				if (!isNaN(amount) && amount >= 0) {
					onSelect(amount);
				} else {
					alert("Please enter a valid amount");
					return;
				}
			}
		} else {
			onSelect(parseFloat(item.value));
		}
		onClose();
	};

	return (
		<div ref={dropdownRef}>
			<div
				style={{
					minWidth: "160px",
					backgroundColor: "#ffffff",
					border: "1px solid #e2e8f0",
					borderRadius: "8px",
					padding: "4px",
					boxShadow:
						"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
					zIndex: 50,
				}}
			>
				{PRICE_OPTIONS.map((item, index) => (
					<div
						key={`${item.value}-${index}`}
						onClick={() => handleItemSelect(item)}
						style={{
							fontSize: "14px",
							padding: "8px 12px",
							borderRadius: "4px",
							cursor: "pointer",
							color: "#334155",
							backgroundColor: "transparent",
							transition: "background-color 0.15s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#f1f5f9";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
						}}
					>
						{item.label}
					</div>
				))}
			</div>
		</div>
	);
};
