"use server";

import { db } from "@/lib/db";

export const addNewTask = async (formData: FormData) => {
    const addData = await db.toDoTask.create({
        data: {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            status: "ongoing",
            createdOn: new Date().toDateString(),
        }
    })


    console.log(addData);

    return addData;

}


export const getAllTasks = async (status:string) => { 
    const allTasks = await db.toDoTask.findMany({where:{status}})

    return allTasks;
}

export const getSingleTask = async (id: number) => {
    const singleTask = await db.toDoTask.findUnique({where:{id}})

    return singleTask;
}
 
export const updateTask = async (id: number, formData: FormData) => { 
    const update = await db.toDoTask.update({
        where: { id },
        data: {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            status: formData.get("status") ? "completed" : "ongoing",
            isCompleted: formData.get("status") ? true : false
        }
    })

    if(update) {
        return {
            status: "success",
            message: "Task updated successfully"
        };
    } else {
        return {
            status: "error",
            message: "Failed to update task"
        }
    }
}