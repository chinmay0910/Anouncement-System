import React, { useContext, useEffect, useState } from "react";
import './home.css'
// import UserContext from "../context/UserContext";

// React Router imports
import { NavLink, useNavigate } from "react-router-dom";

// Tabler Icons
import { IconHome, IconCalendarTime, IconSettings, Icon24Hours, IconFileDescription, IconCirclePlus, IconLogin } from '@tabler/icons-react';


export const SideNav = () => {
    // const { user, getUser } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=>{
        (async ()=>{
            // await getUser();
        })()
        
    },[])

    const handleSignout = () => {
        localStorage.removeItem('token')
        navigate('/account/signin')
    }
 
    return (
        <div className="sidenav_buttons mt-8 fixed w-[12%] lg:w-[20%]">
            <NavLink to='/' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconHome className='md:mx-8' /><h1> Home</h1>
            </NavLink>
            {/* {
                user.role == 'Incharge' ?
                    <NavLink to='/addstaff' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                        <IconCirclePlus className='md:mx-8' /><h1> Add Staff</h1>
                    </NavLink>
                    :
                    ""
            } */}
            <NavLink to='/schedule' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconCalendarTime className='md:mx-8' /><h1> Schedule </h1>
            </NavLink>
            <NavLink to='/update' role='button' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconFileDescription className='md:mx-8' /> <h1>Anouncement Logs</h1>
            </NavLink>
            {/* <NavLink to='/announcement' role='button' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <Icon24Hours className='md:mx-8' /> <h1>Daily Anouncements</h1>
            </NavLink> */}
            <NavLink to='settings' role='button' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"}>
                <IconSettings className='md:mx-8 ' /> <h1>Settings</h1>
            </NavLink>
            <NavLink to='/account/signin' role='button' className={({ isActive }) => isActive ? "bg-blue-200" : "hover:bg-[#F0F6FF]"} onClick={handleSignout}>
                <IconLogin className='md:mx-8 ' /> <h1>Logout</h1>
            </NavLink>
        </div>
    )

}