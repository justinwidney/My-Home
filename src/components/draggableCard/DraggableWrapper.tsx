import { type ReactNode, useEffect, useRef } from "react";
import { GripVertical } from "lucide-react";
import {
	draggable as _draggable,
	dropTargetForElements as _dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export interface DragData {
	type: string;
	id: string;
	[key: string]: unknown;
}

// define the shape once
interface DraggableOptions<T = unknown> {
	element: HTMLElement;
	dragHandle?: HTMLElement;
	getInitialData: () => T;
}

// cast the untyped import to a typed signature
const draggable = _draggable as (
	options: DraggableOptions<DragData>
) => () => void;

const dropTargetForElements = _dropTargetForElements as <T = unknown>(options: {
	element: HTMLElement;
	// eslint-disable-next-line no-use-before-define
	getData: () => T;
	// eslint-disable-next-line no-use-before-define
	canDrop?: (event_: { source: { data: T } }) => boolean;
}) => () => void;

export interface DropData {
	type: string;
	id: string;
	[key: string]: unknown;
}

export interface DraggableWrapperProps {
	children: ReactNode;
	dragData: DragData;
	dropData?: DropData;
	canDrop?: (dragData: DragData) => boolean;
	isDragging?: boolean;
	isDropTarget?: boolean;
	showDragHandle?: boolean;
	dragHandlePosition?: "left" | "right" | "top";
	className?: string;
	dragHandleClassName?: string;
}

/**
 * Reusable draggable wrapper component
 * Handles all drag and drop logic, accepts any children
 */
export const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
	children,
	dragData,
	dropData,
	canDrop,
	isDragging = false,
	isDropTarget = false,
	showDragHandle = true,
	dragHandlePosition = "left",
	className = "",
	dragHandleClassName = "",
}) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const dragHandleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = elementRef.current;
		const handle = dragHandleRef.current;

		if (!element) return;

		// Setup draggable only if element (and dragHandle if needed) are not null
		let draggableCleanup: (() => void) | undefined;
		if (!showDragHandle || handle) {
			draggableCleanup = draggable({
				element,
				dragHandle: showDragHandle ? handle! : element,
				getInitialData: () => dragData,
			}) as () => void; // ← cast from unknown → () => void
		}

		// Setup drop target if dropData is provided
		let dropTargetCleanup: (() => void) | undefined;
		if (dropData) {
			dropTargetCleanup = dropTargetForElements({
				element,
				getData: () => dropData,
				canDrop: canDrop
					? ({ source }): boolean => canDrop(source.data as DragData)
					: undefined,
			}) as () => void; // ← same here
		}
		return (): void => {
			draggableCleanup?.();
			dropTargetCleanup?.();
		};
	}, [dragData, dropData, canDrop, showDragHandle]);

	const getDragHandleClasses = (): string => {
		const baseClasses =
			"cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-opacity";
		const positionClasses = {
			left: "order-first",
			right: "order-last ml-auto",
			top: "absolute top-2 left-2 z-10",
		};

		return `${baseClasses} ${positionClasses[dragHandlePosition]} ${dragHandleClassName}`;
	};

	const getWrapperClasses = (): string => {
		const baseClasses = "transition-all";
		const stateClasses = [];

		if (isDragging) {
			stateClasses.push("opacity-50 rotate-1 scale-105");
		}

		if (isDropTarget) {
			stateClasses.push("ring-2 ring-blue-400 bg-blue-50");
		}

		return `${baseClasses} ${stateClasses.join(" ")} ${className}`;
	};

	const renderDragHandle = (): React.ReactNode => {
		if (!showDragHandle) return null;

		return (
			<div
				ref={dragHandleRef}
				aria-label="Drag handle"
				className={getDragHandleClasses()}
			>
				<GripVertical className="w-4 h-4 text-gray-400" />
			</div>
		);
	};

	return (
		<div ref={elementRef} className={getWrapperClasses()}>
			{dragHandlePosition === "top" && renderDragHandle()}

			<div
				className={`flex items-center ${dragHandlePosition !== "top" ? "gap-2" : ""}`}
			>
				{dragHandlePosition === "left" && renderDragHandle()}

				<div className="flex-1">{children}</div>

				{dragHandlePosition === "right" && renderDragHandle()}
			</div>
		</div>
	);
};
