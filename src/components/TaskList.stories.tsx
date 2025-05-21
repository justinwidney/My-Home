import type { Meta, StoryObj } from "@storybook/react";

import TaskList from "./TaskList";

import * as TaskStories from "./Task.stories";
import type { TaskData } from "../types";
import useTaskBoxStore from "../store/store";

export const MockedState = {
	tasks: [
		{ ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
		{ ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
		{ ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
		{ ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
		{ ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
		{ ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
	] as Array<TaskData>,
	status: "idle" as "idle" | "loading" | "failed",
	error: null,
};

const MockStoreProvider = ({
	taskboxState,
	children,
}: {
	taskboxState: typeof MockedState;
	children: React.ReactNode;
}) => {
	useTaskBoxStore.setState(taskboxState); // Set Zustand store state directly
	return <>{children}</>;
};

const meta = {
	component: TaskList,
	title: "TaskList",
	decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
	tags: ["autodocs"],
	excludeStories: /.*MockedState$/,
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	decorators: [
		(story: () => JSX.Element): JSX.Element => (
			<MockStoreProvider taskboxState={MockedState}>
				{story()}
			</MockStoreProvider>
		),
	],
};

export const WithPinnedTasks: Story = {
	decorators: [
		(story: () => JSX.Element): JSX.Element => {
			const pinnedTasks: Array<TaskData> = [
				...MockedState.tasks.slice(0, 5),
				{ id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
			];

			return (
				<MockStoreProvider
					taskboxState={{ ...MockedState, tasks: pinnedTasks }}
				>
					{story()}
				</MockStoreProvider>
			);
		},
	],
};

export const Loading: Story = {
	decorators: [
		(story: () => JSX.Element): JSX.Element => (
			<MockStoreProvider
				taskboxState={{
					...MockedState,
					status: "loading",
				}}
			>
				{story()}
			</MockStoreProvider>
		),
	],
};

export const Empty: Story = {
	decorators: [
		(story: () => JSX.Element): JSX.Element => (
			<MockStoreProvider
				taskboxState={{
					...MockedState,
					tasks: [],
				}}
			>
				{story()}
			</MockStoreProvider>
		),
	],
};
