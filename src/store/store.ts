import type { TaskData } from "../types";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TaskBoxState {
	tasks: Array<TaskData>;
	status: "idle" | "loading" | "failed";
	error: string | null;
}

interface TaskBoxActions {
	updateTaskState: (id: string, newTaskState: TaskData["state"]) => void;
	setStatus: (status: "idle" | "loading" | "failed") => void;
	setError: (error: string | null) => void;
}

const defaultTasks: Array<TaskData> = [
	{ id: "1", title: "Something", state: "TASK_INBOX" },
	{ id: "2", title: "Something more", state: "TASK_INBOX" },
	{ id: "3", title: "Something else", state: "TASK_INBOX" },
	{ id: "4", title: "Something again", state: "TASK_INBOX" },
];

// Create the Zustand store using devtools middleware for Redux DevTools support

// Create the Zustand store without middleware
const useTaskBoxStore = create<TaskBoxState & TaskBoxActions>((set) => ({
	tasks: defaultTasks,
	status: "idle",
	error: null,
	// Action to update task state
	updateTaskState: (id, newTaskState): void => {
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === id ? { ...task, state: newTaskState } : task
			),
		}));
	},
	// Action to set the status
	setStatus: (status): void => {
		set({ status });
	},
	// Action to set the error
	setError: (error): void => {
		set({ error });
	},
}));

type SearchState = {
	isOpen: boolean;
	setOpen: (open: boolean) => void; // <- boolean setter
	toggleOpen: () => void; // optional
};

export const useSearchStore = create<SearchState>((set) => ({
	isOpen: false,
	setOpen: (open) => set({ isOpen: open }),
	toggleOpen: () => set((s) => ({ isOpen: !s.isOpen })),
}));

export default useTaskBoxStore;
