import { Button, Input } from "antd";
import Item from "antd/es/list/Item";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { v7 as uuid } from "uuid";

interface Task {
  id: number | string;
  name: string;
  isCompleted: boolean;
}

export default function LT() {
  const [editId, setEditId] = useState<string | number | null>(null);
  const [task, setTask] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskLocals = localStorage.getItem("tasks");
    return taskLocals ? JSON.parse(taskLocals) : [];
  });

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setError("Tên công việc không được để trống");
      return;
    } else {
      setError("");
      setTask(event.target.value);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!task) {
      setError("Tên công việc không được để trống");
      return task;
    }
    setError("");
    if (editId) {
      const updateTasks = tasks.map((t) =>
        t.id === editId ? { ...t, name: task } : t
      );
      setTasks(updateTasks);
      setEditId(null);
    } else {
      const newTask: Task = {
        id: uuid(),
        name: task,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
    }
    setTask("");
  };
  useEffect(() => {
    const completedCount = tasks.reduce((n, item) => {
      return item.isCompleted ? n + 1 : n;
    }, 0);
    setCount(completedCount);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleChangeStatus = (id: number | string) => {
    const updateTasks = tasks.map((task: Task) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTasks(updateTasks);
  };
  const handleEdit = (id: string | number) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.name);
      setEditId(taskToEdit.id);
    }
  };
  const handleRemove = (id: number | string) => {
    const deleteTtasks = tasks.filter((task: Task) => task.id !== id);
    setTasks(deleteTtasks);
  };

  return (
    <>
      <div className="h-screen ml-2 mr-2 flex justify-center items-center">
        <div className="w-[1000px] border border-[#dadada] p-6 rounded-lg shadow-sm">
          <h3 className="text-center text-[24px] font-semibold mb-6">
            Danh sách công việc
          </h3>
          <form onSubmit={handleSubmit} className="flex gap-5 mb-3">
            <Input
              value={task}
              onChange={handleChangeTask}
              placeholder="Nhập tên công việc"
            />
            <Button htmlType="submit" type="primary">
              {editId ? "Chỉnh Sửa" : "Thêm"}
            </Button>
          </form>

          {error && (
            <p className="mb-6 text-red-600 text-[14px]">
              Tên công việc không được để trống
            </p>
          )}

          <ul className="mb-6">
            {tasks.map((task: Task) => (
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <input
                    onChange={() => handleChangeStatus(task.id)}
                    type="checkbox"
                    checked={task.isCompleted}
                  />
                  {task.isCompleted ? (
                    <s>{task.name}</s>
                  ) : (
                    <span>{task.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Pencil
                    size={18}
                    className="text-orange-400 hover:text-orange-600 cursor-pointer"
                    onClick={() => handleEdit(task.id)}
                  />
                  <Trash2
                    size={18}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => handleRemove(task.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div>
            <span>Công việc đã hoàn thành: </span> <span>{count}</span> /{" "}
            <span>{tasks.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}
