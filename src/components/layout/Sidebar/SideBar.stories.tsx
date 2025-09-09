// Sidebar.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import {
	BookOpen,
	Bot,
	Settings2,
	SquareTerminal,
	Zap,
	GalleryVerticalEnd,
	Command,
	Home,
	Users,
	FileText,
	Calendar,
	BarChart,
	Folder,
	Forward,
	Trash2,
} from "lucide-react";

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarTrigger,
	SidebarInset,
} from "./SideBar";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "../../ui/breadcrumb";
import { TeamSwitcher } from "./TeamSwitcher";
import { Navigation } from "./MainNavigation";
import { UserProfile } from "./UserProfile";

// Sample data for the unified navigation
const navigationSections = [
	// Main Navigation Section (no title)
	{
		items: [
			{
				title: "Overview",
				url: "/",
				icon: Home,
				isActive: true,
			},
			{
				title: "Getting Started",
				url: "/docs",
				icon: BookOpen,
				items: [
					{ title: "Installation", url: "/docs/installation" },
					{ title: "Project Structure", url: "/docs/structure" },
					{ title: "Configuration", url: "/docs/config" },
				],
			},
			{
				title: "Playground",
				url: "/playground",
				icon: SquareTerminal,
				items: [
					{ title: "History", url: "/playground/history" },
					{ title: "Starred", url: "/playground/starred" },
					{ title: "Settings", url: "/playground/settings" },
				],
			},
			{
				title: "Models",
				url: "/models",
				icon: Bot,
				items: [
					{ title: "Genesis", url: "/models/genesis" },
					{ title: "Explorer", url: "/models/explorer" },
					{ title: "Quantum", url: "/models/quantum" },
				],
			},
			{
				title: "Documentation",
				url: "/documentation",
				icon: FileText,
				items: [
					{ title: "Introduction", url: "/docs/intro" },
					{ title: "API Reference", url: "/docs/api" },
					{ title: "Examples", url: "/docs/examples" },
					{ title: "Changelog", url: "/docs/changelog" },
				],
			},
			{
				title: "Settings",
				url: "/settings",
				icon: Settings2,
				items: [
					{ title: "General", url: "/settings/general" },
					{ title: "Team", url: "/settings/team" },
					{ title: "Billing", url: "/settings/billing" },
					{ title: "Limits", url: "/settings/limits" },
				],
			},
		],
	},
	// Projects Section
	{
		title: "Projects",
		items: [
			{
				title: "Design Engineering",
				url: "/projects/design",
				icon: Zap,
				actions: [
					{
						label: "View Project",
						icon: Folder,
						onClick: (): void => {
							console.log("View Design Engineering");
						},
					},
					{
						label: "Share Project",
						icon: Forward,
						onClick: (): void => {
							console.log("Share Design Engineering");
						},
					},
					{
						label: "Delete Project",
						icon: Trash2,
						onClick: (): void => {
							if (confirm("Are you sure you want to delete this project?")) {
								console.log("Deleting Design Engineering project...");
							}
						},
						variant: "destructive" as const,
					},
				],
			},
			{
				title: "Sales & Marketing",
				url: "/projects/sales",
				icon: BarChart,
				actions: [
					{
						label: "View Project",
						icon: Folder,
						onClick: (): void => {
							console.log("View Sales & Marketing");
						},
					},
					{
						label: "Share Project",
						icon: Forward,
						onClick: (): void => {
							console.log("Share Sales & Marketing");
						},
					},
					{
						label: "Delete Project",
						icon: Trash2,
						onClick: (): void => {
							console.log("Delete Sales & Marketing project");
						},
						variant: "destructive" as const,
					},
				],
			},
			{
				title: "Travel App",
				url: "/projects/travel",
				icon: Calendar,
				actions: [
					{
						label: "View Project",
						icon: Folder,
						onClick: (): void => {
							console.log("View Travel App");
						},
					},
					{
						label: "Share Project",
						icon: Forward,
						onClick: (): void => {
							console.log("Share Travel App");
						},
					},
					{
						label: "Delete Project",
						icon: Trash2,
						onClick: (): void => {
							console.log("Delete Travel App project");
						},
						variant: "destructive" as const,
					},
				],
			},
		],
	},
];

