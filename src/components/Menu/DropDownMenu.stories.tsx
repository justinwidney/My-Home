import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FlexibleDropdown } from "./DropDownMenu";

const meta = {
	title: "Components/FlexibleDropdown",
	component: FlexibleDropdown,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FlexibleDropdown>;

export default meta;

type Story = StoryObj<typeof FlexibleDropdown>;

export const ShowcaseAll: Story = {
	render: () => {
		const sampleItems = [
			{ label: "Dashboard", value: "dashboard", href: "/dashboard" },
			{ label: "Products", value: "products", href: "/products" },
			{ label: "Analytics", value: "analytics", href: "/analytics" },
			{ label: "Settings", value: "settings", href: "/settings" },
			{ label: "Disabled Item", value: "disabled", disabled: true },
			{
				label: "Custom Action",
				value: "custom",
				onClick: () => alert("Custom action clicked!"),
			},
		];

		const handleItemSelect = (item: any) => {
			console.log("Selected item:", item);
			if (item.href) {
				console.log("Would navigate to:", item.href);
			}
		};

		return (
			<div
				style={{
					padding: "40px",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
					gap: "30px",
					width: "800px",
				}}
			>
				{/* Ellipsis variant */}
				<div style={{ textAlign: "center" }}>
					<h3
						style={{
							marginBottom: "15px",
							fontSize: "16px",
							fontWeight: "600",
						}}
					>
						Ellipsis Dropdown
					</h3>
					<div
						style={{
							padding: "20px",
							border: "1px dashed #e2e8f0",
							borderRadius: "8px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: "60px",
						}}
					>
						<FlexibleDropdown
							variant="ellipsis"
							items={sampleItems}
							ellipsisTitle="More navigation options"
							onItemSelect={handleItemSelect}
						/>
					</div>
					<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
						Perfect for breadcrumb collapsed items
					</p>
				</div>

				{/* Button variant */}
				<div style={{ textAlign: "center" }}>
					<h3
						style={{
							marginBottom: "15px",
							fontSize: "16px",
							fontWeight: "600",
						}}
					>
						Button Dropdown
					</h3>
					<div
						style={{
							padding: "20px",
							border: "1px dashed #e2e8f0",
							borderRadius: "8px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: "60px",
						}}
					>
						<FlexibleDropdown
							variant="button"
							items={sampleItems}
							buttonLabel="Navigation"
							onItemSelect={handleItemSelect}
						/>
					</div>
					<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
						Standard dropdown button
					</p>
				</div>

				{/* Button with icon */}
				<div style={{ textAlign: "center" }}>
					<h3
						style={{
							marginBottom: "15px",
							fontSize: "16px",
							fontWeight: "600",
						}}
					>
						With Icon
					</h3>
					<div
						style={{
							padding: "20px",
							border: "1px dashed #e2e8f0",
							borderRadius: "8px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: "60px",
						}}
					>
						<FlexibleDropdown
							variant="button"
							items={sampleItems}
							buttonLabel="Actions"
							buttonIcon="⚙️"
							onItemSelect={handleItemSelect}
						/>
					</div>
					<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
						Button with custom icon
					</p>
				</div>

				{/* Different alignment */}
				<div style={{ textAlign: "center" }}>
					<h3
						style={{
							marginBottom: "15px",
							fontSize: "16px",
							fontWeight: "600",
						}}
					>
						Right Aligned Menu
					</h3>
					<div
						style={{
							padding: "20px",
							border: "1px dashed #e2e8f0",
							borderRadius: "8px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: "60px",
						}}
					>
						<FlexibleDropdown
							variant="button"
							items={sampleItems}
							buttonLabel="Options"
							align="end"
							onItemSelect={handleItemSelect}
						/>
					</div>
					<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
						Menu opens to the right
					</p>
				</div>

				{/* Empty state */}
				<div style={{ textAlign: "center" }}>
					<h3
						style={{
							marginBottom: "15px",
							fontSize: "16px",
							fontWeight: "600",
						}}
					>
						Empty State
					</h3>
					<div
						style={{
							padding: "20px",
							border: "1px dashed #e2e8f0",
							borderRadius: "8px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: "60px",
						}}
					>
						<FlexibleDropdown
							variant="button"
							items={[]}
							buttonLabel="No Items"
							onItemSelect={handleItemSelect}
						/>
					</div>
					<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
						Handles empty items gracefully
					</p>
				</div>

				{/* Disabled state */}
				<div style={{ textAlign: "center" }}>
					<h3
						style={{
							marginBottom: "15px",
							fontSize: "16px",
							fontWeight: "600",
						}}
					>
						Disabled State
					</h3>
					<div
						style={{
							padding: "20px",
							border: "1px dashed #e2e8f0",
							borderRadius: "8px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: "60px",
						}}
					>
						<FlexibleDropdown
							variant="button"
							items={sampleItems}
							buttonLabel="Disabled"
							disabled={true}
							onItemSelect={handleItemSelect}
						/>
					</div>
					<p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
						Disabled dropdown button
					</p>
				</div>
			</div>
		);
	},
};
