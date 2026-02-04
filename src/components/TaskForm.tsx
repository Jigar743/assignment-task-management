import { Task, TaskStatus } from "@/hooks/useTask";
import { FormEvent, useEffect, useState } from "react";

type Props = {
  editingTask: Task | null;
  onSave: (task: Task) => void;
  onCancelEdit: () => void;
};

export function TaskForm({ editingTask, onSave, onCancelEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(
    editingTask?.status ?? "pending",
  );

  useEffect(() => {
    setStatus(editingTask?.status ?? "pending");
    setTitle(editingTask?.name ?? "");
    setDescription(editingTask?.description ?? "");
  }, [editingTask]);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    onSave({
      id: editingTask?.id ?? Date.now(),
      name: title.trim(),
      description: description.trim(),
      status,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-xl shadow-sm border p-5 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {editingTask ? "Update Task" : "Create Task"}
      </h2>

      <input
        className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          {editingTask ? "Update" : "Create"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
