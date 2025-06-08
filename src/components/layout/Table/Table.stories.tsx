import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableHeader, TableContent, TableRow } from "./Table";
import { EarningsSummaryItem } from "./EarningsSummaryItem";
import { Button } from "../../ui/button";
import {
	CalendarIcon,
	TrendingUpIcon,
	UsersIcon,
	DollarSignIcon,
	BarChartIcon,
	FileTextIcon,
} from "lucide-react";

const meta = {
	title: "Components/Table/Integration Examples",
	component: Table,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Examples showing Table component integrated with EarningsSummaryItem and other content types.",
			},
		},
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const DashboardExample: Story = {
	render: () => (
		<div className="p-8 bg-gray-50 min-h-screen">
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Main Summary Table */}
				<Table>
					<TableHeader>
						<h1 className="text-2xl font-bold text-gray-900 mr-auto">
							Dashboard Overview
						</h1>
						<Button variant="outline" size="sm">
							<CalendarIcon className="w-4 h-4 mr-2" />
							Last 30 Days
						</Button>
						<Button variant="default" size="sm">
							<FileTextIcon className="w-4 h-4 mr-2" />
							Generate Report
						</Button>
					</TableHeader>

					<TableContent>
						<TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
							<div className="flex gap-8 w-full">
								<EarningsSummaryItem
									label="Total Revenue"
									amount={458920.5}
									subText="+18.2% from last period"
									subTextVariant="success"
									className="flex-1"
								/>
								<EarningsSummaryItem
									label="Total Customers"
									amount="12,847"
									subText="+523 new this month"
									subTextVariant="success"
									className="flex-1"
								/>
								<EarningsSummaryItem
									label="Average Order"
									amount={35.72}
									subText="Target: $40"
									className="flex-1"
								/>
								<EarningsSummaryItem
									label="Conversion Rate"
									amount="3.8%"
									subText="Industry avg: 3.2%"
									subTextVariant="success"
									className="flex-1"
								/>
							</div>
						</TableRow>
					</TableContent>
				</Table>

				{/* Detailed Breakdown Table */}
				<Table>
					<TableHeader>
						<h2 className="text-lg font-semibold text-gray-800 mr-auto flex items-center gap-2">
							<TrendingUpIcon className="w-5 h-5" />
							Performance Breakdown
						</h2>
						<Button variant="ghost" size="sm">
							View All
						</Button>
					</TableHeader>

					<TableContent>
						{/* Product Categories */}
						<TableRow>
							<div className="w-full">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-medium text-gray-700">
										By Product Category
									</h3>
									<span className="text-sm text-gray-500">Last 7 days</span>
								</div>
								<div className="grid grid-cols-4 gap-4">
									<EarningsSummaryItem
										label="Electronics"
										amount={124500}
										subText="1,234 units sold"
									/>
									<EarningsSummaryItem
										label="Clothing"
										amount={87230}
										subText="3,421 units sold"
									/>
									<EarningsSummaryItem
										label="Home & Garden"
										amount={56780}
										subText="892 units sold"
									/>
									<EarningsSummaryItem
										label="Books & Media"
										amount={23410}
										subText="2,109 units sold"
									/>
								</div>
							</div>
						</TableRow>

						{/* Geographic Distribution */}
						<TableRow className="bg-gray-50">
							<div className="w-full">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-medium text-gray-700">By Region</h3>
									<Button variant="ghost" size="sm" className="text-xs">
										<BarChartIcon className="w-3 h-3 mr-1" />
										View Chart
									</Button>
								</div>
								<div className="grid grid-cols-3 gap-4">
									<EarningsSummaryItem
										label="North America"
										amount={234500}
										subText="51% of total"
										subTextVariant="default"
									/>
									<EarningsSummaryItem
										label="Europe"
										amount={156320}
										subText="34% of total"
										subTextVariant="default"
									/>
									<EarningsSummaryItem
										label="Asia Pacific"
										amount={68100}
										subText="15% of total"
										subTextVariant="default"
									/>
								</div>
							</div>
						</TableRow>
					</TableContent>
				</Table>

				{/* Customer Metrics Table */}
				<Table>
					<TableHeader>
						<h2 className="text-lg font-semibold text-gray-800 mr-auto flex items-center gap-2">
							<UsersIcon className="w-5 h-5" />
							Customer Metrics
						</h2>
					</TableHeader>

					<TableContent>
						<TableRow>
							<div className="grid grid-cols-2 gap-8 w-full">
								<div>
									<h3 className="font-medium text-gray-700 mb-3">
										Acquisition
									</h3>
									<div className="grid grid-cols-2 gap-4">
										<EarningsSummaryItem
											label="New Customers"
											amount="2,847"
											subText="This month"
										/>
										<EarningsSummaryItem
											label="Cost per Acquisition"
											amount={24.5}
											subText="-12% from last month"
											subTextVariant="success"
										/>
									</div>
								</div>
								<div>
									<h3 className="font-medium text-gray-700 mb-3">Retention</h3>
									<div className="grid grid-cols-2 gap-4">
										<EarningsSummaryItem
											label="Retention Rate"
											amount="68.5%"
											subText="+2.3% improvement"
											subTextVariant="success"
										/>
										<EarningsSummaryItem
											label="Lifetime Value"
											amount={385.2}
											subText="Per customer"
										/>
									</div>
								</div>
							</div>
						</TableRow>
					</TableContent>
				</Table>
			</div>
		</div>
	),
};

