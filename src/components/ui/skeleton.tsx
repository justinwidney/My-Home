import { cn } from "../../lib/utils";

function Skeleton({
	className,
	...props
}: React.ComponentProps<"div">): JSX.Element {
	return (
		<div
			className={cn("bg-accent animate-pulse rounded-md", className)}
			data-slot="skeleton"
			{...props}
		/>
	);
}

export { Skeleton };
