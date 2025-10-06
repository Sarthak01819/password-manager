import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white p-4 px-8 flex justify-between items-center h-15'>
            <div className='logo font-bold text-3xl cursor-pointer '>
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>

            <button className='text-white cursor-pointer h-12 flex gap-2 items-center font-bold hover:text-green-400 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-green-400 rounded-full py-1 px-4'>
                <img className='h-9 ' src="/public/icons/github.png" alt="GitHub Logo" />
                <span>GitHub</span>
            </button>
        </nav>
    )
}

export default Navbar

    // < ul >
    // <li className='flex gap-4 fixed left-[50%] top-4 translate-x-[-50%]'>
    //     <a className='hover:font-bold ' href="/">Home</a>
    //     <a className='hover:font-bold ' href="/about">About</a>
    //     <a className='hover:font-bold ' href="/contact">Contact</a>
    // </li>
    //     </ul >