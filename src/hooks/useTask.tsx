"use client";

import { useEffect, useState } from "react";

export type TaskStatus = "pending" | "completed";

export type Task = {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    setTasks(stored);
    setHydrated(true);
  }, []);

  const persist = (updated: Task[]) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return {
    tasks,
    hydrated,
    createTask: (task: Task) => persist([...tasks, task]),
    updateTask: (task: Task) =>
      persist(tasks.map((t) => (t.id === task.id ? task : t))),
    deleteTask: (id: number) => persist(tasks.filter((t) => t.id !== id)),
  };
}
