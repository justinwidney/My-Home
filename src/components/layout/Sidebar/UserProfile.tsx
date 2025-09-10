// Fixed UserProfile.tsx
import {
	User,
	LogOut,
	Settings,
	CreditCard,
	Bell,
	Sparkles,
	ChevronsUpDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserData {
	name: string;
	email: string;
	avatar: string;
}

interface UserProfileProps {
	user: UserData;
	isExpanded?: boolean;
	onMenuOpenChange?: (open: boolean) => void;
}

export function UserProfile({
	user,
	isExpanded,
	onMenuOpenChange,
}: UserProfileProps): JSX.Element {
	return (
		<DropdownMenu
			modal={false}
			onOpenChange={(open) => onMenuOpenChange?.(open)}
		>
			<div className="group relative h-[48px] w-full">
				{/* Background rail - matches your other components exactly */}
				<div
					className={cn(
						"border border-transparent h-[48px] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ml-[15px] mr-[15px] rounded",
						"group-hover:bg-accent",
						isExpanded ? "w-[calc(100%-30px)]" : "w-[40px]",
						// Keep it positioned absolutely like other components
						"absolute top-0"
					)}
				/>

				{/* Avatar - matches NavigationItem icon positioning exactly */}
				<div className="pointer-events-none absolute top-0 left-[15px] w-[40px] h-[48px] flex items-center justify-center">
					<Avatar className="h-8 w-8">
						<AvatarImage alt={user.name} src={user.avatar} />
						<AvatarFallback>
							<User size={16} />
						</AvatarFallback>
					</Avatar>
				</div>

				{/* User info + dropdown trigger - matches other components pattern */}
				{isExpanded && (
					<DropdownMenuTrigger asChild>
						<button
							className="absolute top-0 left-[55px] right-[15px] h-[48px] flex items-center gap-2 text-left group-hover:text-foreground transition-colors duration-200  mr-2"
							type="button"
						>
							<div className="min-w-0 flex-1">
								<div className="text-sm font-medium text-foreground truncate">
									{user.name}
								</div>
								<div className="text-xs text-muted-foreground truncate">
									{user.email}
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
						side="top"
						sideOffset={15}
					>
						<DropdownMenuLabel>
							<div className="flex items-center space-x-2">
								<Avatar className="h-8 w-8">
									<AvatarImage alt={user.name} src={user.avatar} />
									<AvatarFallback>
										<User size={16} />
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 min-w-0">
									<div className="text-sm font-medium truncate">
										{user.name}
									</div>
									<div className="text-xs text-muted-foreground truncate">
										{user.email}
									</div>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="cursor-pointer">
								<Sparkles className="mr-2 h-4 w-4" />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="cursor-pointer">
								<User className="mr-2 h-4 w-4" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<CreditCard className="mr-2 h-4 w-4" />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<Settings className="mr-2 h-4 w-4" />
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<Bell className="mr-2 h-4 w-4" />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer">
							<LogOut className="mr-2 h-4 w-4" />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				)}
			</div>
		</DropdownMenu>
	);
}