export const CompactDashboard: Story = {
	render: () => (
		<div className="p-6 max-w-4xl mx-auto space-y-4">
			<Table>
				<TableHeader>
					<span className="font-semibold text-gray-900 mr-auto">
						Today's Snapshot
					</span>
					<Button variant="ghost" size="sm">
						Refresh
					</Button>
				</TableHeader>

				<TableContent>
					<TableRow>
						<div className="grid grid-cols-4 gap-4 w-full">
							<EarningsSummaryItem label="Revenue" amount={12450.8} />
							<EarningsSummaryItem label="Orders" amount="342" />
							<EarningsSummaryItem label="Avg. Order" amount={36.4} />
							<EarningsSummaryItem label="Active Users" amount="1,234" />
						</div>
					</TableRow>
				</TableContent>
			</Table>

			<div className="grid grid-cols-2 gap-4">
				<Table>
					<TableHeader>
						<span className="font-medium text-gray-700 text-sm mr-auto">
							Top Products
						</span>
					</TableHeader>
					<TableContent>
						<TableRow>
							<div className="space-y-2 w-full">
								<div className="flex justify-between items-center">
									<span className="text-sm">iPhone 15 Pro</span>
									<span className="font-medium">$45,230</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">MacBook Air M3</span>
									<span className="font-medium">$38,420</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm">AirPods Pro</span>
									<span className="font-medium">$28,190</span>
								</div>
							</div>
						</TableRow>
					</TableContent>
				</Table>

				<Table>
					<TableHeader>
						<span className="font-medium text-gray-700 text-sm mr-auto">
							Quick Stats
						</span>
					</TableHeader>
					<TableContent>
						<TableRow>
							<div className="grid grid-cols-2 gap-3 w-full">
								<EarningsSummaryItem
									label="Pending"
									amount={3420.5}
									className="scale-90 origin-left"
								/>
								<EarningsSummaryItem
									label="Refunds"
									amount={890.0}
									subText="3 orders"
									subTextVariant="danger"
									className="scale-90 origin-left"
								/>
							</div>
						</TableRow>
					</TableContent>
				</Table>
			</div>
		</div>
	),
};

export const RealtimeMonitoring: Story = {
	render: () => {
		// Simulated real-time data
		const currentTime = new Date().toLocaleTimeString();

		return (
			<div className="p-6 bg-gray-900 min-h-screen">
				<div className="max-w-5xl mx-auto">
					<Table className="bg-gray-800">
						<TableHeader className="border-b border-gray-700">
							<h2 className="text-xl font-bold text-white mr-auto flex items-center gap-2">
								<DollarSignIcon className="w-5 h-5 text-green-400" />
								Real-time Monitoring
							</h2>
							<span className="text-sm text-gray-400">{currentTime}</span>
							<Button
								variant="outline"
								size="sm"
								className="text-white border-gray-600"
							>
								Pause Feed
							</Button>
						</TableHeader>

						<TableContent className="bg-gray-800 border-gray-700">
							<TableRow className="bg-gray-750 border-gray-700">
								<div className="grid grid-cols-4 gap-6 w-full">
									<div className="text-white">
										<EarningsSummaryItem
											label="Live Revenue"
											amount={3245.8}
											subText="↑ $125.40 last minute"
											subTextVariant="success"
											className="[&_*]:text-white [&_span:first-child]:text-gray-400"
										/>
									</div>
									<div className="text-white">
										<EarningsSummaryItem
											label="Active Carts"
											amount="423"
											subText="87 checking out"
											className="[&_*]:text-white [&_span:first-child]:text-gray-400"
										/>
									</div>
									<div className="text-white">
										<EarningsSummaryItem
											label="Conversion"
											amount="4.2%"
											subText="↓ 0.3% from avg"
											subTextVariant="danger"
											className="[&_*]:text-white [&_span:first-child]:text-gray-400"
										/>
									</div>
									<div className="text-white">
										<EarningsSummaryItem
											label="Server Load"
											amount="68%"
											subText="All systems normal"
											subTextVariant="success"
											className="[&_*]:text-white [&_span:first-child]:text-gray-400"
										/>
									</div>
								</div>
							</TableRow>

							<TableRow className="border-gray-700">
								<div className="w-full">
									<h3 className="text-sm font-medium text-gray-400 mb-3">
										Recent Transactions
									</h3>
									<div className="space-y-2">
										<div className="flex justify-between items-center text-sm">
											<span className="text-gray-300">
												Order #12847 - Electronics
											</span>
											<span className="text-green-400 font-medium">
												+$1,249.99
											</span>
										</div>
										<div className="flex justify-between items-center text-sm">
											<span className="text-gray-300">
												Order #12846 - Clothing
											</span>
											<span className="text-green-400 font-medium">
												+$89.50
											</span>
										</div>
										<div className="flex justify-between items-center text-sm">
											<span className="text-gray-300">
												Refund #3421 - Books
											</span>
											<span className="text-red-400 font-medium">-$24.99</span>
										</div>
									</div>
								</div>
							</TableRow>
						</TableContent>
					</Table>
				</div>
			</div>
		);
	},
};
