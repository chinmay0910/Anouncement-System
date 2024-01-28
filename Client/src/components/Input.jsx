import React from 'react'

export const Input = ({type, name, placeholder, label, className}) => {
  return (
    <div className='flex flex-col mx-8 pt-8 w-[45%]'>
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} className={`rounded-sm border-2 p-2 ${className}`} placeholder={placeholder}/>
    </div>
  )
}
    