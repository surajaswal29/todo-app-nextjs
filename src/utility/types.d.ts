export interface ToDoData {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    status: string;
    createdOn: string;
}

export interface TaskInitialState {
    taskData?: ToDoData[] | []
    singleTaskData?: ToDoData | {}
}

export interface TaskContextTypes {
  state: TaskInitialState
  setTaskData: (taskData: ToDoData[]) => void
  setSingleTaskData: (taskData: ToDoData) => void
}