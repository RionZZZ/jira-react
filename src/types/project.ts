export interface User {
  id: number;
  name: string;
  token: string;
}
export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created?: number;
  pin: boolean;
}
export interface Banner {
  id: number;
  name: string;
  projectId: number;
}
export interface Epic {
  id: number;
  name: string;
  projectId: number;
  processorId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}

export interface EpicType {
  id: number;
  name: string;
}
