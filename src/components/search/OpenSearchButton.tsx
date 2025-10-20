// OpenSearchButton.tsx
"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/store/store";

interface OpenSearchButtonProps {
	onClick?: () => void;
	className?: string;
}

export function OpenSearchButton({
	className,
}: OpenSearchButtonProps): JSX.Element {
	const { setOpen } = useSearchStore();

	return (
		<button
			type="button"
			className={cn(
				"flex items-center gap-2 px-3 py-2 rounded-md",
				"text-sm text-muted-foreground",
				"hover:bg-accent hover:text-foreground",
				"transition-colors duration-200",
				"min-w-[200px]",
				className
			)}
			onClick={() => {
				setOpen(true);
			}}
		>
			<Search className="flex-shrink-0" size={16} />
			<span>Search...</span>
			<kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
				<span className="text-xs">⌘</span>K
			</kbd>
		</button>
	);
}
