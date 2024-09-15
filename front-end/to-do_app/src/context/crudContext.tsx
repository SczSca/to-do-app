import { createContext, useState } from "react";
import {
  ComponentWithChildren,
  TaskElements,
  TaskRequest,
  TaskStructure,
  TaskTimes,
  priorityType,
  statusType,
  order,
  TasksPageResult,
} from "../types";

//TODO: ADJUST TYPE
interface crudContextI {
  createTask: (task: TaskElements) => Promise<void>;
  getData: (page?: number) => Promise<void>;
  getTimeMetrics: () => Promise<void>;
  updateTask: (task: TaskElements) => Promise<void>;
  updateStatusTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<TaskStructure[]>>;
  setTask: React.Dispatch<React.SetStateAction<object | TaskElements>>;
  setTaskRequest: React.Dispatch<React.SetStateAction<TaskRequest>>;
  setPriorOrder: React.Dispatch<React.SetStateAction<order>>;
  setDateOrder: React.Dispatch<React.SetStateAction<order>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  data: TaskStructure[] | object;
  task: TaskElements;
  taskRequest: TaskRequest;
  timeMetrics: TaskTimes;
  totalPages: number;
}

const blankTimeMetrics: TaskTimes = {
  averageTime: "",
  lowPriorTime: "",
  mediumPriorTime: "",
  highPriorTime: "",
};

const baseTaskRequest: TaskRequest = {
  taskText: "blankTask_0X0",
  priority: priorityType.All,
  status: statusType.All,
};

export const crudContext = createContext<crudContextI>(null!);
crudContext.displayName = "crudProvider";

export const CrudProvider = ({ children }: ComponentWithChildren) => {
  const [task, setTask] = useState<TaskElements | object>({});
  const [data, setData] = useState<TaskStructure[]>([]);
  const [timeMetrics, setTimeMetrics] = useState<TaskTimes>(blankTimeMetrics);
  const [priorOrder, setPriorOrder] = useState<order>(order.Asc);
  const [dateOrder, setDateOrder] = useState<order>(order.Asc);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [taskRequest, setTaskRequest] = useState<TaskRequest>(baseTaskRequest);

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
      await handleGetData(currentPage);
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
      await handleGetData(currentPage);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update Task");
    }
  };

  const handleUpdateDone = async (id: number) => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const data = await fetch(`${baseURL}/${id}/change-status`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const res = await data.text();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to change Task status");
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
      await handleGetData();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to created Task");
    }
  };

  const handleGetData = async (page = 1) => {
    try {
      const data = await fetch(
        `${baseURL}/search/prior/${taskRequest.priority}/status/${taskRequest.status}/text/${taskRequest.taskText}/page/${page}/dateAsc/${dateOrder}/priorAsc/${priorOrder}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const res = (await data.json()) as TasksPageResult;

      setData(res.tasksFromPage);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch tasks");
    }
  };

  const handleGetMetrics = async () => {
    try {
      const data = await fetch(`${baseURL}/time`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const res = (await data.json()) as TaskTimes;
      setTimeMetrics(res);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch tasks");
    }
  };

  return (
    <crudContext.Provider
      value={{
        createTask: handleCreation,
        getData: handleGetData,
        getTimeMetrics: handleGetMetrics,
        updateTask: handleUpdate,
        updateStatusTask: handleUpdateDone,
        deleteTask: handleDelete,
        setData,
        setTask,
        setTaskRequest,
        setPriorOrder,
        setDateOrder,
        setCurrentPage,
        currentPage,
        task,
        taskRequest,
        data,
        timeMetrics,
        totalPages,
      }}
    >
      {children}
    </crudContext.Provider>
  );
};
