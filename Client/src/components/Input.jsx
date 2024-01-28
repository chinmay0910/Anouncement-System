import React from 'react'

export const Input = ({type, name, placeholder, label, className, value, classNameDiv, onChange}) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Call the parent component's onChange function and pass the updated value
    if (onChange) {
      onChange(name, value);
    }
  };

  return (
    <div className={`flex flex-col mx-4 pt-8 w-[45%] ${classNameDiv}`}>
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} value={value} className={`rounded-sm border-2 p-2 ${className}`} placeholder={placeholder} onChange={handleChange} max={type === 'date' ? getCurrentDate() : undefined}/>
    </div>
  )
}
    
// Helper function to get the current date in the format YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};