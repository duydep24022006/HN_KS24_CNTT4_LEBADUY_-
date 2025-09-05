import React from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { CirclePlus } from "lucide-react";

interface Task {
  id?: string | number;
  strVn?: string;
  strEn?: string;
}

interface TaskFormProps {
  task?: Task;
  error: string;
  editId: string | number | null;
  handleSubmit: (event: React.FormEvent) => void;
  handleChangeTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskForm({
  task,
  error,
  editId,
  handleSubmit,
  handleChangeTask,
}: TaskFormProps) {
  return (
    <div>
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
  );
}
