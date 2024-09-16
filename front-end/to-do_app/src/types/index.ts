export interface SelectOptionsI {
  id: string;
  name: string;
  value: string;
}

export interface ComponentWithChildren {
  children: React.ReactNode;
}

export enum ModalType {
  Add = "add",
  Time = "time",
  Edit = "edit",
  Delete = "delete",
  Null = "",
}

export interface TaskElements {
  id?: number;
  text?: string;
  priority?: string;
  dueDate?: Date;
}

export enum priorityType {
  All = "All",
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum statusType {
  All = "All",
  Done = "Done",
  Pending = "Pending",
}

export interface TaskRequest {
  taskText: string;
  priority: priorityType;
  status: statusType;
}

export interface TaskStructure {
  creationDate: string;
  doneDate?: string;
  dueDate?: string;
  id: number;
  isDone: boolean;
  priority: priorityType;
  text: string;
}

export interface TaskTimes {
  averageTime: string;
  lowPriorTime: string;
  mediumPriorTime: string;
  highPriorTime: string;
}

export enum order {
  Asc = "Asc",
  Desc = "Desc",
}

export interface TasksPageResult {
  tasksFromPage: TaskStructure[];
  totalPages: number;
  page: number;
}
