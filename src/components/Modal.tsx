import React from "react"
import { createPortal } from "react-dom"

type Props = {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ onClose, children }) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return createPortal(
    <div
      className='w-full h-screen bg-black/60 absolute top-0 left-0 right-0 z-10 ease-in-out duration-200 overflow-hidden animate-fade animate-once animate-duration-[400ms] animate-ease-in-out'
      onClick={onClose}
    >
      {children}
    </div>,
    document.body
  )
}

export default Modal
