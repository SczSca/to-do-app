import { env } from "../env/envConfig";
import {
  AllData,
  SearchParams,
  TaskElements,
  TaskRequest,
  TasksPageResult,
  TaskTimes,
} from "../types";
import { secureFetch } from "./ApiCalls";

const headers = {
  Accept: "application/json",
};
const api = secureFetch(env.backendUrl, headers);

export const createTask = async (
  task: TaskElements,
  queryParams: Record<string, string | number | boolean | null | undefined> = {}
): Promise<Response> => {
  try {
    const taskData: Record<string, string | number | Date | null | undefined> =
      { ...task };
    const response = await api.securePost("", taskData, {}, queryParams);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorMessage = `Failed to create task. Status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return response;
  } catch (error) {
    console.error("Error in createTask:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const updateTask = async (
  task: TaskElements,
  queryParams: Record<string, string | number | boolean | null | undefined> = {}
): Promise<Response> => {
  try {
    const taskData: Record<string, string | number | Date | null | undefined> =
      { ...task };
    const response = await api.securePut(
      `/${task.id}`,
      taskData,
      {},
      queryParams
    );
    if (!response.ok) {
      const errorMessage = `Failed to update task. Status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error("Error in updateTask:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const patchStatusTask = async (
  id: number,
  queryParams: Record<string, string | number | boolean | null | undefined> = {}
): Promise<Response> => {
  try {
    const response = await api.securePatch(
      `/${id}/status`,
      {},
      {},
      queryParams
    );

    if (!response.ok) {
      const errorMessage = `Failed to update task status. Status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error("Error in updateStatusTask:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const deleteTask = async (
  id: number,
  queryParams: Record<string, string | number | boolean | null | undefined> = {}
): Promise<Response> => {
  try {
    const response = await api.secureDelete(`/${id}`, {}, queryParams);

    if (!response.ok) {
      const errorMessage = `Failed to delete task. Status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return response;
  } catch (error) {
    console.error("Error in deleteTask:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const getData = async (
  taskRequest: TaskRequest,
  page: number,
  dateOrder: string,
  priorOrder: string,
  queryParams: Record<string, string | number | boolean | null | undefined> = {}
): Promise<TasksPageResult> => {
  const params = {
    prior: taskRequest.priority,
    status: taskRequest.status,
    text: taskRequest.taskText,
    page: page.toString(),
    dateOrder,
    priorOrder,
    ...queryParams, // Adding any additional query parameters
  };

  try {
    const response = await api.secureGet("/search", {}, params);

    return response; // Assuming the response matches your ApiResponse type
  } catch (error) {
    console.error("Error in getData:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const getMetrics = async (
  queryParams: Record<string, string | number | boolean | null | undefined> = {}
): Promise<TaskTimes> => {
  try {
    const response = await api.secureGet("/time", {}, queryParams);

    return response; // Assuming the response matches your ApiResponse type
  } catch (error) {
    console.error("Error in getMetrics:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const fetchTasks = async (
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>,
  page: number = searchParams.currentPage //is this possible/
) => {
  try {
    const responseData = await getData(
      searchParams.taskRequest,
      page,
      searchParams.dateOrder,
      searchParams.priorOrder
    );

    setAllData((prevState) => ({
      ...prevState,
      data: responseData.tasksFromPage,
    }));
    setSearchParams((prevState) => ({
      ...prevState,
      totalPages: responseData.totalPages,
      currentPage: responseData.page,
    }));
  } catch (error) {
    console.error("Error in getData:", error);
    throw error;
  }
};

export const createTaskAndFetchAll = async (
  task: TaskElements,
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
) => {
  try {
    await createTask(task);
    await fetchTasks(searchParams, setAllData, setSearchParams);
  } catch (error) {
    console.error("Error in fetchTaskCreation:", error);
    throw error;
  }
};

export const updateTaskAndFetchAll = async (
  task: TaskElements,
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
) => {
  try {
    await updateTask(task);
    await fetchTasks(searchParams, setAllData, setSearchParams);

    // Clear the task object after updating
    setAllData((prevState) => ({
      ...prevState,
      task: {},
    }));
  } catch (error) {
    console.error("Error in fetchTaskUpdate:", error);
    throw error;
  }
};

export const deleteTaskAndFetchAll = async (
  id: number,
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
) => {
  try {
    await deleteTask(id);
    await fetchTasks(searchParams, setAllData, setSearchParams);

    // Clear the task object after updating
    setAllData((prevState) => ({
      ...prevState,
      task: {},
    }));
  } catch (error) {
    console.error("Error in fetchTaskDeletion:", error);
    throw error;
  }
};

export const fetchMetrics = async (
  setAllData: React.Dispatch<React.SetStateAction<AllData>>
) => {
  try {
    const timeMetrics = await getMetrics();

    setAllData((prevState) => ({
      ...prevState,
      timeMetrics,
    }));
  } catch (error) {
    console.error("Error in fetchMetrics:", error);
    throw error;
  }
};

// export const apiService = {
//   createTask: async (task: TaskElements) => {
//     try {
//       const response = await fetch(`${env.backendUrl}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(task),
//       });

//       // Check if the response is OK (status code 200-299)
//       if (!response.ok) {
//         const errorMessage = `Failed to create task. Status: ${response.status} - ${response.statusText}`;
//         throw new Error(errorMessage);
//       }

//       return response.json(); // Assuming the server returns a JSON response
//     } catch (error) {
//       console.error("Error in createTask:", error);
//       throw error; // Re-throw to be handled by the caller
//     }
//   },

//   updateTask: async (task: TaskElements) => {
//     try {
//       const response = await fetch(`${env.backendUrl}/${task.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(task),
//       });

//       if (!response.ok) {
//         const errorMessage = `Failed to update task. Status: ${response.status} - ${response.statusText}`;
//         throw new Error(errorMessage);
//       }

//       return response.json();
//     } catch (error) {
//       console.error("Error in updateTask:", error);
//       throw error;
//     }
//   },

//   deleteTask: async (id: number) => {
//     try {
//       const response = await fetch(`${env.backendUrl}/${id}`, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorMessage = `Failed to delete task. Status: ${response.status} - ${response.statusText}`;
//         throw new Error(errorMessage);
//       }

//       return response.json();
//     } catch (error) {
//       console.error("Error in deleteTask:", error);
//       throw error;
//     }
//   },

//   getData: async (
//     taskRequest: TaskRequest,
//     page: number,
//     dateOrder: string,
//     priorOrder: string
//   ) => {
//     try {
//       const params = {
//         prior: taskRequest.priority,
//         status: taskRequest.status,
//         text: taskRequest.taskText,
//         page: page.toString(),
//         dateOrder: dateOrder,
//         priorOrder: priorOrder,
//       };

//       const url = new URL(`${env.backendUrl}/search`);
//       url.search = new URLSearchParams(params).toString();

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorMessage = `Failed to fetch tasks. Status: ${response.status} - ${response.statusText}`;
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Error in getData:", error);
//       throw error;
//     }
//   },

//   getMetrics: async () => {
//     try {
//       const response = await fetch(`${env.backendUrl}/time`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorMessage = `Failed to fetch time metrics. Status: ${response.status} - ${response.statusText}`;
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Error in getMetrics:", error);
//       throw error;
//     }
//   },
// };
