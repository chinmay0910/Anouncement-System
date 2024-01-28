import React from 'react'

// Components Import
import { Input } from '../components/Input'

export const Announcement = () => {
    return (
        <div className="mt-16 text-lg font-semibold">
            <h1 className='w-[80%] m-auto mb-4'>Create Announcement :</h1>
            <form className='bg-white w-[80%] rounded-lg m-auto pb-16 flex flex-col'>
                <div>
                    <div className="flex flex-row">
                        <Input type="text" name="Announcement_Name" placeholder="eg. National Anthem" label="Anouncement Name " className="" />
                        <Input type="text" name="Description" placeholder="Atleast 5 - 6 words of Description" label="Description:" className="" />
                    </div>
                    <div className="flex flex-row">
                        <Input type="date" name="date"  label="Start date" className="" />
                        <Input type="date" name="date"  label="End date" className="" />
                    </div>
                    <div className="flex flex-row">
                        <Input type="time" name="time"  label="time" className="" />
                        <Input type="file" name="file"  label="Attachment " className="" />
                    </div>
                </div>
                <button className='block p-2 bg-blue-600 rounded-lg w-1/5 mx-auto mt-8 text-white font-semibold'>ADD</button>
            </form>

        </div>

    )
}
