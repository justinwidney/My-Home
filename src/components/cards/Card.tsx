import React from "react";
import { X, MapPin, Home } from "lucide-react";

// Type definitions
interface BaseCardProps {
	optionalText?: string;
	showButton?: boolean;
	buttonIcon?: React.ComponentType<any>;
	onButtonClick?: () => void;
	className?: string;
}

interface ImageCardProps extends BaseCardProps {
	type: "image";
	image: string;
	title: string;
	description: string;
}

interface HouseCardProps extends BaseCardProps {
	type: "house";
	location: string;
	houseInfo: string;
	centerImage: string;
	yearsUntilDownPayment: number;
	yearsUntilOwn: number;
	blueSquareText: string;
}

type CardProps = ImageCardProps | HouseCardProps;

// Image Card Content
const ImageCardContent: React.FC<ImageCardProps> = ({
	image,
	title,
	description,
}) => {
	return (
		<div className="p-6 border-2 border-blue-500 rounded-lg">
			{/* Image */}
			<div className="mb-4">
				<img
					src={image}
					alt={title}
					className="w-full h-32 object-cover rounded"
				/>
			</div>

			{/* Black circle with title */}
			<div className="relative mb-4">
				<div className="bg-black rounded-full h-16 flex items-center justify-center -mx-2">
					<h3 className="text-white font-semibold text-lg text-center px-4">
						{title}
					</h3>
				</div>
			</div>

			{/* Description text */}
			<div className="text-center">
				<p className="text-gray-700 text-sm leading-relaxed">{description}</p>
			</div>
		</div>
	);
};

// House Card Content
const HouseCardContent: React.FC<HouseCardProps> = ({
	location,
	houseInfo,
	centerImage,
	yearsUntilDownPayment,
	yearsUntilOwn,
	blueSquareText,
}) => {
	return (
		<div className="px-[6px] relative">
			{/* Location */}
			<div className="flex items-center mb-2">
				<p className="text-gray-800 font-bold " style={{ fontSize: "20px" }}>
					{location}
				</p>
			</div>

			{/* House info with padding below location and extra padding below */}
			<div className="flex items-center mb-2">
				<p className="text-gray-600" style={{ fontSize: "13px" }}>
					{houseInfo}
				</p>
			</div>

			{/* Image covering full width minus card padding */}
			<div className="mb-2 ">
				<img
					alt="House"
					className="w-full h-48 object-cover"
					src={centerImage}
				/>
			</div>

			{/* Two rows with years info - properly centered */}
			<div className=" mb-2 space-y-1">
				<div className="flex flex-row items-center text-center justify-center  gap-2">
					<p className="font-regular text-gray-800 text-md">
						{yearsUntilDownPayment}
					</p>
					<p className="font-regular text-gray-800 text-md">
						Years until down payment
					</p>
				</div>
				<hr></hr>
				<div className="flex flex-row items-center text-center justify-center gap-2">
					<p className="font-bold text-gray-800 text-2xl">{yearsUntilOwn}</p>
					<p className="font-bold text-gray-800 text-2xl">
						Years until you own
					</p>
				</div>
			</div>

			{/* Blue square covering full width including card padding */}
			<div
				className="absolute -left-4 -right-4 bg-blue-600 text-white rounded shadow-lg flex items-center justify-center w-100 py-6"
				style={{ height: "42px" }}
			>
				<p className="font-bold" style={{ fontSize: "32px" }}>
					{blueSquareText}
				</p>
			</div>
		</div>
	);
};

// Main Card Component
export const Card: React.FC<CardProps> = (props) => {
	const {
		optionalText,
		showButton = true,
		buttonIcon: ButtonIcon = X,
		onButtonClick,
		className = "",
	} = props;

	return (
		<div className={`relative ${className}`}>
			{/* Optional text above card - truly centered */}
			{optionalText && (
				<div className="flex justify-center mb-4">
					<p className="text-gray-900 font-bold text-sm">{optionalText}</p>
				</div>
			)}

			{/* White card container */}
			<div className="bg-white rounded-md shadow-lg relative overflow-visible p-4 py-3 px-4 drop-shadow-lg ">
				{/* Free floating button with negative margins */}
				{showButton && (
					<button
						className="absolute -top-4 -right-4 w-20 h-[42px] bg-yellow-400 hover:bg-gray-200 rounded-lg transition-colors z-10 flex items-center justify-center shadow-md"
						onClick={onButtonClick}
					>
						<p>Select</p>
					</button>
				)}

				{/* Card content based on type */}
				{props.type === "image" ? (
					<ImageCardContent {...props} />
				) : (
					<HouseCardContent {...props} />
				)}
			</div>
		</div>
	);
};
