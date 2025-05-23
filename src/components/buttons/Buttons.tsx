import { Volume2 } from "lucide-react";

// Type definitions
interface BaseButtonProps {
	text: string;
	onClick?: () => void;
	className?: string;
}

interface ButtonTypeOneProps extends BaseButtonProps {
	object: "slider" | "icon";
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	sliderValue?: number;
	onSliderChange?: (value: number) => void;
	size?: "small" | "large";
}

interface ButtonTypeTwoProps extends BaseButtonProps {
	variant: "blue" | "yellow" | "black";
}

// Button Type One: White background, no rounded corners, text + object
export const MenuButton: React.FC<ButtonTypeOneProps> = ({
	text,
	object,
	icon: Icon = Volume2,
	sliderValue = 50,
	onSliderChange,
	onClick,
	size = "large",
	className = "",
}) => {
	const handleSliderChange = (
		event_: React.ChangeEvent<HTMLInputElement>
	): void => {
		const newValue = parseInt(event_.target.value);
		onSliderChange?.(newValue);
	};

	const getSizeClasses = (): string => {
		switch (size) {
			case "small":
				return "min-w-[132px] h-[48px] px-4";
			case "large":
				return "min-w-[200px] h-[48px] px-4";
			default:
				return "w-[200px] px-4 py-4";
		}
	};

	return (
		<button
			className={`
        bg-white 
        border border-gray-200 
        ${getSizeClasses()}
        flex items-center justify-between
        hover:bg-gray-50 
        transition-colors 
        ${className}
      `}
			onClick={onClick}
		>
			<span className="text-gray-800 font-medium text-md">{text}</span>
			{object === "slider" ? (
				<div className="flex items-center gap-2">
					<input
						className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
						max="100"
						min="0"
						type="range"
						value={sliderValue}
						onChange={handleSliderChange}
						onClick={(event_) => {
							event_.stopPropagation();
						}}
					/>
					<span className="text-sm text-gray-600 min-w-[2rem]">
						{sliderValue}
					</span>
				</div>
			) : (
				<Icon className="w-5 h-5 text-[#1CA3BE]" />
			)}
		</button>
	);
};

// Button Type Two: Colored background, rounded edges, white text
export const FreeButton: React.FC<ButtonTypeTwoProps> = ({
	text,
	variant,
	onClick,
	className = "",
}) => {
	const getVariantClasses = (): string => {
		switch (variant) {
			case "blue":
				return "bg-blue-600 hover:bg-blue-700";
			case "yellow":
				return "bg-yellow-500 hover:bg-yellow-600";
			case "black":
				return "bg-black hover:bg-gray-800";
			default:
				return "bg-blue-600 hover:bg-blue-700";
		}
	};

	return (
		<button
			className={`
        ${getVariantClasses()}
        text-white 
        font-medium 
        px-6 py-3 
        rounded-lg 
        flex items-center justify-center 
        transition-colors 
        ${className}
      `}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
