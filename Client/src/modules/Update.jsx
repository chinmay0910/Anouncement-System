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
                    <input type="text" className='p-4 rounded-xl outline-none w-[96%]' placeholder='Search with Announcement No.' />
                    <IconSearch className='my-auto' />
                </div>
                <div className="flex flex-col mx-[14%] mt-12">
                    <UpdateFeild  ann_no="1245" name="National Anthem" location="Entire college "/>
                    <UpdateFeild  ann_no="1246" name="special Announcement" location="M block "/>
                </div>
            </div>

        </div>
    )
}
