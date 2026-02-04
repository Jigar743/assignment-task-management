"use client";

import { Task } from "@/hooks/useTask";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  hydrated: boolean;
  onStatusChange: (task: Task) => void;
};

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  hydrated,
  onStatusChange,
}: Props) {
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading tasks...
      </div>
    );
  }

  if (!tasks.length) {
    return <p className="text-center text-gray-400 mt-10">No tasks yet 👀</p>;
  }

  return (
    <ul className="mt-6 space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}
