import React from "react";
import Button from "react-bootstrap/Button";
import { Logs, SquarePen, Trash2 } from "lucide-react";

interface Task {
  id?: string | number;
  strVn?: string;
  strEn?: string;
}

interface TaskListProps {
  tasks: Task[];
  handleEdit: (id: string | number) => void;
  handleRemove: (id: string | number) => void;
}

export default function TaskList({
  tasks,
  handleEdit,
  handleRemove,
}: TaskListProps) {
  return (
    <div className=" bg-white w-4xl h-auto mt-4 p-3 rounded-2xl flex flex-col gap-4">
      <div className=" flex gap-2  text-green-700 font-semibold text-2xl">
        <Logs size={30} className="mt-0.5" /> Danh sách từ vựng
      </div>
      <div>
        <table className="w-[100%] h-auto ">
          <thead>
            <tr className="bg-gray-200">
              <th>Từ Tiếng Anh </th>
              <th>Nghĩa tiếng việt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => (
              <tr key={item.id}>
                <td>{item.strEn}</td>
                <td>{item.strVn}</td>
                <td className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(item.id!)}
                  >
                    <div className="flex gap-1">
                      <SquarePen size={18} />
                      Sửa
                    </div>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(item.id!)}
                  >
                    <div className="flex gap-1">
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
    </div>
  );
}
