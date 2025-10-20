// MainNavigation.tsx
import { cn } from "@/lib/utils";
import { ChevronDown, MoreHorizontal, type LucideIcon } from "lucide-react";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationAction {
	label: string;
	icon: LucideIcon;
	onClick: () => void;
	variant?: "default" | "destructive";
}

interface NavigationItem {
	title: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	// For expandable items (like main navigation)
	items?: Array<{
		title: string;
		url: string;
		isActive?: boolean;
	}>;
	// For items with dropdown actions (like projects)
	actions?: Array<NavigationAction>;
}

interface NavigationSection {
	title?: string;
	items: Array<NavigationItem>;
}

interface NavigationProps {
	sections: Array<NavigationSection>;
	isExpanded?: boolean;
	onAnyMenuOpenChange?: (open: boolean) => void;
}

// Separate child item component for easier tracing
function ChildItem({
	child,
	isActive,
	shouldShow,
	index,
}: {
	child: { title: string; url: string; isActive?: boolean };
	isActive: boolean;
	isExpanded: boolean;
	shouldShow: boolean;
	index: number;
}): JSX.Element {
	return (
		<a key={child.url} className="block group/child" href={child.url}>
			<div
				className={cn(
					"ml-[40px] mr-4 h-[32px] flex items-center",
					"border-l border-border pl-3",
					"transition-all duration-200 ease-out",
					shouldShow ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
				)}
				style={{
					transitionDelay: shouldShow
						? `${40 + index * 20}ms`
						: `${index * 20}ms`,
				}}
			>
				<span
					className={cn(
						"text-xs font-medium transition-colors duration-200",
						"text-muted-foreground group-hover/child:text-foreground",
						"whitespace-nowrap overflow-hidden",
						isActive && "text-foreground"
					)}
				>
					{child.title}
				</span>
			</div>
		</a>
	);
}

