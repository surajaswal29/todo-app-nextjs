import { db } from "@/lib/db"
import React from "react"
import { addNewTask, getAllTasks } from "../actions/taskCRUD"
import useTaskContext from "@/hooks/useTaskContext"

type Props = {
  handleCloseModal: () => void
}

const NewTaskModal: React.FC<Props> = ({ handleCloseModal }) => {
  
  const { setTaskData } = useTaskContext()

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await addNewTask(formData)
      console.log(result)
      if (result) {
        const newData = await getAllTasks(result.status)
        setTaskData(newData)
      }
      alert("Task added successfully!")
      handleCloseModal()
    } catch (error) {
      console.error("Failed to add task", error)
      alert("Failed to add task")
    }
  }

  return (
    <div
      className='w-[600px] min-h-[250px] rounded-md bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4'
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className='text-2xl bg-blue-100 p-3 rounded-md text-blue-500'>
        Add new task
      </h1>
      <form action={handleSubmit}>
        <div className='w-full my-3'>
          <label htmlFor='title'>Title</label>
          <br></br>
          <input
            type='text'
            name='title'
            id='title'
            className='w-full mt-2 outline-none focus:outline-none p-2 rounded-md border border-blue-300/60 focus:border-blue-500/60'
          />
          <p className={`text-xs text-red-500 my-2 font-medium`}></p>
        </div>
        <div className='w-full my-3'>
          <label htmlFor='description'>Description</label>
          <br></br>
          <textarea
            name='description'
            id='description'
            className='w-full mt-2 h-[200px] resize-none outline-none focus:outline-none p-2 rounded-md border border-blue-300/60 focus:border-blue-500/60'
          ></textarea>
          <p className={`text-xs text-red-500 my-2 font-medium`}></p>
        </div>
        <div className='w-full mt-6 flex gap-4 text-white'>
          <button
            type='submit'
            className='bg-blue-400 w-full rounded-md p-2 px-5 font-medium'
          >
            Add
          </button>
          <button
            type='button'
            className='bg-red-400 w-full rounded-md p-2 px-5 font-medium'
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewTaskModal
