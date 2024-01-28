import React from 'react'

// All React Router Imports...
import { useNavigate } from 'react-router-dom'

// Tabler Icons import
import { IconUserFilled, IconEdit } from '@tabler/icons-react'

export const UpdateFeild = ({firno, name, reason}) => {
    const navigate = useNavigate()
    const updateStatus = () => {
        navigate('/')
    }

    return (
        <div className="flex flex-row bg-white mt-4 rounded-xl p-4">
            <IconUserFilled />
            <h1 className='mx-16' id='firno'>{firno}</h1>
            <h1 className='mx-8' id='name'>{name}</h1>
            <h1 className='mx-8' id='reason'>{reason}</h1>
            <IconEdit className='ms-auto me-2 cursor-pointer' onClick={updateStatus} />
        </div>
    )
}
