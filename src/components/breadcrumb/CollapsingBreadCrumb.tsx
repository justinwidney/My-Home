import { Link } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
	type DropdownItem,
} from "./BreadCrumb";
import React from "react";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface SmartBreadcrumbProps {
	items: Array<BreadcrumbItem>;
	maxItems?: number;
	separator?: React.ReactNode;
	className?: string;
	onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

const buttonStyles = {
	link: "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md text-black transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-[#FEC76F] hover:bg-[#FDB94E]",
	page: "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg text-black shadow-md bg-[#FEC76F] opacity-80",
	list: "gap-2 sm:gap-3",
};

export function SmartBreadcrumb({
	items,
	maxItems = 3,
	separator,
	className,
	onItemClick,
}: SmartBreadcrumbProps): React.ReactElement | null {
	// Early return for empty or invalid items

	const handleItemClick = React.useCallback(
		(item: BreadcrumbItem, index: number): void => {
			if (onItemClick) {
				onItemClick(item, index);
			}
		},
		[onItemClick]
	);

	const shouldCollapse = items && items.length > maxItems;
	const first = items && items.length > 0 ? items[0]! : undefined;
	const last = items && items.length > 0 ? items[items.length - 1]! : undefined;

	// Get the collapsed items (all items between first and last)
	const collapsedItems = React.useMemo(() => {
		if (!shouldCollapse || !items) return [];

		return items.slice(1, -1).map((item, index) => ({
			label: item.label,
			value: item.label,
			href: item.href,
			onClick: item.href
				? undefined
				: // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
					() => {
						handleItemClick(item, index + 1);
					},
		}));
	}, [items, shouldCollapse, handleItemClick]);

	if (!items || items.length === 0) {
		return null;
	}

	const handleDropdownItemSelect = (dropdownItem: DropdownItem): void => {
		if (dropdownItem.href) {
			// For items with href, find the original item and its index for the callback
			const originalIndex = items.findIndex(
				(item) => item.label === dropdownItem.label
			);
			if (originalIndex !== -1) {
				handleItemClick(items[originalIndex]!, originalIndex);
			}
		}
		// Custom onClick is already handled in the dropdown item definition
	};

	const renderBreadcrumbItem = (
		item: BreadcrumbItem,
		index: number,
		isLast: boolean = false
	): React.ReactNode => {
		if (isLast) {
			return (
				<BreadcrumbItem key={index}>
					<BreadcrumbPage className={buttonStyles.link}>
						{item.label}
					</BreadcrumbPage>
				</BreadcrumbItem>
			);
		}

		if (item.href) {
			return (
				<BreadcrumbItem key={index}>
					<BreadcrumbLink asChild className={buttonStyles.link}>
						<Link
							to={item.href}
							onClick={() => {
								handleItemClick(item, index);
							}}
						>
							{item.label}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
			);
		}

		// Non-clickable item (no href)
		return (
			<BreadcrumbItem key={index}>
				<span className="text-muted-foreground">{item.label}</span>
			</BreadcrumbItem>
		);
	};

	// Render non-collapsed view
	if (!shouldCollapse) {
		return (
			<Breadcrumb className={className}>
				<BreadcrumbList>
					{items.map((item, index) => (
						<React.Fragment key={index}>
							{index > 0 && (separator || <BreadcrumbSeparator />)}
							{renderBreadcrumbItem(item, index, index === items.length - 1)}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		);
	}

	// Render collapsed view: first + ellipsis dropdown + last item
	const collapsedCount = items.length - 2; // All items except first and last

	return (
		<Breadcrumb className={className}>
			<BreadcrumbList>
				{/* First item */}
				{first && renderBreadcrumbItem(first, 0, false)}

				{/* Show ellipsis dropdown only if there are items to collapse */}
				{collapsedCount > 0 && (
					<>
						{separator || <BreadcrumbSeparator />}
						<BreadcrumbItem>
							<BreadcrumbEllipsis
								className={buttonStyles.link}
								items={collapsedItems}
								title={`${collapsedCount} more ${collapsedCount === 1 ? "item" : "items"}`}
								onItemSelect={handleDropdownItemSelect}
							/>
						</BreadcrumbItem>
					</>
				)}

				{/* Last item (if different from first) */}
				{items.length > 1 && last && (
					<>
						{separator || <BreadcrumbSeparator />}
						{renderBreadcrumbItem(last, items.length - 1, true)}
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
