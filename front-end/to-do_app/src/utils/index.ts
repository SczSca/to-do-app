import { SelectOptionsI } from "../types";

export const priorityOptions: SelectOptionsI[] = [
  {
    id: "1",
    name: "None",
    value: "None",
  },
  {
    id: "2",
    name: "Low",
    value: "low",
  },
  {
    id: "3",
    name: "Medium",
    value: "medium",
  },
  {
    id: "4",
    name: "High",
    value: "high",
  },
];

export const statusOptions: SelectOptionsI[] = [
  {
    id: "1",
    name: "None",
    value: "None",
  },
  {
    id: "2",
    name: "Pending",
    value: "pending",
  },
  {
    id: "3",
    name: "Completed",
    value: "completed",
  },
];

export const orderOptions: SelectOptionsI[] = [
  {
    id: "1",
    name: "Priority Desc",
    value: "Priority Desc",
  },
  {
    id: "2",
    name: "Priority Asc",
    value: "Priority Asc",
  },
  {
    id: "3",
    name: "Status Desc",
    value: "Status Desc",
  },
  {
    id: "4",
    name: "Status Asc",
    value: "Status Asc",
  },
];
