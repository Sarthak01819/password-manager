import React, { use } from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const showPassword = () => {

        if (ref.current.src.includes("/public/icons/hide.png")) {
            ref.current.src = "/public/icons/view.png"
            passwordRef.current.type = "text"

            return;
        }
        else {

            ref.current.src = "/public/icons/hide.png"
            passwordRef.current.type = "password"

        }
    }

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" })
            toast('Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Please fill all the fields with more than 3 characters')
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Are you sure you want to delete this password?")
        if (c) {
            console.log("Deleting password with id: " + id);
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPassword = (id) => {
        console.log("Editing password with id: " + id);
        setForm(passwordArray.find(item => item.id === id))
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="container mx-auto max-w-4xl">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>
                <div className=' flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full bg-white border border-green-500 py-1 p-4 w-full' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full bg-white border border-green-500 w-full p-4 py-1' type="text" name='username' id='username'/>
                        <div className='flex relative w-full'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full bg-white border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <img ref={ref} onClick={showPassword} className='h-[20px] absolute right-3 top-1.5 cursor-pointer' src="/public/icons/hide.png" alt="" />
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 w-fit rounded-full py-2 px-8 hover:bg-green-300 gap-2 border border-green-900'><lord-icon src="https://cdn.lordicon.com/vjgknpfx.json" trigger="click" stroke="bold" colors="primary:#000000,secondary:#000000"></lord-icon><span className='font-bold'>Save</span></button>
                </div>

                <div className="passwords">
                    <h2 className='text-2xl font-bold text-center my-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <p className='text-center text-green-900 text-2xl'>No Passwords Saved</p>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead>
                            <tr className='bg-green-800 text-white'>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} className='border-b border-white'>
                                    <td className='text-center w-32 py-2 cursor-pointer hover:underline items-center justify-center'>
                                        <a href={item.site} target='_blank'>{item.site}</a>
                                        <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" onClick={() => { copyText(item.site) }} className='lordiconcopy h-5 pt-1' trigger="click"></lord-icon>
                                    </td>
                                    <td className='text-center w-32 py-2 '>
                                        {item.username}
                                        <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" onClick={() => { copyText(item.username) }} className='lordiconcopy h-5 pt-1' trigger="click"></lord-icon>
                                    </td>
                                    <td className='text-center w-32 py-2 '>
                                        {item.password}
                                        <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" onClick={() => { copyText(item.password) }} className='lordiconcopy h-5 pt-1' trigger="click"></lord-icon>

                                    </td>
                                    <td className='text-center w-32 py-2 '>

                                        <lord-icon src="https://cdn.lordicon.com/jzinekkv.json" onClick={() => { deletePassword(item.id) }} className='lordiconcopy h-5 pt-1' trigger="hover" stroke="bold" colors="primary:#121331,secondary:#000000"></lord-icon>

                                        <lord-icon src="https://cdn.lordicon.com/exymduqj.json" onClick={() => { editPassword(item.id) }} className='lordiconcopy h-5 pt-1' trigger="hover" stroke="bold" state="hover-line" colors="primary:#121331,secondary:#000000"></lord-icon>

                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager