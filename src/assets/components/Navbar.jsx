import React from 'react'

const Navbar = () => {
  return (
  <nav className="flex justify-between bg-slate-700 text-white py-2 ">
      <div className="logo">
        <span className="text-xl font-bold mx-9 ">iTask</span>

      </div>
      <ul className="flex gap-8 mx-9">
        <li className="hover:text-blue-500 cursor-pointer font-bold transition-all  ">Home</li>
        <li className="hover:text-blue-500 cursor-pointer font-bold transition-all  ">Your Tasks</li>
      </ul>
     </nav>
  )
}

export default Navbar
