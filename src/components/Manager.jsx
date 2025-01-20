import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();

    const [forms, setforms] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let password = await req.json()
        console.log(password)
        setpasswordArray(password)
    }

    useEffect(() => {
        getPasswords()


    }, [])


    const showPassword = () => {

        if (ref.current.src.includes("icons/eye.png")) {
            alert("show the password?");
            ref.current.src = "icons/eyeCross.png"
            passwordRef.current.type = "text"
        }
        else {
            alert("Hide the password?");
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }

    }

    const savePassword = async () => {

        if (forms.site.length > 6 && forms.username.length > 3 && forms.password.length > 3) {


            // If any such id exists in the db, delete it 
            setpasswordArray([...passwordArray, { ...forms, id: uuidv4() }])
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: forms.id }) })

            
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...forms, id: uuidv4() }) })

            // Otherwise clear the form and show toast
            setforms({ site: "", username: "", password: "" })

            toast.success('Saved Successfully!', {
                position: "top-center",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast.error('Error: Invalid length!', {
                position: "top-center",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });

        }



    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id : ", id);

        let c = confirm("Do you really want to delete it?")

        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
             await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...forms, id }) })
            toast.success('Deleted Successfully!', {
                position: "top-center",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }


    }

    const editPassword = (id) => {
        setforms({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setforms({ ...forms, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />


            <div className=" p-2 md:p-0 md:mycontainer flex flex-col items-center text-gray-50 font-serif font-semibold min-h-[87.5vh]">

                <div className='w-full mt-24 flex flex-col items-center'>

                    <h1 className='text-4xl text-blue-100 font-bold'>
                        <span className='text-blue-500'>&lt;</span>
                        Pass
                        <span className='text-blue-500'>OP/&gt;</span>
                    </h1>
                    <p className='text-blue-400 text-lg '>Your own password manager</p>

                </div>


                <div className="text-white flex flex-col p-4 w-3/4 gap-3 items-center">

                    <input value={forms.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full px-4 py-1 w-full border-2 placeholder-neutral-600 border-spacing-2 border-blue-700 text-black' name="site" type="text" />

                    <div className="flex flex-col md:flex-row py-2 w-full  gap-5 ">
                        <input value={forms.username} onChange={handleChange} placeholder='Enter User-name' className='rounded-full px-4 py-1 w-full border-2 placeholder-neutral-600 border-spacing-2 border-blue-700 text-black' name="username" type="text" />

                        <div className="relative flex  items-center gap-2">

                            <input ref={passwordRef} value={forms.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full px-4 py-1 w-full border-2 placeholder-neutral-600 border-spacing-2 border-blue-700 text-black' name="password" type="password" />

                            <span className='absolute right-[3px] top-[0px] text-black cursor-pointer ' onClick={showPassword}><img ref={ref} className='p-2' width={38} src="icons/eye.png" alt="" /></span>
                        </div>


                    </div>

                    <button onClick={savePassword} className='w-fit  px-3 py-2 flex  items-center hover:bg-neutral-900 rounded-full  hover:transition-all gap-1 border-2 border-neutral-600  '>
                        <lord-icon
                            src="https://cdn.lordicon.com/sqmqtgjh.json"
                            trigger="hover"
                            colors="primary:#2ca58d,secondary:#242424"
                        ></lord-icon>
                        Save
                    </button>


                </div>


                <div className="passwords w-3/4 py-1 overflow-x-auto ">
                    <h2 className='md:text-xl  py-2'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}

                    {passwordArray.length != 0 && <table className="table-auto min-w-full overflow-hidden rounded-lg ">
                        <thead className='bg-stone-950  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>

                            </tr>
                        </thead>
                        <tbody className='bg-[#32344911]'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} >

                                    <td className='text-center max-w-32 py-3 border-2 border-gray-950 '>
                                        <div className="flex justify-between items-center px-2 overflow-scroll no-scrollbar">
                                            <span className='overflow-scroll no-scrollbar mr-3'><a href={item.site} target='_blank'>{item.site}</a></span>
                                            <img onClick={() => copyText(item.site)} className='bg-blue-100 rounded-lg px-1 w-6 md:w-8 cursor-pointer hover:bg-blue-200' src="/icons/copy.png" alt="" />
                                        </div>

                                    </td>
                                    <td className='text-center min-w-32  py-3 border-2 border-gray-950 '>
                                        <div className="flex justify-between items-center px-2">
                                            <span className='overflow-scroll no-scrollbar mr-3'>{item.username}</span>
                                            <img onClick={() => copyText(item.username)} className='bg-blue-100 rounded-lg  px-1 w-6 md:w-8 cursor-pointer hover:bg-blue-200' src="/icons/copy.png" alt="" />
                                        </div>

                                    </td>
                                    <td className='text-center min-w-32  py-3 border-2 border-gray-950 '>
                                        <div className="flex justify-between items-center px-2">
                                            <span className='overflow-scroll no-scrollbar mr-3'>{item.password}</span>
                                            <img onClick={() => copyText(item.password)} className='bg-blue-100 rounded-lg px-1 w-6 md:w-8 cursor-pointer hover:bg-blue-200' src="/icons/copy.png" alt="" />
                                        </div>

                                    </td>

                                    <td className='text-center  md:min-w-28  py-3 border-2 border-gray-950 '>

                                        <div className="flex md:w-full justify-around ">

                                            <span><img onClick={() => { deletePassword(item.id) }} className='bg-blue-100 rounded-lg px-1 cursor-pointer w-6 md:w-9 md:h-6 hover:bg-blue-200' src="/icons/delete.png" alt="" />
                                            </span>
                                            <span><img onClick={() => { editPassword(item.id) }} className='bg-blue-100 rounded-lg px-1 cursor-pointer w-6 md:w-8 hover:bg-blue-200' src="/icons/edit.png" alt="" />
                                            </span>

                                        </div>


                                    </td>

                                </tr>
                            })}


                        </tbody>
                    </table>
                    }
                </div>
            </div>


        </>
    )
}

export default Manager
