import type { Meta, StoryObj } from "@storybook/react";
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";

import {
	Sidebar,
	SidebarProvider,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarTrigger,
	SidebarInset,
	SidebarRail,
} from "./SideBar";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../../ui/collapsible";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../../ui/breadcrumb";

import { Separator } from "../../ui/seperator";

// Mock SearchForm component
const SearchForm = () => (
	<div className="relative px-2">
		<svg
			className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
		<input
			className="w-full rounded-md border border-input bg-background px-8 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
			placeholder="Search documentation..."
			type="search"
		/>
	</div>
);

// Sample data matching your structure
const data = {
	navMain: [
		{
			title: "Getting Started",
			url: "#",
			items: [
				{
					title: "Installation",
					url: "#",
				},
				{
					title: "Project Structure",
					url: "#",
				},
			],
		},
		{
			title: "Building Your Application",
			url: "#",
			items: [
				{
					title: "Routing",
					url: "#",
				},
				{
					title: "Data Fetching",
					url: "#",
					isActive: true,
				},
				{
					title: "Rendering",
					url: "#",
				},
				{
					title: "Caching",
					url: "#",
				},
				{
					title: "Styling",
					url: "#",
				},
				{
					title: "Optimizing",
					url: "#",
				},
				{
					title: "Configuring",
					url: "#",
				},
				{
					title: "Testing",
					url: "#",
				},
				{
					title: "Authentication",
					url: "#",
				},
				{
					title: "Deploying",
					url: "#",
				},
				{
					title: "Upgrading",
					url: "#",
				},
				{
					title: "Examples",
					url: "#",
				},
			],
		},
		{
			title: "API Reference",
			url: "#",
			items: [
				{
					title: "Components",
					url: "#",
				},
				{
					title: "File Conventions",
					url: "#",
				},
				{
					title: "Functions",
					url: "#",
				},
				{
					title: "next.config.js Options",
					url: "#",
				},
				{
					title: "CLI",
					url: "#",
				},
				{
					title: "Edge Runtime",
					url: "#",
				},
			],
		},
		{
			title: "Architecture",
			url: "#",
			items: [
				{
					title: "Accessibility",
					url: "#",
				},
				{
					title: "Fast Refresh",
					url: "#",
				},
				{
					title: "Next.js Compiler",
					url: "#",
				},
				{
					title: "Supported Browsers",
					url: "#",
				},
				{
					title: "Turbopack",
					url: "#",
				},
			],
		},
		{
			title: "Community",
			url: "#",
			items: [
				{
					title: "Contribution Guide",
					url: "#",
				},
			],
		},
	],
};

// AppSidebar component matching your actual implementation
function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<GalleryVerticalEnd className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-medium">Documentation</span>
									<span className="">v1.0.0</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item, index) => (
							<Collapsible
								key={item.title}
								defaultOpen={index === 1}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton>
											{item.title}{" "}
											<Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
											<Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									{item.items?.length ? (
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items.map((item) => (
													<SidebarMenuSubItem key={item.title}>
														<SidebarMenuSubButton
															asChild
															isActive={item.isActive}
														>
															<a href={item.url}>{item.title}</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									) : null}
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

// Page component matching your page.tsx structure
function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">
									Building Your Application
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Fetching</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="aspect-video rounded-xl bg-black/50" />
						<div className="aspect-video rounded-xl bg-black/50" />
						<div className="aspect-video rounded-xl bg-black/50" />
					</div>
					<div className="min-h-[100vh] flex-1 rounded-xl bg-black/50 md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

// Create a minimal wrapper component that doesn't trigger the context error
const SidebarLayout = () => <div />;

const meta = {
	title: "Layout/SidebarLayout",
	component: SidebarLayout, // Use a minimal component that won't trigger errors
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
A collapsible sidebar navigation component with multiple sections and search functionality.

## Usage

The sidebar requires the following components to work together:
- \`SidebarProvider\` - Provides context for all sidebar components
- \`Sidebar\` - The main sidebar container
- \`SidebarInset\` - The main content area next to the sidebar

### Basic Implementation

\`\`\`tsx
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header>
      <SidebarTrigger />
      {/* Your header content */}
    </header>
    <main>
      {/* Your main content */}
    </main>
  </SidebarInset>
</SidebarProvider>
\`\`\`
        `,
			},
		},
	},
} satisfies Meta<typeof SidebarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Full page layout with sidebar
export const Default: Story = {
	name: "Default Layout",
	render: () => <Page />,
};
