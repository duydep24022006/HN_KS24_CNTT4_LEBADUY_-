import Button from "react-bootstrap/Button";
import { BookOpen, CirclePlus, Logs, SquarePen, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { v7 as uuid } from "uuid";

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
    console.log(page);
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
        t.id === editId ? { ...t, strEn: task.strEn,strVn:task.strVn } : t
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
      <div className="w-4xl h-[100px] bg-white h-auto rounded-[10px] ">
        <div className=" bg-green-600 w-4xl h-20 flex justify-center items-center rounded-t-[10px]">
          <h1 className="flex text-white text-4xl items-center">
            <BookOpen size={35} /> Quản lý từ vựng
          </h1>
        </div>
        <div className="">
          <div className="flex items-center m-3 text-green-700 font-semibold text-2xl">
            <CirclePlus size={30} className="mr-2" /> Thêm từ mới
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 p-3">
              <Form.Control
                type="text"
                placeholder="Từ tiếng anh"
                name="strEn"
                value={task?.strEn}
                onChange={handleChangeTask}
              />
              <Form.Control
                type="text"
                placeholder="Từ tiếng việt"
                name="strVn"
                value={task?.strVn}
                onChange={handleChangeTask}
              />
              <Button type="submit" variant="success">
                {editId ? "Chỉnh Sửa" : "Thêm"}
              </Button>
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>
      <div className=" bg-white w-4xl h-auto mt-4 p-3 rounded-2xl flex flex-col gap-4">
        <div className=" flex gap-2  text-green-700 font-semibold text-2xl">
          <Logs size={30} className="mt-0.5" /> Danh sách từ vựng
        </div>
        <div className="">
          <table className="w-[100%] h-auto ">
            <thead className="">
              <tr className="bg-gray-200">
                <th>Từ Tiếng Anh </th>
                <th>Nghĩa tiếng việt</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((item) => (
                <tr>
                  <td>{item.strEn}</td>
                  <td>{item.strVn}</td>
                  <td className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      <div className="flex gap-1">
                        <SquarePen size={18} />
                        Sửa
                      </div>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      <div className="flex gap-1">
                        {" "}
                        <Trash2 size={18} />
                        Xóa
                      </div>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <Pagination current={current} onChange={onChange} total={1} />
        </div>
      </div>
    </div>
  );
}
