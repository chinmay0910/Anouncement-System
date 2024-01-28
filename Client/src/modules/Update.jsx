import React from 'react'

// Components Import
import { UpdateFeild } from '../components/UpdateFeild.jsx'

// Tabler Icons import
import { IconSearch } from '@tabler/icons-react'

export const Update = () => {
    return (
        <div className="mt-16 text-lg font-semibold">
            <div className="flex flex-col">
                <div className="flex flex-row bg-white border-black border-2 mx-[14%] rounded-xl shadow-lg">
                    <input type="text" className='p-4 rounded-xl outline-none w-[96%]' placeholder='Search with FIR No.' />
                    <IconSearch className='my-auto' />
                </div>
                <div className="flex flex-col mx-[14%] mt-12">
                    <UpdateFeild  firno="1245" name="Pradip Garhwal" reason="Wife Request for Dowry"/>
                    <UpdateFeild  firno="1246" name="Shivam Mahadik" reason="VIT me bhi Rajasthan jaisa pani nahi milta"/>
                </div>
            </div>

        </div>
    )
}
