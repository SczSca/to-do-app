import { createContext, useState } from "react";
import {
  ComponentWithChildren,
  TaskElements,
  TaskRequest,
  TaskStructure,
  priorityType,
  statusType,
} from "../types";

//TODO: ADJUST TYPE
interface crudContextI {
  createTask: (task: TaskElements) => Promise<void>;
  getData: () => Promise<void>;
  updateTask: (task: TaskElements) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  data: TaskStructure[] | object;
  setData: React.Dispatch<React.SetStateAction<TaskStructure[]>>;
  task: TaskElements;
  setTask: React.Dispatch<React.SetStateAction<object | TaskElements>>;
}

export const crudContext = createContext<crudContextI>(null!);
crudContext.displayName = "crudProvider";

export const CrudProvider = ({ children }: ComponentWithChildren) => {
  const [task, setTask] = useState<TaskElements | object>({});
  const [data, setData] = useState<TaskStructure[]>([]);

  const baseURL = "http://localhost:9090/api/tasks";

  const handleCreation = async (task: TaskElements) => {
    try {
      const data = await fetch(baseURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const res = await data.text();
      console.log(res);
      await getData();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to created Task");
    }
  };

  const handleUpdate = async (task: TaskElements) => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const data = await fetch(`${baseURL}/${task.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const res = await data.text();
      console.log(res);
      await getData();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to created Task");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const data = await fetch(`${baseURL}/${id.toString()}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          //   "Content-Type": "application/json",
        },
      });
      const res = await data.text();
      console.log(res);
      await getData();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to created Task");
    }
  };

  const getData = async () => {
    const taskRequest: TaskRequest = {
      taskText: "blankTask_0X0",
      priority: priorityType.All,
      status: statusType.All,
    };

    try {
      const data = await fetch(
        `${baseURL}/search/prior/${taskRequest.priority}/status/${taskRequest.status}/text/${taskRequest.taskText}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const res = (await data.json()) as TaskStructure[];
      setData(res);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch tasks");
    }
  };

  return (
    <crudContext.Provider
      value={{
        createTask: handleCreation,
        getData,
        updateTask: handleUpdate,
        deleteTask: handleDelete,
        setData,
        setTask,
        task,
        data,
      }}
    >
      {children}
    </crudContext.Provider>
  );
};
