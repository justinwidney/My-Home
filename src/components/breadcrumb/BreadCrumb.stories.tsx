import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./BreadCrumb";

// Simple wrapper to avoid router dependency
const SafeLink: React.FC<{
	href: string;
	children: React.ReactNode;
	className?: string;
}> = ({ href, children, className }) => (
	<a
		href={href}
		className={className}
		onClick={(e) => {
			e.preventDefault();
			console.log(`Navigate to: ${href}`);
		}}
		style={{ color: "inherit", textDecoration: "none" }}
	>
		{children}
	</a>
);

const meta = {
	title: "Components/Breadcrumb",
	component: Breadcrumb,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<{
	items: { label: string; href?: string }[];
}>;

// Button styling utility
const buttonStyles = {
	link: "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md text-black transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-[#FEC76F] hover:bg-[#FDB94E]",
	page: "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg text-black shadow-md bg-[#FEC76F] opacity-80",
	list: "gap-2 sm:gap-3",
};

export const Default: Story = {
	args: {
		items: [
			{ label: "Home", href: "/" },
			{ label: "Dashboard", href: "/dashboard" },
			{ label: "Reports" },
		],
	},
	render: ({ items }) => (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, idx) => (
					<React.Fragment key={idx}>
						<BreadcrumbItem>
							{item.href ? (
								<BreadcrumbLink asChild>
									<SafeLink href={item.href}>{item.label}</SafeLink>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{idx < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const ButtonStyle: Story = {
	args: {
		items: [
			{ label: "Home", href: "/" },
			{ label: "Dashboard", href: "/dashboard" },
			{ label: "Reports" },
		],
	},
	render: ({ items }) => (
		<Breadcrumb>
			<BreadcrumbList className={buttonStyles.list}>
				{items.map((item, idx) => (
					<React.Fragment key={idx}>
						<BreadcrumbItem>
							{item.href ? (
								<BreadcrumbLink asChild>
									<SafeLink href={item.href} className={buttonStyles.link}>
										{item.label}
									</SafeLink>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage className={buttonStyles.page}>
									{item.label}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{idx < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const LongPath: Story = {
	args: {
		items: [
			{ label: "Home", href: "/" },
			{ label: "Products", href: "/products" },
			{ label: "Electronics", href: "/products/electronics" },
			{ label: "Computers", href: "/products/electronics/computers" },
			{ label: "Laptops", href: "/products/electronics/computers/laptops" },
			{ label: "Gaming Laptops" },
		],
	},
	render: ({ items }) => (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, idx) => (
					<React.Fragment key={idx}>
						<BreadcrumbItem>
							{item.href ? (
								<BreadcrumbLink asChild>
									<SafeLink href={item.href}>{item.label}</SafeLink>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{idx < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const CustomSeparator: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<SafeLink href="/">Home</SafeLink>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>→</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<SafeLink href="/products">Products</SafeLink>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>→</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Details</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const WithIcons: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<SafeLink href="/">🏠 Home</SafeLink>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<SafeLink href="/dashboard">📊 Dashboard</SafeLink>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>📈 Analytics</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const SingleItem: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbPage>Home</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

export const TwoItems: Story = {
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<SafeLink href="/">Home</SafeLink>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Dashboard</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};
