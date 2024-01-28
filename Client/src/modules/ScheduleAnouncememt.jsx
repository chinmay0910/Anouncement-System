import React, { useEffect, useState } from 'react';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import AudioRecorder from '../components/AudioRecorder';
import CampusRoomSelector from './CampusRoomSelector';

export const ScheduleAnouncementsPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        AnouncementName: '',
        Description: '',
        date: '',
        time: '',
    });

    const handleChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const response = await fetch('http://localhost:5001/api/complaint/registerfir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                AnouncementName: formData.AnouncementName,
                Description: formData.Description,
                date: formData.date,
                time: formData.time,
            }),
        });
        const json = await response.json();
        // console.log(json);
        // alert("Complaint Added");
        setFormData({ AnouncementName: '', Description: '', date: '', time: '' });
        navigate('/update');
    };

    return (
        <div className="mt-16 text-lg font-semibold">
            <h1 className="w-[80%] m-auto mb-4">Create Anouncement:</h1>
            <form className="bg-white w-[80%] rounded-lg m-auto pb-16 flex flex-col" onSubmit={handleSubmit}>
                <div>
                    <div className="flex flex-row flex-wrap">
                        <Input type="text" name="AnouncementName" placeholder="eg meet in Auditorium" label="Anouncement Name:" className="" onChange={handleChange} />
                        <Input type="text" name="Description" placeholder="5 - 6 words of Description (if any)" label="Anouncement Description:" className="" onChange={handleChange} />
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-row w-1/2">
                            <Input type="date" name="date" label="Date:" className="" onChange={handleChange} />
                            <Input type="time" name="time" label="Time:" classNameDiv="ms-0 w-[41%]" onChange={handleChange} />
                        </div>
                        <div className="w-1/2 pt-8">
                            <AudioRecorder />
                        </div>
                    </div>
                    <CampusRoomSelector onSubmit={handleSubmit} />
                </div>
                <button className="block p-2 bg-blue-600 rounded-lg w-1/5 mx-auto mt-8 text-white font-semibold">Add Anouncement</button>
            </form>
        </div>
    );
};