function NavigationItem({
	item,
	isExpanded,
	isItemExpanded,
	onToggle,
	onMenuOpenChange,
}: {
	item: NavigationItem;
	isExpanded?: boolean;
	isItemExpanded?: boolean;
	onToggle?: (url: string) => void;
	onMenuOpenChange?: (open: boolean) => void;
}): JSX.Element {
	const Icon = item.icon;
	const hasChildren = !!(item.items && item.items.length);
	const hasActions = !!(item.actions && item.actions.length);
	const shouldShowChildren = !!(isExpanded && isItemExpanded);

	const handleChevronClick = (event_: React.MouseEvent): void => {
		event_.preventDefault();
		event_.stopPropagation();
		onToggle?.(item.url);
	};

	return (
		<div className="group relative">
			{/* Background rail */}
			<div
				className={cn(
					"border border-transparent h-[40px] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ml-[6px] mr-3 rounded-lg",
					item.isActive && "bg-accent border-border",
					"group-hover:bg-accent",
					isExpanded ? "w-[calc(100%-24px)]" : "w-[40px]"
				)}
			/>

			{/* Icon */}
			<div className="pointer-events-none absolute top-0 left-[6px] w-[40px] h-[40px] flex items-center justify-center">
				<div
					className={cn(
						"text-foreground transition-colors duration-200",
						"group-hover:text-foreground",
						item.isActive && "text-foreground"
					)}
				>
					{Icon && <Icon size={20} />}
				</div>
			</div>

			{/* Title + controls row */}
			{isExpanded && (
				<div className="absolute top-0 left-[52px] right-[4px] h-[40px] flex items-center gap-1">
					{/* Title link (only the text navigates) */}
					<a
						href={item.url}
						className={cn(
							"min-w-0 flex-1 text-sm font-medium transition-colors duration-200",
							"text-muted-foreground group-hover:text-foreground",
							"whitespace-nowrap overflow-hidden",
							(hasChildren || hasActions) && "pr-2",
							item.isActive && "text-foreground"
						)}
						onClick={(event_) => {
							// keep link behavior, but avoid interfering with menu/chevron
							event_.stopPropagation();
						}}
					>
						{item.title}
					</a>

					{/* Actions dropdown (never inside a link) */}
					{hasActions && (
						<DropdownMenu
							modal={false}
							onOpenChange={(open) => onMenuOpenChange?.(open)}
						>
							<DropdownMenuTrigger asChild>
								<button
									className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 ml-auto mr-3 rounded"
									type="button"
								>
									<MoreHorizontal size={16} />
									<span className="sr-only">More actions for {item.title}</span>
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="start"
								className="w-48 z-[60]"
								side="right"
								sideOffset={4}
							>
								{item.actions!.map((action, index) => (
									<React.Fragment key={action.label}>
										{index > 0 && action.variant === "destructive" && (
											<DropdownMenuSeparator />
										)}
										<DropdownMenuItem
											className={cn(
												"cursor-pointer",
												action.variant === "destructive" && "text-destructive"
											)}
											onClick={(event_) => {
												event_.stopPropagation();
												action.onClick();
											}}
										>
											<action.icon className="mr-2 h-4 w-4" />
											{action.label}
										</DropdownMenuItem>
									</React.Fragment>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)}

					{/* Chevron for expandable items */}
					{hasChildren && (
						<button
							type="button"
							className={cn(
								"w-8 h-8 flex items-center justify-center transition-all duration-200 mr-3 rounded",
								"text-muted-foreground hover:text-foreground",
								item.isActive && "text-foreground/60",
								shouldShowChildren && "rotate-180"
							)}
							onClick={handleChevronClick}
						>
							<ChevronDown size={16} />
						</button>
					)}
				</div>
			)}

			{/* Children list */}
			{hasChildren && (
				<div
					className={cn(
						"transition-all duration-300 ease-out overflow-hidden",
						shouldShowChildren ? "max-h-96 mt-1" : "max-h-0"
					)}
				>
					{item.items!.map((child, index) => (
						<ChildItem
							key={child.url}
							child={child}
							index={index}
							isActive={!!child.isActive}
							isExpanded={!!isExpanded}
							shouldShow={!!shouldShowChildren}
						/>
					))}
				</div>
			)}
		</div>
	);
}

function NavigationSection({
	section,
	isExpanded,
	expandedItems,
	onToggle,
	onAnyMenuOpenChange,
}: {
	section: NavigationSection;
	isExpanded?: boolean;
	expandedItems: Set<string>;
	onToggle: (url: string) => void;
	onAnyMenuOpenChange: (open: boolean) => void;
}): JSX.Element {
	return (
		<div className="mb-6 first:mb-[24px]">
			{/* Section title */}
			{section.title && isExpanded && (
				<div className="px-4 mb-2">
					<span className="text-xs font-medium text-muted-foreground">
						{section.title}
					</span>
				</div>
			)}

			{/* Section items */}
			<div className="flex flex-col gap-2">
				{section.items.map((item) => (
					<NavigationItem
						key={item.url}
						isExpanded={isExpanded}
						isItemExpanded={expandedItems.has(item.url)}
						item={item}
						onMenuOpenChange={onAnyMenuOpenChange}
						onToggle={onToggle}
					/>
				))}
			</div>
		</div>
	);
}

export function Navigation({
	sections,
	isExpanded,
	onAnyMenuOpenChange,
}: NavigationProps): JSX.Element {
	const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
		new Set()
	);

	const [isAnyMenuOpen, setIsAnyMenuOpen] = React.useState(false);

	// Reset expanded items when sidebar collapses
	React.useEffect(() => {
		if (!isExpanded && !isAnyMenuOpen) setExpandedItems(new Set());
	}, [isExpanded, isAnyMenuOpen]);

	const toggleItem = (url: string): void => {
		setExpandedItems((previous) => {
			const newSet = new Set(previous);
			if (newSet.has(url)) {
				newSet.delete(url);
			} else {
				newSet.add(url);
			}
			return newSet;
		});
	};

	const handleMenuOpenChange = (open: boolean): void => {
		setIsAnyMenuOpen(open);
		onAnyMenuOpenChange?.(open);
	};

	const effectiveExpanded = !!(isExpanded || isAnyMenuOpen);

	return (
		<div className="mt-6 w-full">
			<nav className="w-full">
				{sections.map((section, index) => (
					<NavigationSection
						key={section.title || index}
						expandedItems={expandedItems}
						isExpanded={effectiveExpanded}
						section={section}
						onAnyMenuOpenChange={handleMenuOpenChange}
						onToggle={toggleItem}
					/>
				))}
			</nav>
		</div>
	);
}
