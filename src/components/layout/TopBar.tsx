type TopBarProps = {
	left?: React.ReactNode;
	center?: React.ReactNode;
	right?: React.ReactNode;
	className?: string;
};

const TopBar: React.FC<TopBarProps> = ({ left, center, right, className }) => {
	return (
		<div
			className={`w-full flex items-center justify-between px-4 py-2 ${className ?? ""}`}
			style={{ position: "relative" }}
		>
			{/* Left section */}
			<div className="flex items-center gap-2 min-w-0">{left}</div>

			{/* Center section - absolute centered */}
			{center && (
				<div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
					{center}
				</div>
			)}

			{/* Right section */}
			<div className="flex items-center gap-2 min-w-0 ml-auto">{right}</div>
		</div>
	);
};

export default TopBar;
