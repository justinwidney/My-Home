import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SmartBreadcrumb } from "./CollapsingBreadCrumb";
import {
	RouterProvider,
	createMemoryHistory,
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from "@tanstack/react-router";

// Router setup for all stories - matching your working pattern
const createStorybookRouter = (initialPath = "/") => {
	// This function is no longer used, keeping for reference
	return null;
};

// Wrapper component for router context
const RouterWrapper: React.FC<{
	children: React.ReactNode;
	initialPath?: string;
}> = ({ children, initialPath = "/" }) => {
	const router = React.useMemo(() => {
		const rootRoute = createRootRoute({
			component: () => <>{children}</>,
		});

		// Create your routes here
		const indexRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/",
			component: function Index() {
				return <div>Home Page</div>;
			},
		});

		const dashboardRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/dashboard",
			component: function Dashboard() {
				return <div>Dashboard Page</div>;
			},
		});

		const reportsRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/dashboard/reports",
			component: function Reports() {
				return <div>Reports Page</div>;
			},
		});

		const analyticsRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/dashboard/reports/analytics",
			component: function Analytics() {
				return <div>Analytics Page</div>;
			},
		});

		const productsRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/products",
			component: function Products() {
				return <div>Products Page</div>;
			},
		});

		const electronicsRoute = createRoute({
			getParentRoute: () => rootRoute,
			path: "/products/electronics",
			component: function Electronics() {
				return <div>Electronics Page</div>;
			},
		});

		const routeTree = rootRoute.addChildren([
			indexRoute,
			dashboardRoute,
			reportsRoute,
			analyticsRoute,
			productsRoute,
			electronicsRoute,
		]);

		const memoryHistory = createMemoryHistory({
			initialEntries: [initialPath],
		});

		return createRouter({
			routeTree,
			history: memoryHistory,
		});
	}, [initialPath, children]);

	return <RouterProvider router={router} />;
};

const meta = {
	title: "Components/SmartBreadcrumb",
	component: SmartBreadcrumb,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<RouterWrapper>
				<Story />
			</RouterWrapper>
		),
	],
} satisfies Meta<typeof SmartBreadcrumb>;

export default meta;

type Story = StoryObj<typeof SmartBreadcrumb>;

export const Default: Story = {
	args: {
		items: [
			{ label: "Home", href: "/" },
			{ label: "Dashboard", href: "/dashboard" },
			{ label: "Reports" },
		],
	},
	render: ({ items }) => (
		<div style={{ width: "500px" }}>
			<SmartBreadcrumb items={items} />
		</div>
	),
};

export const Collapsed: Story = {
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
		<div>
			<SmartBreadcrumb items={items} />
			<div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
				Automatically collapses when more than 3 items
			</div>
		</div>
	),
};

export const Interactive: Story = {
	render: () => {
		const [currentPath, setCurrentPath] = React.useState("/dashboard/reports");

		const items = React.useMemo(() => {
			const pathSegments = currentPath.split("/").filter(Boolean);
			const breadcrumbs: { label: string; href?: string }[] = [
				{ label: "Home", href: "/" },
			];

			let path = "";
			pathSegments.forEach((segment, idx) => {
				path += `/${segment}`;
				const label = segment.charAt(0).toUpperCase() + segment.slice(1);

				if (idx === pathSegments.length - 1) {
					breadcrumbs.push({ label });
				} else {
					breadcrumbs.push({ label, href: path });
				}
			});

			return breadcrumbs;
		}, [currentPath]);

		return (
			<div style={{ width: "600px" }}>
				<div style={{ marginBottom: "20px" }}>
					<h4>Navigate to test breadcrumb</h4>
					<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
						<button onClick={() => setCurrentPath("/")}>Home</button>
						<button onClick={() => setCurrentPath("/dashboard")}>
							Dashboard
						</button>
						<button onClick={() => setCurrentPath("/dashboard/reports")}>
							Reports
						</button>
						<button
							onClick={() => setCurrentPath("/dashboard/reports/analytics")}
						>
							Analytics
						</button>
						<button onClick={() => setCurrentPath("/products/electronics")}>
							Electronics
						</button>
					</div>
				</div>

				<SmartBreadcrumb items={items} />

				<div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
					Current path: <code>{currentPath}</code>
				</div>
			</div>
		);
	},
};

export const MinimalItems: Story = {
	args: {
		items: [{ label: "Home", href: "/" }, { label: "Dashboard" }],
	},
	render: ({ items }) => (
		<div style={{ width: "500px" }}>
			<SmartBreadcrumb items={items} />
			<div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
				With 2 items, no collapsing occurs
			</div>
		</div>
	),
};

export const SingleItem: Story = {
	args: {
		items: [{ label: "Home" }],
	},
	render: ({ items }) => (
		<div style={{ width: "500px" }}>
			<SmartBreadcrumb items={items} />
		</div>
	),
};
