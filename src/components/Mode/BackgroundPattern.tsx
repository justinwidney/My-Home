// BackgroundPattern.tsx
import React from "react";

export const BackgroundPattern: React.FC = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Grid pattern - more visible */}
			<div className="absolute inset-0 opacity-[0.08]">
				<svg width="60" height="60" className="absolute inset-0 w-full h-full">
					<defs>
						<pattern
							id="grid"
							width="60"
							height="60"
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M 60 0 L 0 0 0 60"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" />
				</svg>
			</div>

			{/* Large gradient orbs - more visible */}
			<div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
			<div
				className="absolute top-20 -right-40 w-[500px] h-[500px] bg-gradient-to-r from-green-200/40 to-blue-200/40 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "2s" }}
			></div>
			<div
				className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "4s" }}
			></div>
			<div
				className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: "6s" }}
			></div>

			{/* Moving geometric shapes - more noticeable */}
			<div
				className="absolute top-1/4 left-1/3 w-6 h-6 bg-blue-300/60 rounded-full animate-bounce"
				style={{ animationDuration: "3s", animationDelay: "1s" }}
			></div>
			<div
				className="absolute top-2/3 right-1/4 w-4 h-4 bg-green-300/60 rotate-45 animate-bounce"
				style={{ animationDuration: "4s", animationDelay: "2s" }}
			></div>
			<div
				className="absolute top-1/2 left-1/6 w-5 h-5 bg-purple-300/60 rounded-full animate-bounce"
				style={{ animationDuration: "5s" }}
			></div>
			<div
				className="absolute top-1/6 right-1/6 w-3 h-3 bg-orange-300/60 rotate-45 animate-bounce"
				style={{ animationDuration: "6s", animationDelay: "3s" }}
			></div>
			<div
				className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-pink-300/60 rounded-full animate-bounce"
				style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}
			></div>

			{/* Animated diagonal lines */}
			<div className="absolute top-0 left-0 w-full h-full">
				<div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent transform rotate-12 origin-left"></div>
				<div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent transform -rotate-12 origin-left"></div>
			</div>

			{/* Decorative lines behind cards */}
			<div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent transform -translate-y-1/2"></div>
			<div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent"></div>
			<div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent"></div>

			{/* Corner accent gradients */}
			<div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent"></div>
			<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/30 to-transparent"></div>
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-100/30 to-transparent"></div>
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-100/30 to-transparent"></div>

			{/* Animated border glow effect - more prominent */}
			<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent animate-pulse"></div>
			<div
				className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-green-300/50 to-transparent animate-pulse"
				style={{ animationDelay: "1s" }}
			></div>
		</div>
	);
};