// Sample user and team data
const sampleData = {
	user: {
		name: "John Doe",
		email: "john@example.com",
		avatar: "/avatars/john-doe.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp",
			logo: Command,
			plan: "Startup",
		},
	],
};

// Complete Sidebar Implementation with unified navigation
function CompleteSidebar(): JSX.Element {
	return (
		<Sidebar className="border-r">
			<SidebarHeader>
				<TeamSwitcher teams={sampleData.teams} />
			</SidebarHeader>

			<SidebarContent>
				<Navigation sections={navigationSections} />
			</SidebarContent>

			<SidebarFooter>
				<UserProfile user={sampleData.user} />
			</SidebarFooter>
		</Sidebar>
	);
}

// Main content area
function MainContent({
	title,
	description,
}: {
	title: string;
	description: string;
}): JSX.Element {
	return (
		<SidebarInset>
			<div className="flex h-[70px] shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<div className="h-4 w-px bg-border mx-2" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>{title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			<div className="p-8">
				<h1 className="text-3xl font-bold mb-4">{title}</h1>
				<p className="text-muted-foreground mb-8">{description}</p>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<div className="p-6 bg-card rounded-lg border">
						<h3 className="font-medium mb-2">Unified Navigation</h3>
						<p className="text-sm text-muted-foreground">
							Single component handles both expandable navigation items and
							items with dropdown actions.
						</p>
					</div>
					<div className="p-6 bg-card rounded-lg border">
						<h3 className="font-medium mb-2">Section Grouping</h3>
						<p className="text-sm text-muted-foreground">
							Navigation items are organized into sections with optional titles
							for clear separation.
						</p>
					</div>
					<div className="p-6 bg-card rounded-lg border">
						<h3 className="font-medium mb-2">Contextual Actions</h3>
						<p className="text-sm text-muted-foreground">
							Project items show dropdown menus with contextual actions like
							view, share, and delete.
						</p>
					</div>
					<div className="p-6 bg-card rounded-lg border">
						<h3 className="font-medium mb-2">Smooth Transitions</h3>
						<p className="text-sm text-muted-foreground">
							Hover near the sidebar to see smooth 200ms transitions with
							consistent icon positioning.
						</p>
					</div>
					<div className="p-6 bg-card rounded-lg border">
						<h3 className="font-medium mb-2">Expandable Sections</h3>
						<p className="text-sm text-muted-foreground">
							Main navigation items expand to show sub-items with staggered
							reveal animations.
						</p>
					</div>
					<div className="p-6 bg-card rounded-lg border">
						<h3 className="font-medium mb-2">Team & Profile</h3>
						<p className="text-sm text-muted-foreground">
							Header and footer components for team switching and user profile
							management.
						</p>
					</div>
				</div>
			</div>
		</SidebarInset>
	);
}

// Complete demo layout
function DemoLayout(): JSX.Element {
	return (
		<div className="flex h-screen bg-background">
			<CompleteSidebar />
			<MainContent
				description="Move your mouse towards the sidebar to experience smooth hover interactions. This unified navigation system handles both expandable menu items and items with contextual actions."
				title="Unified Navigation Sidebar"
			/>
		</div>
	);
}

// Storybook configuration
const meta: Meta = {
	title: "Layout/UnifiedNavigation",
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
A unified navigation system that handles both expandable navigation items and items with contextual dropdown actions.

## Key Features

- **Unified Component**: Single Navigation component handles both expandable items and dropdown actions
- **Section Grouping**: Organize navigation items into sections with optional titles
- **Flexible Actions**: Items can have either expandable children or dropdown actions (not both)
- **Smooth Animations**: 200ms cubic-bezier transitions with staggered child reveals
- **Clean Architecture**: Simple prop-based structure without complex contexts

## Navigation Data Structure

\`\`\`tsx
const sections = [
  // Main navigation (no title)
  {
    items: [
      {
        title: "Overview",
        url: "/",
        icon: Home,
        isActive: true,
      },
      {
        title: "Getting Started",
        url: "/docs", 
        icon: BookOpen,
        items: [  // Expandable children
          { title: "Installation", url: "/docs/installation" }
        ],
      }
    ],
  },
  // Projects section  
  {
    title: "Projects",
    items: [
      {
        title: "Design Engineering",
        url: "/projects/design",
        icon: Zap,
        actions: [  // Dropdown actions
          {
            label: "View Project",
            icon: Folder,
            onClick: () => console.log("View project"),
          }
        ],
      }
    ],
  }
];
\`\`\`

## Usage

\`\`\`tsx
<Sidebar>
  <SidebarHeader>
    <TeamSwitcher teams={teams} />
  </SidebarHeader>
  <SidebarContent>
    <Navigation sections={navigationSections} />
  </SidebarContent>
  <SidebarFooter>
    <UserProfile user={userData} />
  </SidebarFooter>
</Sidebar>
\`\`\`
        `,
			},
		},
	},
};

