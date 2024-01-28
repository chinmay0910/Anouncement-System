import React, { useEffect } from 'react'


// Component Imports , RegisterPage, Update, UpdateStatus, CreatePost, AddStaff 
import { TopNavigation, SideNav, ScheduleAnouncementsPage, Announcement,Update} from './index'
import './Home.css'

// React-Router Imports
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'


export const Home = () => {
    // const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        // const isUserLogin = localStorage.getItem('token')
        // if (!isUserLogin) {
        //     navigate('/account/signin')
        // }

    }, [])

    return (
        <>
            <div className="h-screen w-full">
                <TopNavigation />
                <div className="flex flex-row h-full mt-1">
                    <div className="left_Home w-[12%] lg:w-[20%] bg-white rounded-none z-0">
                        <SideNav />
                    </div>
                    <div className="right_Home lg:w-[80%]">
                        <Routes>
                            <Route exact path='/' element={<>Hello ji namste ji</>} />
                            <Route exact path='/schedule' element={<ScheduleAnouncementsPage />} />
                            <Route exact path='/announcement' element={<Announcement/>}/>
                            <Route exact path='/update' element={<Update />} />
                            

                            {/* <Route exact path='/addstaff' element={<AddStaff />} />
                            <Route exact path='/update' element={<Update />} />
                            <Route exact path='/update/status/:id' element={<UpdateStatus />} />
                            {id && <Route exact path={`/update/status/${id}`} element={<UpdateStatus />} />}
                            <Route exact path='/createpost' element={<CreatePost />} /> */}
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}
