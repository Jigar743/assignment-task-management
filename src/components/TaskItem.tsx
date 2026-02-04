"use client";

import { Task } from "@/hooks/useTask";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (task: Task) => void;
};

export function TaskItem({ task, onEdit, onDelete, onStatusChange }: Props) {
  return (
    <li className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-start">
      <div>
        <h4
          className={`font-medium ${
            task.status === "completed"
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {task.name}
        </h4>
        <span className="text-sm text-gray-500 mt-1">{task.description}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>

        <button
          onClick={() =>
            onStatusChange({
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            })
          }
          className={`whitespace-nowrap text-sm px-3 py-1 rounded-md ${
            task.status === "pending"
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
          }`}
        >
          {task.status === "pending" ? "Mark as completed" : "Mark as pending"}
        </button>
      </div>
    </li>
  );
}
