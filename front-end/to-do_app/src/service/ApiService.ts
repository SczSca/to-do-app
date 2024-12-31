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

/**
 * Creates a new task.
 *
 * @param {TaskElements} task - The task data to create.
 * @param {Record<string, string | number | boolean | null | undefined>} queryParams - Additional query parameters.
 * @returns {Promise<Response>} The response from the server.
 */
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

/**
 * Updates an existing task.
 *
 * @param {TaskElements} task - The task data to update.
 * @param {Record<string, string | number | boolean | null | undefined>} queryParams - Additional query parameters.
 * @returns {Promise<Response>} The response from the server.
 */
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

/**
 * Updates the status of a task.
 *
 * @param {number} id - The ID of the task to update.
 * @param {Record<string, string | number | boolean | null | undefined>} queryParams - Additional query parameters.
 * @returns {Promise<Response>} The response from the server.
 */
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

/**
 * Deletes a task.
 *
 * @param {number} id - The ID of the task to delete.
 * @param {Record<string, string | number | boolean | null | undefined>} queryParams - Additional query parameters.
 * @returns {Promise<Response>} The response from the server.
 */
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

/**
 * Fetches tasks based on search parameters.
 *
 * @param {TaskRequest} taskRequest - The task request parameters.
 * @param {number} page - The page number to fetch.
 * @param {string} dateOrder - The order of the date.
 * @param {string} priorOrder - The order of the priority.
 * @param {Record<string, string | number | boolean | null | undefined>} queryParams - Additional query parameters.
 * @returns {Promise<TasksPageResult>} The result of the tasks page.
 */
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

/**
 * Fetches task metrics.
 *
 * @param {Record<string, string | number | boolean | null | undefined>} queryParams - Additional query parameters.
 * @returns {Promise<TaskTimes>} The task times metrics.
 */
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

/**
 * Fetches tasks and updates the state with the retrieved tasks.
 *
 * @param {SearchParams} searchParams - The current search parameters.
 * @param {React.Dispatch<React.SetStateAction<AllData>>} setAllData - Function to update the state with all data.
 * @param {React.Dispatch<React.SetStateAction<SearchParams>>} setSearchParams - Function to update the search parameters.
 * @param {number} [page=searchParams.currentPage] - The page number to fetch.
 */
export const fetchTasks = async (
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>,
  page: number = searchParams.currentPage
) => {
  try {
    const responseData = await getData(
      searchParams.taskRequest,
      page,
      searchParams.dateOrder,
      searchParams.priorOrder
    );

    // Update the state with the retrieved tasks
    setAllData((prevState) => ({
      ...prevState,
      data: responseData.tasksFromPage,
    }));
    // Update the search parameters with the new page and total pages
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

/**
 * Creates a new task and fetches the updated list of tasks.
 *
 * @param {TaskElements} task - The task data to create.
 * @param {SearchParams} searchParams - The current search parameters.
 * @param {React.Dispatch<React.SetStateAction<AllData>>} setAllData - Function to update the state with all data.
 * @param {React.Dispatch<React.SetStateAction<SearchParams>>} setSearchParams - Function to update the search parameters.
 */
export const createTaskAndFetchAll = async (
  task: TaskElements,
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
) => {
  try {
    await createTask(task); // Create the new task
    await fetchTasks(searchParams, setAllData, setSearchParams); // Fetch the updated list of tasks
  } catch (error) {
    console.error("Error in fetchTaskCreation:", error);
    throw error;
  }
};

/**
 * Updates an existing task and fetches the updated list of tasks.
 *
 * @param {TaskElements} task - The task data to update.
 * @param {SearchParams} searchParams - The current search parameters.
 * @param {React.Dispatch<React.SetStateAction<AllData>>} setAllData - Function to update the state with all data.
 * @param {React.Dispatch<React.SetStateAction<SearchParams>>} setSearchParams - Function to update the search parameters.
 */
export const updateTaskAndFetchAll = async (
  task: TaskElements,
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
) => {
  try {
    await updateTask(task); // Update the task
    await fetchTasks(searchParams, setAllData, setSearchParams); // Fetch the updated list of tasks

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

/**
 * Deletes a task and fetches the updated list of tasks.
 *
 * @param {number} id - The ID of the task to delete.
 * @param {SearchParams} searchParams - The current search parameters.
 * @param {React.Dispatch<React.SetStateAction<AllData>>} setAllData - Function to update the state with all data.
 * @param {React.Dispatch<React.SetStateAction<SearchParams>>} setSearchParams - Function to update the search parameters.
 */
export const deleteTaskAndFetchAll = async (
  id: number,
  searchParams: SearchParams,
  setAllData: React.Dispatch<React.SetStateAction<AllData>>,
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
) => {
  try {
    await deleteTask(id); // Delete the task
    await fetchTasks(searchParams, setAllData, setSearchParams); // Fetch the updated list of tasks

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

/**
 * Fetches metrics and updates the state with the retrieved metrics.
 *
 * @param {React.Dispatch<React.SetStateAction<AllData>>} setAllData - Function to update the state with all data.
 */
export const fetchMetrics = async (
  setAllData: React.Dispatch<React.SetStateAction<AllData>>
) => {
  try {
    const timeMetrics = await getMetrics(); // Fetch the metrics

    // Update the state with the retrieved metrics
    setAllData((prevState) => ({
      ...prevState,
      timeMetrics,
    }));
  } catch (error) {
    console.error("Error in fetchMetrics:", error);
    throw error;
  }
};
