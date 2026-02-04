"use client";

import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { Task, TaskStatus, useTasks } from "@/hooks/useTask";
import Head from "next/head";
import { useState } from "react";

export default function TaskPage() {
  const { tasks, createTask, updateTask, deleteTask, hydrated } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const handleSave = (task: Task) => {
    if (editingTask) {
      updateTask(task);
    } else {
      createTask(task);
    }
    setEditingTask(null);
  };

  const handleStatusChange = (updatedTask: Task) => {
    updateTask(updatedTask);
  };

  return (
    <>
      <Head>
        <title>Task Management App</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto">
          <TaskForm
            editingTask={editingTask}
            onSave={handleSave}
            onCancelEdit={() => setEditingTask(null)}
          />

          <div className="flex gap-2 mt-6">
            {["all", "pending", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as "all" | TaskStatus)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            hydrated={hydrated}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </>
  );
}
