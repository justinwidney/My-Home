// HeaderUserProfile.tsx
import {
	User,
	LogOut,
	Settings,
	CreditCard,
	Bell,
	Sparkles,
} from "lucide-react";
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

interface User {
	name: string;
	email: string;
	avatar?: string;
}

interface HeaderUserProfileProps {
	user: User;
	className?: string;
}

export function HeaderUserProfile({
	user,
	className,
}: HeaderUserProfileProps): JSX.Element {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={cn(
						"flex items-center gap-2 rounded-md p-1.5",
						"hover:bg-accent transition-colors duration-200",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						className
					)}
				>
					<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
						{user.avatar ? (
							<img
								alt={user.name}
								className="w-full h-full rounded-full object-cover"
								src={user.avatar}
							/>
						) : (
							<span className="text-sm font-medium text-primary-foreground">
								{user.name.charAt(0)}
							</span>
						)}
					</div>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56" sideOffset={8}>
				<DropdownMenuLabel>
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
							{user.avatar ? (
								<img
									alt={user.name}
									className="w-full h-full rounded-full object-cover"
									src={user.avatar}
								/>
							) : (
								<span className="text-sm font-medium text-primary-foreground">
									{user.name.charAt(0)}
								</span>
							)}
						</div>
						<div className="flex-1 min-w-0">
							<div className="text-sm font-medium truncate">{user.name}</div>
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
		</DropdownMenu>
	);
}
