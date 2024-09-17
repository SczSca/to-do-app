import { SelectOptionsI } from "../types";

export const priorityOptions: SelectOptionsI[] = [
  {
    id: "1",
    name: "All",
    value: "All",
  },
  {
    id: "2",
    name: "Low",
    value: "Low",
  },
  {
    id: "3",
    name: "Medium",
    value: "Medium",
  },
  {
    id: "4",
    name: "High",
    value: "High",
  },
];

export const statusOptions: SelectOptionsI[] = [
  {
    id: "1",
    name: "All",
    value: "All",
  },
  {
    id: "2",
    name: "Pending",
    value: "Pending",
  },
  {
    id: "3",
    name: "Completed",
    value: "Completed",
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
