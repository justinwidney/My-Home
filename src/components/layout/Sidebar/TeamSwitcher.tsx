// Updated TeamSwitcher.tsx
import { ChevronsUpDown, Plus } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { cn } from "@/lib/utils";

interface Team {
	name: string;
	logo: React.ElementType;
	plan: string;
}

interface TeamSwitcherProps {
	teams: Array<Team>;
	isExpanded?: boolean;
	onMenuOpenChange?: (open: boolean) => void;
}

export function TeamSwitcher({
	teams,
	isExpanded,
	onMenuOpenChange,
}: TeamSwitcherProps): JSX.Element | null {
	const [activeTeam, setActiveTeam] = React.useState<Team>(
		() => teams[0] || { name: "", logo: (): null => null, plan: "" }
	);
	if (!activeTeam) return null;

	return (
		<DropdownMenu
			modal={false}
			onOpenChange={(open) => onMenuOpenChange?.(open)}
		>
			<div className="group relative h-[70px] w-full">
				{/* Background rail - matches NavigationItem exactly */}
				<div
					className={cn(
						"border border-transparent h-[40px] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ml-[15px] mr-[15px] rounded",
						"group-hover:bg-accent",
						isExpanded ? "w-[calc(100%-30px)]" : "w-[40px]",
						// Center it vertically in the 70px header
						"absolute top-1/2 -translate-y-1/2"
					)}
				/>

				{/* Logo - matches NavigationItem icon positioning exactly */}
				<a
					aria-label={`${activeTeam.name} home`}
					className="absolute top-1/2 -translate-y-1/2 left-[15px] w-[40px] h-[40px] flex items-center justify-center pointer-events-auto"
					href="/"
				>
					<div className="text-primary flex items-center justify-center rounded-lg size-8">
						<activeTeam.logo className="size-5" />
					</div>
				</a>

				{/* Dropdown trigger - matches NavigationItem title + controls pattern */}
				{isExpanded && (
					<DropdownMenuTrigger asChild>
						<button
							aria-label="Switch team"
							className="absolute top-1/2 -translate-y-1/2 left-[55px] right-[15px] h-[40px] flex items-center gap-2 text-left group-hover:text-foreground transition-colors duration-200 mr-2 "
							type="button"
						>
							<div className="min-w-0 flex-1">
								<div className="text-sm font-medium text-foreground truncate">
									{activeTeam.name}
								</div>
							</div>
							<ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
						</button>
					</DropdownMenuTrigger>
				)}

				{/* Dropdown content */}
				{isExpanded && (
					<DropdownMenuContent
						align="start"
						alignOffset={-35}
						className="w-56 z-[60]"
						side="bottom"
						sideOffset={2}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Teams
						</DropdownMenuLabel>

						{teams.map((team, index) => (
							<DropdownMenuItem
								key={team.name}
								className="gap-2 p-2 cursor-pointer"
								onClick={() => {
									setActiveTeam(team);
								}}
							>
								<div className="flex size-6 items-center justify-center rounded-md border">
									<team.logo className="size-4" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="text-sm font-medium truncate">
										{team.name}
									</div>
								</div>
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}

						<DropdownMenuSeparator />

						<DropdownMenuItem className="gap-2 p-2 cursor-pointer">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-sm font-medium text-muted-foreground">
								Add team
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				)}
			</div>
		</DropdownMenu>
	);
}
