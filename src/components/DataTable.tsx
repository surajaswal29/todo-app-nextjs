import React, { useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"

// data
import { ToDoData } from "@/utility/types"
import { Edit, X } from "lucide-react"
import Modal from "./Modal"
import { getAllTasks, getSingleTask, updateTask } from "@/actions/taskCRUD"
import useTaskContext from "@/hooks/useTaskContext"

type Props = {
  type: "ongoing" | "completed"
}

const DataTable: React.FC<Props> = ({ type }) => {
  // const [todoData, setToDoData] = React.useState<ToDoData[]>([])

  const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false)
  const [editDataId, seteditDataId] = React.useState<number | null>(null)
  const { state, setTaskData, setSingleTaskData } = useTaskContext()
  const { taskData, singleTaskData } = state

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      size: 200,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 300,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props: any) => {
        return (
          <div
            className={`p-2 px-3 inset-2 capitalize text-xs w-fit font-medium rounded-full ${
              props.getValue() === "completed"
                ? "bg-green-400 text-white"
                : props.getValue() === "upcoming"
                ? "bg-blue-400 text-white"
                : "bg-red-400 text-white"
            }`}
          >
            {props.getValue()}
          </div>
        )
      },
      size: 150,
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
      size: 150,
    },
    {
      header: "Action",
      size: 150,
      cell: (props: any) => {
        // console.log(props)
        return (
          <Edit
            size={16}
            className='cursor-pointer hover:text-blue-500'
            onClick={() => {
              console.log(props);
              handleModalOpen(props.row.original.id)
            }}
          />
        )
      },
    },
  ]

  const table = useReactTable({
    data: taskData ? taskData : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleModalOpen = async (id:number) => {
    try {
      const singleTaskData = await getSingleTask(id)

      if (singleTaskData) {
        setSingleTaskData(singleTaskData)
        setEditModalOpen(true)
        seteditDataId(id)
        console.log(singleTaskData)
      } else {
        alert("Something went erong")
      }
      
    } catch (error) {
      console.error("Failed to get single task", error)
      alert("Failed to get single task") 
    }
  }

  const handleUpdateSubmit = async (formData: FormData) => {
    try {
      console.log({
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
      });
      const result = await updateTask(editDataId as number, formData)
      console.log(result)
      if (result) {
        const newData = await getAllTasks("ongoing")
        setTaskData(newData)
      }
      alert("Task updated successfully!")
      setEditModalOpen(false)
    } catch (error) {
      console.error("Failed to add task", error)
      alert("Failed to add task")
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks(type)

      setTaskData(tasks)
    }

    fetchTasks()
  }, [type])
  return (
    <>
      {taskData && taskData.length > 0 ? (
        <div className='rounded-xl border-x border-slate-300 overflow-hidden'>
          <table className='w-full border-0 border-collapse bg-white'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className='border border-slate-500 bg-slate-700 text-white'
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`whitespace-nowrap text-left p-3 font-medium`}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className='border-b border-slate-300 cursor-pointer hover:bg-slate-200 ease-in-out duration-200'
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`p-3 truncate`}
                      style={{
                        maxWidth: cell.column.getSize(),
                      }}
                      onClick={() => console.log(cell.column)}
                    >
                      {cell.column.id === "description"
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='w-full rounded-xl border border-dashed border-slate-300 p-4'>
          <h1>No Task Available</h1>
        </div>
      )}

      {editModalOpen && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <div
            className='w-[600px] min-h-[250px] rounded-md bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4'
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='text-2xl bg-blue-100 p-3 rounded-md text-blue-500'>
              Edit task
            </h1>
            <form action={handleUpdateSubmit}>
              <div className='w-full my-3'>
                <label htmlFor='title'>Title</label>
                <br></br>
                <input
                  type='text'
                  name='title'
                  id='title'
                  defaultValue={
                    singleTaskData &&
                    typeof singleTaskData === "object" &&
                    "title" in singleTaskData
                      ? singleTaskData?.title
                      : ""
                  }
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
                  defaultValue={
                    singleTaskData &&
                    typeof singleTaskData === "object" &&
                    "description" in singleTaskData
                      ? singleTaskData?.description
                      : ""
                  }
                  className='w-full mt-2 h-[200px] resize-none outline-none focus:outline-none p-2 rounded-md border border-blue-300/60 focus:border-blue-500/60'
                ></textarea>
                <p className={`text-xs text-red-500 my-2 font-medium`}></p>
              </div>
              <div className='w-full my-3 border border-pink-300 bg-pink-50 p-2 py-3 rounded-md'>
                <label htmlFor='status' className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    name='status'
                    defaultChecked={
                      singleTaskData &&
                      typeof singleTaskData === "object" &&
                      "status" in singleTaskData && singleTaskData.status === "completed"
                    }
                    id='status'
                    className='w-4 h-4 cursor-pointer outline-none focus:outline-none'
                  />
                  Is this task completed?
                </label>
              </div>
              <div className='w-full mt-6 flex gap-4 text-white'>
                <button
                  type='submit'
                  className='bg-blue-400 w-full rounded-md p-2 px-5 font-medium'
                >
                  Update
                </button>
                <button
                  type='button'
                  className='bg-red-400 w-full rounded-md p-2 px-5 font-medium'
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DataTable
