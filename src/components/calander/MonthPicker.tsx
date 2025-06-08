"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react";

interface MonthPickerProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: string | Array<string>;
	defaultValue?: string;
	onValueChange?: (value: string | Array<string>) => void;
	minDate?: Date;
	maxDate?: Date;
	numberOfMonths?: number;
	mode?: "single" | "range";
	disabled?: boolean;
}

// Month utilities
const getMonthKey = (date: Date): string => {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const parseMonthKey = (key: string): Date => {
	const [year, month] = key.split("-").map(Number);
	return new Date(year!, month! - 1);
};

const formatMonthShort = (date: Date): string => {
	return date.toLocaleDateString("en-US", { month: "short" });
};

const formatMonthFull = (date: Date): string => {
	return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const addMonths = (date: Date, months: number): Date => {
	const newDate = new Date(date);
	newDate.setMonth(newDate.getMonth() + months);
	return newDate;
};

const isSameMonth = (date1: Date, date2: Date): boolean => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth()
	);
};

export function MonthPicker({
	value,
	defaultValue,
	onValueChange,
	minDate,
	maxDate,
	numberOfMonths = 12,
	mode = "single",
	disabled = false,
	className,
	...props
}: MonthPickerProps): JSX.Element {
	const today = React.useMemo(() => new Date(), []);
	const currentMonthKey = getMonthKey(today);

	// Initialize selected value
	const [selectedValue, setSelectedValue] = React.useState<
		string | Array<string>
	>(() => {
		if (value !== undefined) return value;
		if (defaultValue !== undefined) return defaultValue;
		return mode === "single" ? currentMonthKey : [];
	});

	// Use value prop if provided (controlled), otherwise use internal state
	const actualValue = value !== undefined ? value : selectedValue;

	// Calculate center month for display
	const centerMonth = React.useMemo(() => {
		if (mode === "single" && typeof actualValue === "string") {
			return parseMonthKey(actualValue);
		} else if (
			mode === "range" &&
			Array.isArray(actualValue) &&
			actualValue.length > 0
		) {
			return parseMonthKey(actualValue[0]!);
		}
		return today;
	}, [actualValue, mode, today]);

	const [displayStartDate, setDisplayStartDate] = React.useState(() => {
		// Start from 6 months before the center month
		return addMonths(centerMonth, -Math.floor(numberOfMonths / 2));
	});

	const [hoveredMonth, setHoveredMonth] = React.useState<string | null>(null);

	// Generate array of months to display
	const displayMonths = React.useMemo(() => {
		const months: Array<{ key: string; date: Date; year: number }> = [];
		let currentDate = new Date(displayStartDate);

		for (let index = 0; index < numberOfMonths; index++) {
			months.push({
				key: getMonthKey(currentDate),
				date: new Date(currentDate),
				year: currentDate.getFullYear(),
			});
			currentDate = addMonths(currentDate, 1);
		}

		return months;
	}, [displayStartDate, numberOfMonths]);

	// Track which years to show headers for
	const yearHeaders = React.useMemo(() => {
		const years = new Set<number>();
		const firstYears: Record<number, number> = {};

		displayMonths.forEach((month, index) => {
			if (!years.has(month.year)) {
				years.add(month.year);
				firstYears[month.year] = index;
			}
		});

		return firstYears;
	}, [displayMonths]);

	const handleMonthClick = (monthKey: string): void => {
		if (disabled) return;

		let newValue: string | string[];

		if (mode === "single") {
			newValue = monthKey;
		} else {
			// Range mode
			const currentRange = Array.isArray(actualValue) ? actualValue : [];

			if (currentRange.length === 0 || currentRange.length === 2) {
				// Start new range
				newValue = [monthKey];
			} else {
				// Complete range
				const start = parseMonthKey(currentRange[0]);
				const clicked = parseMonthKey(monthKey);

				if (clicked < start) {
					newValue = [monthKey, currentRange[0]];
				} else {
					newValue = [currentRange[0], monthKey];
				}
			}
		}

		if (value === undefined) {
			setSelectedValue(newValue);
		}
		onValueChange?.(newValue);
	};

	const navigateMonths = (direction: number): void => {
		setDisplayStartDate((previous) => addMonths(previous, direction));
	};

	const goToToday = (): void => {
		const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		setDisplayStartDate(addMonths(todayMonth, -Math.floor(numberOfMonths / 2)));
		handleMonthClick(currentMonthKey);
	};

	const isMonthSelected = (monthKey: string): boolean => {
		if (mode === "single") {
			return actualValue === monthKey;
		} else {
			const range = Array.isArray(actualValue) ? actualValue : [];
			if (range.length === 2) {
				const [start, end] = range;
				const monthDate = parseMonthKey(monthKey);
				const startDate = parseMonthKey(start!);
				const endDate = parseMonthKey(end!);
				return monthDate >= startDate && monthDate <= endDate;
			}
			return range.includes(monthKey);
		}
	};

	const isMonthInRange = (monthKey: string): boolean => {
		if (mode === "range" && hoveredMonth) {
			const range = Array.isArray(actualValue) ? actualValue : [];
			if (range.length === 1) {
				const start = parseMonthKey(range[0]!);
				const hovered = parseMonthKey(hoveredMonth);
				const current = parseMonthKey(monthKey);

				return (
					(current >= start && current <= hovered) ||
					(current <= start && current >= hovered)
				);
			}
		}
		return false;
	};

	const isMonthDisabled = (date: Date): boolean => {
		if (
			minDate &&
			date < new Date(minDate.getFullYear(), minDate.getMonth(), 1)
		) {
			return true;
		}
		if (
			maxDate &&
			date > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
		) {
			return true;
		}
		return false;
	};

	return (
		<div
			className={cn("flex items-center gap-4", className)}
			data-slot="month-picker"
			{...props}
		>
			{/* Today button */}
			<Button
				className="h-8 w-8"
				disabled={disabled}
				size="icon"
				title="Go to current month"
				variant="ghost"
				onClick={goToToday}
			>
				<CalendarIcon className="h-4 w-4" />
			</Button>

			{/* Previous button */}
			<Button
				className="h-8 w-8"
				disabled={disabled}
				size="icon"
				variant="ghost"
				onClick={() => {
					navigateMonths(-1);
				}}
			>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button>

			{/* Months display */}
			<div className="flex items-center gap-1 relative">
				{displayMonths.map((month, index) => {
					const isSelected = isMonthSelected(month.key);
					const isInRange = isMonthInRange(month.key);
					const isDisabled = isMonthDisabled(month.date);
					const isToday = isSameMonth(month.date, today);
					const showYearHeader = yearHeaders[month.year] === index;

					return (
						<div key={month.key} className="relative">
							{showYearHeader && (
								<div
									data-slot="year-header"
									className={cn(
										"absolute -top-5 left-0 text-xs font-semibold",
										isDisabled ? "text-gray-400" : "text-gray-700"
									)}
								>
									{month.year}
								</div>
							)}

							<button
								data-selected={isSelected}
								data-slot="month-button"
								data-today={isToday}
								disabled={disabled || isDisabled}
								title={formatMonthFull(month.date)}
								className={cn(
									"px-2 py-1 text-sm rounded-md transition-colors relative",
									"hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1",
									isSelected && "bg-black text-white hover:bg-gray-800",
									isInRange && !isSelected && "bg-gray-200",
									isToday && !isSelected && "font-bold text-blue-600",
									isDisabled &&
										"text-gray-400 cursor-not-allowed hover:bg-transparent",
									disabled && "cursor-not-allowed opacity-50",
									// Range mode specific styles
									mode === "range" &&
										isSelected &&
										index === 0 &&
										"rounded-r-none",
									mode === "range" &&
										isSelected &&
										index === displayMonths.length - 1 &&
										"rounded-l-none",
									mode === "range" &&
										isSelected &&
										index > 0 &&
										index < displayMonths.length - 1 &&
										"rounded-none"
								)}
								onClick={() => !isDisabled && handleMonthClick(month.key)}
								onMouseEnter={() => {
									setHoveredMonth(month.key);
								}}
								onMouseLeave={() => {
									setHoveredMonth(null);
								}}
							>
								{formatMonthShort(month.date)}
							</button>
						</div>
					);
				})}
			</div>

			{/* Next button */}
			<Button
				className="h-8 w-8"
				disabled={disabled}
				size="icon"
				variant="ghost"
				onClick={() => navigateMonths(1)}
			>
				<ChevronRightIcon className="h-4 w-4" />
			</Button>

			{/* Full month display */}
			<div className="text-sm font-medium text-gray-700 min-w-[150px]">
				{mode === "single" && typeof actualValue === "string" && (
					<span>{formatMonthFull(parseMonthKey(actualValue))}</span>
				)}
				{mode === "range" &&
					Array.isArray(actualValue) &&
					actualValue.length === 2 && (
						<span>
							{formatMonthFull(parseMonthKey(actualValue[0]))} -{" "}
							{formatMonthFull(parseMonthKey(actualValue[1]))}
						</span>
					)}
			</div>
		</div>
	);
}
