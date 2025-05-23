interface ResponsiveTitleProps {
	title: string;
	showHelp?: boolean;
}

export const ResponsiveTitle: React.FC<ResponsiveTitleProps> = ({
	title,
	showHelp = false,
}) => {
	return (
		<div className="flex items-center w-full relative py-4">
			{/* Left Blue Bar */}
			<div className="flex-grow h-4 bg-[#1CA3BE]" />

			{/* Title and optional help icon */}
			<div className="relative flex items-center mx-4 whitespace-nowrap">
				<h2 className="text-6xl font-bold">{title}</h2>
				{showHelp && (
					<div className="absolute -top-5 -right-4 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-lg shadow">
						?
					</div>
				)}
			</div>

			{/* Right Blue Bar */}
			<div className="flex-grow h-4 bg-[#1CA3BE]" />
		</div>
	);
};
