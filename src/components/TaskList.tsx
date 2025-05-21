import useTaskBoxStore from "../store/store";
import type { TaskData } from "../types";

import Task from "./Task";

export default function TaskList(): JSX.Element {
	const tasks = useTaskBoxStore((state) => {
		const tasksInOrder = [
			...state.tasks.filter((t) => t.state === "TASK_PINNED"),
			...state.tasks.filter((t) => t.state !== "TASK_PINNED"),
		];

		const filteredTasks = tasksInOrder.filter(
			(t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
		);
		return filteredTasks;
	});

	const { status } = useTaskBoxStore((state) => ({
		status: state.status,
	}));

	const archiveTask = useTaskBoxStore((state) => state.updateTaskState);

	const pinTask = useTaskBoxStore((state) => state.updateTaskState);

	const LoadingRow = (
		<div className="loading-item">
			<span className="glow-checkbox" />
			<span className="glow-text">
				<span>Loading</span> <span>cool</span> <span>state</span>
			</span>
		</div>
	);
	if (status === "loading") {
		return (
			<div key={"loading"} className="list-items" data-testid="loading">
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
			</div>
		);
	}
	if (tasks.length === 0) {
		return (
			<div key={"empty"} className="list-items" data-testid="empty">
				<div className="wrapper-message">
					<span className="icon-check" />
					<p className="title-message">You have no tasks</p>
					<p className="subtitle-message">Sit back and relax</p>
				</div>
			</div>
		);
	}

	return (
		<div key="success" className="list-items" data-testid="success">
			{tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					onArchiveTask={(id) => {
						archiveTask(id, "TASK_ARCHIVED");
					}}
					onPinTask={(id) => {
						pinTask(id, "TASK_PINNED");
					}}
				/>
			))}
		</div>
	);
}
