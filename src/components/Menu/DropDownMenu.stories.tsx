import type { Meta, StoryObj } from "@storybook/react";
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
		type DropdownItem = {
			label: string;
			value: string;
			href?: string;
			disabled?: boolean;
			onClick?: () => void;
		};

		const sampleItems: Array<DropdownItem> = [
			{ label: "Dashboard", value: "dashboard", href: "/dashboard" },
			{ label: "Products", value: "products", href: "/products" },
			{ label: "Analytics", value: "analytics", href: "/analytics" },
			{ label: "Settings", value: "settings", href: "/settings" },
			{ label: "Disabled Item", value: "disabled", disabled: true },
			{
				label: "Custom Action",
				value: "custom",
				onClick: (): void => {
					alert("Custom action clicked!");
				},
			},
		];

		const handleItemSelect = (item: DropdownItem): void => {
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
							ellipsisTitle="More navigation options"
							items={sampleItems}
							variant="ellipsis"
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
							buttonLabel="Navigation"
							items={sampleItems}
							variant="button"
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
							buttonIcon="⚙️"
							buttonLabel="Actions"
							items={sampleItems}
							variant="button"
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
							align="end"
							buttonLabel="Options"
							items={sampleItems}
							variant="button"
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
							buttonLabel="No Items"
							items={[]}
							variant="button"
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
							disabled
							buttonLabel="Disabled"
							items={sampleItems}
							variant="button"
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