export default meta;
type Story = StoryObj;

// Main stories
export const Complete: Story = {
	name: "Complete Unified Sidebar",
	render: () => <DemoLayout />,
	parameters: {
		docs: {
			description: {
				story:
					"A complete sidebar with unified navigation handling both expandable menu items and items with dropdown actions. Hover near the sidebar to see the smooth expansion animation.",
			},
		},
	},
};

export const NavigationOnly: Story = {
	name: "Navigation Component Only",
	render: () => (
		<div className="flex h-screen bg-background">
			<Sidebar>
				<SidebarContent>
					<Navigation sections={navigationSections} />
				</SidebarContent>
			</Sidebar>
			<MainContent
				description="Showcasing the unified navigation component with both expandable sections and dropdown actions."
				title="Unified Navigation"
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Isolated view of the unified navigation component showing both expandable menu items and items with contextual actions.",
			},
		},
	},
};

export const MainNavigationOnly: Story = {
	name: "Main Navigation Only",
	render: () => {
		const mainNavOnly = [
			{
				items: [
					{
						title: "Overview",
						url: "/",
						icon: Home,
						isActive: true,
					},
					{
						title: "Getting Started",
						url: "/docs",
						icon: BookOpen,
						items: [
							{ title: "Installation", url: "/docs/installation" },
							{ title: "Project Structure", url: "/docs/structure" },
						],
					},
					{
						title: "Settings",
						url: "/settings",
						icon: Settings2,
						items: [
							{ title: "General", url: "/settings/general" },
							{ title: "Team", url: "/settings/team" },
						],
					},
				],
			},
		];

		return (
			<div className="flex h-screen bg-background">
				<Sidebar>
					<SidebarContent>
						<Navigation sections={mainNavOnly} />
					</SidebarContent>
				</Sidebar>
				<MainContent
					description="Just the main navigation section with expandable menu items."
					title="Main Navigation"
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Only the main navigation section showing expandable menu items without the projects section.",
			},
		},
	},
};

export const ProjectsOnly: Story = {
	name: "Projects Section Only",
	render: () => {
		const projectsOnly = [
			{
				title: "Projects",
				items: navigationSections[1]?.items ?? [], // Get projects from the main data
			},
		];

		return (
			<div className="flex h-screen bg-background">
				<Sidebar>
					<SidebarContent>
						<Navigation sections={projectsOnly} />
					</SidebarContent>
				</Sidebar>
				<MainContent
					description="Just the projects section with dropdown actions for each project."
					title="Projects Navigation"
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Only the projects section showing items with contextual dropdown actions.",
			},
		},
	},
};

export const MinimalSidebar: Story = {
	name: "Minimal Setup",
	render: () => {
		const minimalSections = [
			{
				items: [
					{ title: "Dashboard", url: "/", icon: Home, isActive: true },
					{ title: "Users", url: "/users", icon: Users },
					{ title: "Settings", url: "/settings", icon: Settings2 },
				],
			},
		];

		return (
			<div className="flex h-screen bg-background">
				<Sidebar>
					<SidebarContent>
						<Navigation sections={minimalSections} />
					</SidebarContent>
				</Sidebar>
				<MainContent
					description="A basic sidebar setup with just essential navigation items."
					title="Minimal Sidebar"
				/>
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"A minimal sidebar implementation showing how simple it is to get started with just basic navigation items.",
			},
		},
	},
};
