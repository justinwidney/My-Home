import type { TaskData } from "../types";

type TaskProps = {
	/** Composition of the task */
	task: TaskData;
	/** Event to change the task to archived */
	onArchiveTask: (id: string) => void;
	/** Event to change the task to pinned */
	onPinTask: (id: string) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export default function Task({
	task: { id, title, state },
	onArchiveTask,
	onPinTask,
}: TaskProps) {
	return (
		<div className={`list-item ${state}`}>
			<label
				aria-label={`archiveTask-${id}`}
				className="checkbox"
				htmlFor={`archiveTask-${id}`}
			>
				<input
					disabled
					checked={state === "TASK_ARCHIVED"}
					id={`archiveTask-${id}`}
					name="checked"
					type="checkbox"
				/>
				<span
					className="checkbox-custom"
					onClick={() => {
						onArchiveTask(id);
					}}
				/>
			</label>

			<label aria-label={title} className="title" htmlFor={`title-${id}`}>
				<input
					readOnly
					id={`title-${id}`}
					name="title"
					placeholder="Input title"
					type="text"
					value={title}
				/>
			</label>
			{state !== "TASK_ARCHIVED" && (
				<button
					key={`pinTask-${id}`}
					aria-label={`pinTask-${id}`}
					className="pin-button"
					id={`pinTask-${id}`}
					onClick={() => {
						onPinTask(id);
					}}
				>
					<span className={`icon-star`} />
				</button>
			)}
		</div>
	);
}
