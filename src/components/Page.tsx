import React from "react";

// Mock hook for responsive behavior - replace with your actual implementation
const useResponsive = () => {
	const [isNarrowWidth, setIsNarrowWidth] = React.useState(false);

	React.useEffect(() => {
		const checkWidth = () => {
			setIsNarrowWidth(window.innerWidth < 768);
		};

		checkWidth();
		window.addEventListener("resize", checkWidth);
		return () => window.removeEventListener("resize", checkWidth);
	}, []);

	return { isNarrowWidth };
};

// Theme constants - replace with your actual theme
const theme = {
	pageBackground: "#ffffff",
	mobilePageBackground: "#f8f9fa",
	mobileHeaderBackground: "#ffffff",
	mobileHeaderText: "#1f2937",
	mobileHeaderTextHover: "#f3f4f6",
} as const;

const HEADER_HEIGHT = 50;

interface PageHeaderProps {
	title: React.ReactNode;
	style?: React.CSSProperties;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	style = {},
}): JSX.Element => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-start",
				alignItems: "center",
				marginLeft: 20,
				...style,
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					fontSize: 25,
					fontWeight: 500,
				}}
			>
				{typeof title === "string" ? <span>{title}</span> : title}
			</div>
		</div>
	);
};

interface MobilePageHeaderProps {
	title: React.ReactNode;
	style?: React.CSSProperties;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
}

const MobilePageHeader: React.FC<MobilePageHeaderProps> = ({
	title,
	style = {},
	leftContent,
	rightContent,
}): JSX.Element => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				flexDirection: "row",
				flexShrink: 0,
				height: HEADER_HEIGHT,
				backgroundColor: theme.mobileHeaderBackground,
				color: theme.mobileHeaderText,
				...style,
			}}
		>
			<div
				style={{
					flexBasis: "25%",
					display: "flex",
					justifyContent: "flex-start",
					flexDirection: "row",
				}}
			>
				{leftContent}
			</div>
			<div
				role="heading"
				style={{
					textAlign: "center",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "row",
					flexBasis: "50%",
					fontSize: 17,
					fontWeight: 500,
					overflowY: "auto",
				}}
			>
				{title}
			</div>
			<div
				style={{
					flexBasis: "25%",
					display: "flex",
					justifyContent: "flex-end",
					flexDirection: "row",
				}}
			>
				{rightContent}
			</div>
		</div>
	);
};

interface PageProps {
	header: React.ReactNode;
	style?: React.CSSProperties;
	padding?: number;
	children: React.ReactNode;
	footer?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
	header,
	style = {},
	padding,
	children,
	footer,
}): JSX.Element => {
	const { isNarrowWidth } = useResponsive();
	const childrenPadding = padding != null ? padding : isNarrowWidth ? 10 : 20;

	const headerToRender = React.useMemo(() => {
		if (typeof header === "string") {
			return isNarrowWidth ? (
				<MobilePageHeader title={header} />
			) : (
				<PageHeader title={header} />
			);
		}
		return header;
	}, [header, isNarrowWidth]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				minHeight: "100vh",
				backgroundColor: isNarrowWidth
					? theme.mobilePageBackground
					: theme.pageBackground,
				...(!isNarrowWidth && {
					maxWidth: "100%",
					margin: "0 auto",
				}),
				...style,
			}}
		>
			{headerToRender}
			<main
				style={{
					flex: 1,
					overflowY: isNarrowWidth ? "auto" : undefined,
					padding: `0 ${childrenPadding}px`,
				}}
			>
				{children}
			</main>
			{footer}
		</div>
	);
};
