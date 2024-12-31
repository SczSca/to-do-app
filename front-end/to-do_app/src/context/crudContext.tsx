import { createContext, useState } from "react";
import {
  ComponentWithChildren,
  TaskRequest,
  TaskTimes,
  priorityType,
  statusType,
  order,
  AllData,
  SearchParams,
} from "../types";

//TODO: ADJUST TYPE
interface crudContextI {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  setAllData: React.Dispatch<React.SetStateAction<AllData>>;
  searchParams: SearchParams;
  allData: AllData;
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
  //refactor
  const [allData, setAllData] = useState<AllData>({
    data: [],
    task: {},
    timeMetrics: blankTimeMetrics,
  });

  const [searchParams, setSearchParams] = useState<SearchParams>({
    priorOrder: order.Asc,
    dateOrder: order.Asc,
    currentPage: 1,
    totalPages: 1,
    taskRequest: baseTaskRequest,
  });

  return (
    <crudContext.Provider
      value={{
        setSearchParams,
        setAllData,
        searchParams,
        allData,
      }}
    >
      {children}
    </crudContext.Provider>
  );
};
