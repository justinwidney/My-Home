"use client";

import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchStore } from "@/store/store";

interface SearchResult {
	id: string;
	title: string;
	category: string;
	url: string;
}

// Mock data - replace with your actual data fetching
const mockResults: Array<SearchResult> = [
	{ id: "1", title: "Dashboard", category: "Pages", url: "/" },
	{ id: "2", title: "Settings", category: "Pages", url: "/settings" },
	{ id: "3", title: "Profile", category: "Pages", url: "/profile" },
	{ id: "4", title: "Projects", category: "Pages", url: "/projects" },
];

export function Search(): JSX.Element {
	const [searchQuery, setSearchQuery] = useState("");
	const { setOpen } = useSearchStore();

	// Filter results based on search query
	const filteredResults = searchQuery
		? mockResults.filter((result) =>
				result.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
		: mockResults;

	// Group results by category
	const groupedResults = filteredResults.reduce(
		(accumulator, result) => {
			if (!accumulator[result.category]) {
				accumulator[result.category] = [];
			}
			accumulator[result.category]!.push(result);
			return accumulator;
		},
		{} as Record<string, Array<SearchResult>>
	);

	const handleSelect = (url: string): void => {
		setOpen(false);
		// Navigate to the URL
		window.location.href = url;
	};

	return (
		<div className="w-full bg-background border border-border rounded-lg shadow-lg overflow-hidden">
			{/* Search Input */}
			<div className="border-b border-border relative">
				<div className="flex items-center px-4 h-[55px]">
					<SearchIcon className="text-muted-foreground mr-2" size={18} />
					<input
						autoFocus
						className="flex-1 bg-transparent outline-none text-sm"
						placeholder="Type a command or search..."
						type="text"
						value={searchQuery}
						onChange={(event) => {
							setSearchQuery(event.target.value);
						}}
					/>
				</div>
			</div>

			{/* Search Results */}
			<div className="max-h-[400px] overflow-y-auto p-2">
				{filteredResults.length === 0 ? (
					<div className="text-center py-8 text-sm text-muted-foreground">
						No results found for "{searchQuery}"
					</div>
				) : (
					Object.entries(groupedResults).map(([category, results]) => (
						<div key={category} className="mb-4">
							<div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
								{category}
							</div>
							<div className="space-y-1">
								{results.map((result) => (
									<button
										key={result.id}
										className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-accent text-sm text-left transition-colors"
										onClick={() => {
											handleSelect(result.url);
										}}
									>
										<span>{result.title}</span>
									</button>
								))}
							</div>
						</div>
					))
				)}
			</div>

			{/* Footer */}
			<div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
				<div className="flex items-center gap-4">
					<span className="flex items-center gap-1">
						<kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd>
						Navigate
					</span>
					<span className="flex items-center gap-1">
						<kbd className="px-1.5 py-0.5 bg-muted rounded">↵</kbd>
						Select
					</span>
				</div>
				<span className="flex items-center gap-1">
					<kbd className="px-1.5 py-0.5 bg-muted rounded">ESC</kbd>
					Close
				</span>
			</div>
		</div>
	);
}
