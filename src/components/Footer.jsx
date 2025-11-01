import { Heart } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white p-4 px-8 flex justify-between items-center h-15'>
            <div className='logo font-bold text-3xl cursor-pointer '>
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='text-sm flex gap-2 items-center'>
                <span className='flex items-center'>Created with&nbsp;
                    {/* <img className='h-5' src="/public/icons/heart.png" alt="Heart logo" /> */}
                    <Heart className='text-red-500 fill-red-500 ' />
                    &nbsp;by&nbsp;<span className='underline'>Sarthak Singh</span></span>
            </div>
        </div>
    )
}

export default Footer