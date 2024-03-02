import React, { useState } from 'react'
import axios from'axios'
import {useNavigate } from 'react-router-dom'


const AjouterStade = () => {
  const [stade, setStade] = useState()
  const navigate  = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    axios.post("http://localhost:3000/auth/ajouter_stade",{stade})
    .then (result => {
      if(result.data.Status){
        navigate('/dashboard/stadium')
      } else {
        alert(result.data.Error)
      }
    })
    .catch (err => console.log(err))
  }
  return (
    <div className='flex items-center justify-center h-[80vh] w-[80vw]'>
    <div className='relative rounded-xl w-[40vw] h-[30vh] bg-cyan-100 '>
      <div className='absolute top-0 flex items-center justify-center w-full h-full'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full min-w-full p-100'> 
          <h2 className='mb-3 text-3xl text-indigo-500'>Ajouter un Stade</h2>
          <div className='w-full h-[50px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full'>
            <input onChange={(e) => setStade(e.target.value) } type="text" placeholder='Entrez un stade' name='satde' className='w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit ' />
          </div>
          <button type="submit" className='px-6 py-2 border-none mt-[30px] rounded-lg bg-blue-500 text-white font-medium m-001 uppercase hover:bg-blue-900'>Ajouter Stade</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AjouterStade
