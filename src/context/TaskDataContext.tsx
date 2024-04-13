"use client";

import { TaskContextTypes, TaskInitialState, ToDoData } from '@/utility/types'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const initialState: TaskInitialState = {
  taskData: [],
  singleTaskData: {},
}

const taskReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_TASK_DATA':
      return { ...state, taskData: action.payload }
    case 'SET_SINGLE_TASK_DATA':
      return { ...state, singleTaskData: action.payload }
    default:
      return state
  }
 }

export const TaskDataContext = React.createContext<TaskContextTypes | null>(null)

const TaskDataProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(taskReducer, initialState)

  // set task data
  const setTaskData = (taskData: ToDoData[]) => {
    dispatch({ type: 'SET_TASK_DATA', payload: taskData })
  }
  
  // set single task data
  const setSingleTaskData = (taskData: ToDoData) => {
    dispatch({ type: "SET_SINGLE_TASK_DATA", payload: taskData })
  }

  return (
    <TaskDataContext.Provider value={{ state, setTaskData, setSingleTaskData }}>
      {children}
    </TaskDataContext.Provider>
  )
}

export default TaskDataProvider