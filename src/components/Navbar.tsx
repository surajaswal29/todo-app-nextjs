import { ArrowUpCircle, ClipboardCheckIcon, Home, Languages, Moon, Save, Share } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  theme: string
}

const Navbar: React.FC<Props> = ({ theme }) => {
  return (
    <div className='w-full px-12 p-3 bg-slate-800 text-white flex items-center justify-between'>
      <div id='icon'>
        <ClipboardCheckIcon />
      </div>
      <nav className='flex gap-6'>
        <Link href='/' className="flex items-center gap-1">
          <Home size={16}/>
          Home
        </Link>
        <Link href='/draft' className="flex items-center gap-1"><Save size={16}/> Draft</Link>
        <Link href='/shared' className="flex items-center gap-1"><Share size={16}/> Shared</Link>
        <Link href='/upcoming' className="flex items-center gap-1"><ArrowUpCircle size={16}/> Upcoming</Link>
      </nav>
      <div className='flex items-center gap-3'>
        <button className='p-2 text-sm rounded-full bg-pink-400/70 block'>
          <Moon size={18} />
        </button>
        <button className='p-2 text-sm rounded-full bg-pink-400/70 block'>
          <Languages size={18} />
        </button>

        <div id='profile' className='flex gap-2'>
          <Image src={"/user1.svg"} alt='User Profile' width={40} height={40} />
          <div className='flex flex-col text-sm justify-center'>
            <p>User Name</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
