// Header.tsx
import { cn } from "@/lib/utils";
import { OpenSearchButton } from "../../search/OpenSearchButton";
import { HeaderTabs } from "./HeaderTabs";
import { NextStepSection } from "./NextStepSection";
import { HeaderUserProfile } from "./HeaderUserProfile";

interface HeaderProps {
	className?: string;
	user?: {
		name: string;
		email: string;
		avatar?: string;
	};
}

export function Header({ className, user }: HeaderProps): JSX.Element {
	return (
		<header
			className={cn(
				"h-[70px] flex items-center justify-between z-50",
				"sticky top-0 bg-gray-50",
				"border-b border-border",
				"max-w-[1200px] mx-auto",
				className
			)}
		>
			<div className="flex items-center w-full px-2">
				{/* Left */}
				<div className="flex-1 flex justify-start">
					<div className="bg-background border border-border rounded-lg shadow-sm h-[52px] flex items-center px-3">
						<OpenSearchButton />
					</div>
				</div>

				{/* Center */}
				<div className="flex-shrink-0 h-[52px] flex items-center px-3">
					<HeaderTabs />
				</div>

				{/* Right */}
				<div className="flex-1 flex justify-end gap-2">
					<div className="h-[52px] flex items-center px-4 gap-3">
						<NextStepSection />
					</div>
					{user && (
						<div className="bg-background border border-border rounded-lg shadow-sm h-[52px] flex items-center px-2">
							<HeaderUserProfile user={user} />
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
