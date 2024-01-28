import React, { useContext, useEffect } from 'react'
import BrandLogo from '/megaphone.svg'
import Admin from '/assets/Admin.png'
import NotificationIcon from '/assets/Notification.svg'
// import UserContext from '../context/UserContext'

export const TopNavigation = () => {

    // const context = useContext(UserContext);
    // const { user, getUser } = context;

    useEffect(() => {
        // getUser()
    }, [])

    return (
        <div className="flex flex-row bg-white shadow-lg shadow-gray-500/50 p-2 justify-between z-10 sticky top-0">
            <div className="flex flex-row">
                <img className="w-[50px] h-[50px] mx-4 my-2" src={BrandLogo} alt="Logo" />
                <h1 className="font-bold text-2xl p-4">Anouncement DashBoard</h1>
            </div>
            <div className="flex flex-row items-center justify-center">
                <img src={NotificationIcon} alt="icon" />
                <div className="flex flex-col text-end">
                    {/* <h1 className='px-4'>{user.username}</h1>
                    <h1 className='px-4'>{user.role}</h1> */}
                    <h1 className='px-4'>Admin</h1>
                    <h1 className='px-4'></h1>
                </div>
                <img className="w-[50px] h-[50px]" src={Admin} alt="admin" />
            </div>
        </div>
    )
}
