"use client"

import Navbar from "@/components/Navbar"
import { CircleCheck, CircleDashed, Plus, TrendingUp, X } from "lucide-react"
import { useState } from "react"
import DataTable from "@/components/DataTable"
import Modal from "@/components/Modal"
import NewTaskModal from "@/components/NewTaskModal"


const TAB_LINK = ["ongoing", "completed"]

const Home = () => {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  

  return (
    <div className='w-full'>
      <Navbar theme='light' />
      <div className='w-full px-36 py-10'>
        <div className='w-full flex justify-between mt-20'>
          <div className='w-full flex gap-6 border-b'>
            {TAB_LINK.map((link, index) => (
              <button
                key={index}
                type='button'
                className={`${
                  currentTab === index
                    ? "text-blue-500 border-b border-b-blue-500 ease-in-out"
                    : "text-slate-500 border-b border-b-transparent"
                } py-2 ease-in-out duration-300 flex items-center gap-2`}
                onClick={() => setCurrentTab(index)}
              >
                {index === 0 && <CircleDashed size={18} />}
                {index === 1 && <CircleCheck size={18} />}
                {index === 2 && <TrendingUp size={18} />}
                {link}
              </button>
            ))}
          </div>
          <button
            type='button'
            className='flex items-center gap-2 whitespace-nowrap text-sm bg-blue-500 rounded-md outline-none border-0 text-white p-2 px-3'
            onClick={() => setModalOpen(true)}
          >
            <Plus size={18} /> Add New
          </button>
        </div>
        <div className='w-full mt-6'>
          {currentTab === 0 && <DataTable type='ongoing' />}
          {currentTab === 1 && <DataTable type='completed' />}
        </div>
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NewTaskModal handleCloseModal={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

export default Home
