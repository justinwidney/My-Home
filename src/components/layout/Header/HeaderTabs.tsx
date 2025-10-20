// HeaderTabs.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderTabsProps {
	defaultValue?: string;
	tabs?: Array<{ value: string; label: string }>;
	onTabChange?: (value: string) => void;
}

export function HeaderTabs({
	defaultValue = "overview",
	tabs = [
		{ value: "overview", label: "Overview" },
		{ value: "analytics", label: "Analytics" },
		{ value: "reports", label: "Reports" },
		{ value: "settings", label: "Settings" },
	],
	onTabChange,
}: HeaderTabsProps): JSX.Element {
	return (
		<Tabs defaultValue={defaultValue} onValueChange={onTabChange}>
			<TabsList className="h-9 bg-muted/50">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						className="text-xs data-[state=active]:bg-background"
						value={tab.value}
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
}
