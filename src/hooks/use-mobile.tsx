// src/hooks/use-mobile.tsx
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768): boolean {
	const [isMobile, setIsMobile] = useState(
		() => typeof window !== "undefined" && window.innerWidth < breakpoint
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
		const handler = (event_: MediaQueryListEvent): void => {
			setIsMobile(event_.matches);
		};

		// set initial value
		setIsMobile(mediaQuery.matches);

		// listen for changes
		mediaQuery.addEventListener("change", handler);
		return (): void => {
			mediaQuery.removeEventListener("change", handler);
		};
	}, [breakpoint]);

	return isMobile;
}
