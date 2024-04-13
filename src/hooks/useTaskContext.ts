import { TaskDataContext } from "@/context/TaskDataContext"
import { useContext } from "react"


const useTaskContext = () => {
    const context = useContext(TaskDataContext)


    if (!context) {
        throw new Error('useTaskContext must be used within a TaskDataContextProvider')
    }

    return context
}
 
export default useTaskContext