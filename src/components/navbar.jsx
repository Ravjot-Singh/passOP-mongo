import React from 'react'


const navbar = () => {
    
    return (

        <nav className='bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-between items-center px-4 h-16 text-white absolute w-full'>
            <div className="logo font-bold font-serif ">
            <span className="text-blue-500"> &lt;</span>
              
                Pass
                <span className="text-blue-500">OP/&gt;</span>
               
            </div>
            <ul>
                <li className='flex gap-5 font-semibold font-serif text-blue-100'>
                    <a className='py-1 px-2 rounded-lg hover:bg-slate-900 hover:shadow-lg hover:transition-all ' href="/">Home</a>
                    <a className='py-1 px-2 rounded-lg hover:bg-slate-900 hover:shadow-lg hover:transition-all cursor-pointer' href='/About'  >About</a>
                    <a className='py-1 px-2 rounded-lg hover:bg-slate-900  hover:shadow-lg  hover:transition-all cursor-pointer' href='/Contact' >Contact</a>
                </li>
            </ul>

        </nav>
    
    )
}

export default navbar
