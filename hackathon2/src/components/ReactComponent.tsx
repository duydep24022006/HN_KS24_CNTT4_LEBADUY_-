import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { v7 as uuid } from "uuid";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface Task {
  id?: string | number;
  strVn?: string;
  strEn?: string;
}

export default function ReactComponent() {
  const [current, setCurrent] = useState(1);
  const [task, setTask] = useState<Task>();
  const [error, setError] = useState<string>("");
  const [editId, setEditId] = useState<string | number | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskLocals = localStorage.getItem("tasks");
    return taskLocals ? JSON.parse(taskLocals) : [];
  });

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setError(" không được để trống");
      return task;
    } else {
      setError("");
      const { name, value } = event.target;
      setTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!task) {
      setError("không được để trống");
      return task;
    }
    setError("");
    if (editId) {
      const updateTasks = tasks.map((t) =>
        t.id === editId ? { ...t, strEn: task.strEn, strVn: task.strVn } : t
      );
      setTasks(updateTasks);
      setEditId(null);
    } else {
      const idFind = tasks.find(
        (item) => item.strEn?.toUpperCase() === task.strEn?.toUpperCase()
      );
      if (idFind) {
        setError("Tiếng anh không đc trùng");
        return task;
      }
      const newTask: Task = {
        id: uuid(),
        strEn: task.strEn,
        strVn: task.strVn,
      };
      setTasks([...tasks, newTask]);
    }
    setTask({ strEn: "", strVn: "" });
  };

  const handleRemove = (id: number | string) => {
    const deleteTtasks = tasks.filter((task: Task) => task.id !== id);
    setTasks(deleteTtasks);
  };

  const handleEdit = (id: string | number) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTask({ strEn: taskToEdit.strEn, strVn: taskToEdit.strVn });
      setEditId(taskToEdit.id);
    }
  };

  return (
    <div className="bg-blue-100 w-screen h-screen p-2 flex justify-center items-center  flex-col">
      <div className="w-4xl bg-white h-auto rounded-[10px] ">
        <div className=" bg-green-600 w-4xl h-20 flex justify-center items-center rounded-t-[10px]">
          <h1 className="flex text-white text-4xl items-center">
            <BookOpen size={35} /> Quản lý từ vựng
          </h1>
        </div>
        <TaskForm
          task={task}
          error={error}
          editId={editId}
          handleSubmit={handleSubmit}
          handleChangeTask={handleChangeTask}
        />
      </div>

      <TaskList
        tasks={tasks}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
      />

      <div className="flex justify-center mt-2">
        <Pagination current={current} onChange={onChange} total={1} />
      </div>
    </div>
  );
}
