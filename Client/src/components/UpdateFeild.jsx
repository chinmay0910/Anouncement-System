import React from 'react'

// All React Router Imports...
import { useNavigate } from 'react-router-dom'

// Tabler Icons import
import {  IconEdit, IconTrash  } from '@tabler/icons-react';


export const UpdateFeild = ({ann_no, name, location,onDeleteClick}) => {
    const navigate = useNavigate()
    const updateStatus = () => {
        navigate(`/edit/${ann_no}`);
    }

    return (
        <div className="grid grid-cols-12 bg-white mt-4 rounded-xl p-4">
            <h1 className='me-auto' id='ann_no'>{ann_no}</h1>
            <h1 className='mx-8 col-span-5' id='name'>{name}</h1>
            <h1 className='mx-8 col-span-4' id='location'>{location}</h1>
            <IconEdit className='ms-auto me-2 cursor-pointer' onClick={updateStatus} />
            <IconTrash className='ms-2 cursor-pointer' onClick={() => onDeleteClick(ann_no)} />
        </div>
    )
}
