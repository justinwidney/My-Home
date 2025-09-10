// Header.tsx
import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import type { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({ user }) => {
	return (
		<header className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200 h-20 md:h-24">
			<div className="mx-auto max-w-7xl h-full px-5 md:px-10">
				<div className="flex h-full items-center justify-between ">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">M</span>
						</div>
						<span className="font-semibold text-lg">Midday</span>
					</div>

					{/* Navigation Tabs */}
					<nav className="flex items-center justify-center max-w-2xl w-5/12">
						<TabsList className="bg-transparent border-0 p-0 h-auto space-x-2 max-w-lg">
							<TabsTrigger
								value="overview"
								className="bg-transparent border-0 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
							>
								Overview
							</TabsTrigger>
							<TabsTrigger
								value="about"
								className="bg-transparent border-0 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
							>
								About Us
							</TabsTrigger>
							<TabsTrigger
								value="how-it-works"
								className="bg-transparent border-0 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-colors"
							>
								How It Works
							</TabsTrigger>
						</TabsList>
					</nav>

					{/* Profile */}
					<div className="flex items-center space-x-2">
						{user.avatar ? (
							<img
								src={user.avatar}
								alt={user.name}
								className="w-8 h-8 rounded-full object-cover"
							/>
						) : (
							<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
								<span className="text-gray-600 font-medium text-sm">
									{user.initials}
								</span>
							</div>
						)}
						<span className="hidden md:block text-sm text-gray-700">
							{user.name}
						</span>
					</div>
				</div>
			</div>
		</header>
	);
};
