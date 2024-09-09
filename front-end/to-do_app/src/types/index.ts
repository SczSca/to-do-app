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

export interface taskElements {
  taskName: string;
  priority: string;
  deadline: Date;
}
