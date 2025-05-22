import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

// Types
export interface DropdownItem {
	label: string;
	value: string;
	href?: string;
	disabled?: boolean;
	onClick?: () => void;
}

interface FlexibleDropdownProps {
	items: Array<DropdownItem>;
	// Variant determines the trigger type
	variant: "ellipsis" | "button";

	// Button variant props
	buttonLabel?: string;
	buttonIcon?: React.ReactNode;

	// Ellipsis variant props
	ellipsisTitle?: string;

	// Common props
	className?: string;
	contentClassName?: string;
	disabled?: boolean;
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
	onItemSelect?: (item: DropdownItem) => void;
}

export const FlexibleDropdown: React.FC<FlexibleDropdownProps> = ({
	items,
	variant,
	buttonLabel = "Options",
	buttonIcon,
	ellipsisTitle,
	className = "",
	contentClassName = "",
	disabled = false,
	align = "start",
	side = "bottom",
	onItemSelect,
}) => {
	const handleItemSelect = (item: DropdownItem): void => {
		if (item.disabled) return;

		if (item.onClick) {
			item.onClick();
		}

		if (onItemSelect) {
			onItemSelect(item);
		}
	};

	const renderTrigger = (): React.ReactNode => {
		if (variant === "ellipsis") {
			return (
				<DropdownMenu.Trigger asChild>
					<button
						aria-label="More navigation options"
						disabled={disabled}
						title={ellipsisTitle}
						className={cn(
							// Default ellipsis styles (only applied if no custom className provided)
							!className &&
								"bg-none border-none cursor-pointer p-1 rounded-md inline-flex items-center justify-center opacity-100 transition-colors hover:bg-slate-100",
							// Always apply the custom className
							className
						)}
					>
						<MoreHorizontal size={16} />
					</button>
				</DropdownMenu.Trigger>
			);
		}

		return (
			<DropdownMenu.Trigger asChild>
				<button
					className={cn("dropdown-button", className)}
					disabled={disabled}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "8px",
						padding: "8px 12px",
						backgroundColor: "#ffffff",
						border: "1px solid #e2e8f0",
						borderRadius: "6px",
						fontSize: "14px",
						fontWeight: "500",
						cursor: disabled ? "default" : "pointer",
						opacity: disabled ? 0.5 : 1,
						transition: "all 0.15s ease",
					}}
					onMouseEnter={(event_) => {
						if (!disabled) {
							event_.currentTarget.style.backgroundColor = "#f8fafc";
							event_.currentTarget.style.borderColor = "#cbd5e1";
						}
					}}
					onMouseLeave={(event_) => {
						if (!disabled) {
							event_.currentTarget.style.backgroundColor = "#ffffff";
							event_.currentTarget.style.borderColor = "#e2e8f0";
						}
					}}
				>
					{buttonIcon && <span>{buttonIcon}</span>}
					<span>{buttonLabel}</span>
					<ChevronDown size={14} />
				</button>
			</DropdownMenu.Trigger>
		);
	};

	return (
		<DropdownMenu.Root>
			{renderTrigger()}

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					align={align}
					className={cn("dropdown-content", contentClassName)}
					side={side}
					sideOffset={4}
					style={{
						minWidth: "160px",
						backgroundColor: "#ffffff",
						border: "1px solid #e2e8f0",
						borderRadius: "8px",
						padding: "4px",
						boxShadow:
							"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
						zIndex: 50,
						animationDuration: "0.15s",
						animationTimingFunction: "ease-out",
					}}
				>
					{items.map((item, index) => (
						<DropdownMenu.Item
							key={`${item.value}-${index}`}
							className="dropdown-item"
							disabled={item.disabled}
							style={{
								fontSize: "14px",
								padding: "8px 12px",
								borderRadius: "4px",
								cursor: item.disabled ? "default" : "pointer",
								color: item.disabled ? "#94a3b8" : "#334155",
								backgroundColor: "transparent",
								outline: "none",
								userSelect: "none",
								transition: "background-color 0.15s ease",
							}}
							onMouseEnter={(event_) => {
								if (!item.disabled) {
									event_.currentTarget.style.backgroundColor = "#f1f5f9";
								}
							}}
							onMouseLeave={(event_) => {
								if (!item.disabled) {
									event_.currentTarget.style.backgroundColor = "transparent";
								}
							}}
							onSelect={() => {
								handleItemSelect(item);
							}}
						>
							{item.label}
						</DropdownMenu.Item>
					))}

					{items.length === 0 && (
						<div
							style={{
								padding: "8px 12px",
								fontSize: "14px",
								color: "#94a3b8",
								textAlign: "center",
							}}
						>
							No items available
						</div>
					)}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
