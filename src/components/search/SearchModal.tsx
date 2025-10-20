// SearchModal.tsx
"use client";

import { useSearchStore } from "@/store/store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useHotkeys } from "react-hotkeys-hook";
import { Search } from "./Search";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function SearchModal(): JSX.Element {
	const { isOpen, setOpen } = useSearchStore();

	// Open search with Cmd+K
	useHotkeys(
		"meta+k",
		() => {
			setOpen(true);
		},
		{ enableOnFormTags: true }
	);

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent
				className="overflow-hidden p-0 max-w-full w-full md:max-w-[640px] m-0 bg-transparent border-none shadow-2xl"
				// ❌ remove these toggles; let onOpenChange handle it
				// onEscapeKeyDown={() => setOpen(false)}
				// onInteractOutside={() => setOpen(false)}
			>
				<VisuallyHidden>
					<DialogTitle>Search</DialogTitle>
				</VisuallyHidden>
				<Search />
			</DialogContent>
		</Dialog>
	);
}
