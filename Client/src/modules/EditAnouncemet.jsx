import React, { useState, useEffect } from 'react';
import { Input } from '../components/Input';
import { useNavigate, useParams } from 'react-router-dom';
import AudioRecorder from '../components/AudioRecorder';
import CampusRoomSelector from './CampusRoomSelector';

export const EditAnnouncementsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        AnouncementName: '',
        Description: '',
        date: null,
        time: '',
        audio: '',
        everyday: false,
    });

    const [selectedData, setSelectedData] = useState({
        selectedCampuses: [],
        availableRooms: [],
    });

    useEffect(() => {
        fetchAnnouncementData();
    }, [id]);

    const fetchAnnouncementData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/announcements/${id}`);
            const data = await response.json();
            console.log('Fetched data ',data);
            setFormData({
                AnouncementName: data.AnouncementName,
                Description: data.Description,
                date: data.date,
                time: data.time,
                audio: data.audio,
                everyday: data.everyday,
            });
            setSelectedData({
                selectedCampuses: data.selectedCampuses,
                availableRooms: data.availableRooms,
            });
        } catch (error) {
            console.error('Error fetching announcement data:', error);
        }
    };

    const handleAudioRecordingComplete = (audioBase64) => {
        setFormData((prevData) => ({
            ...prevData,
            audio: audioBase64,
        }));
    };
    // const handleChange = (fieldName, value) => {
    //     console.log('fieldName:', fieldName);
    // console.log('value:', value);
    //     if (fieldName === 'everyday') {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             everyday: !prevData.everyday,
    //             time: !prevData.everyday ? null : prevData.time, // Reset time when everyday is toggled
    //             date: !prevData.everyday ? prevData.date : null, // Reset date when everyday is toggled
    //         }));
    //     } else if (fieldName === 'audioFileName') {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [fieldName]: value,
    //         }));
    //     } else {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [fieldName]: value,
    //         }));
    //     }
    // };
    const  handleChange =(name,value)=>{
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }
    
  


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    audio: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Format the date
          const formattedDate = new Date(formData.date).toISOString().split('T')[0];
  
          const mergedData = {
              ...formData,
              ...selectedData,
              date: formattedDate, // Use the formatted date here
          };
  
          const response = await fetch(`http://localhost:5000/api/edit/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token'),
              },
              body: JSON.stringify(mergedData),
          });
  
          if (response.ok) {
              const json = await response.json();
              console.log(json);
              setFormData({
                  AnouncementName: '',
                  Description: '',
                  date: '',
                  time: null,
                  everyday: false,
              });
              setSelectedData({
                  selectedCampuses: [],
                  availableRooms: [],
              });
              navigate('/update');
          } else {
              console.error('Failed to edit announcement');
          }
      } catch (error) {
          console.error('Error in handleSubmit:', error);
      }
  };

    return (
        <div className="mt-16 text-lg font-semibold">
            <h1 className="w-[80%] m-auto mb-4">Edit Announcement:</h1>
            <form className="bg-white w-[80%] rounded-lg m-auto pb-16 flex flex-col" onSubmit={handleSubmit}>
                <div>
                    <div className="flex flex-row flex-wrap">
                        {/* <input type=a"text" name="AnouncementName" placeholder="e.g. meet in Auditorium" label="Announcement Name:" className="" onChnge={(value) => handleChange('AnouncementName', value)} value={formData.AnouncementName} /> */}
                        {/* <input type="text" name='heoo' onChange={handlevalue} /> */}
                        
                        <Input type="text" name="AnouncementName" placeholder="e.g. meet in Auditorium"label="Announcement Name:" onChange={handleChange} value={formData.AnouncementName} />

                        <Input type="text" name="Description" placeholder="5 - 6 words of Description (if any)" label="Announcement Description:" className="" onChange={handleChange} value={formData.Description} />
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-row w-1/2">
                            <div className="flex items-center my-auto mx-8">
                                <input
                                    type="checkbox"
                                    id="everyday"
                                    name="everyday"
                                    checked={formData.everyday}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
                                />
                                <label htmlFor="everyday" className="ml-2 text-gray-700">
                                    Everyday
                                </label>
                            </div>
                            {formData.everyday ? (
                                <Input type="time" name="time" label="Time:" classNameDiv="ms-0 w-[41%]" onChange={handleChange} value={formData.time} />
                            ) : (
                                <Input type="date" name="date" label="Date:" className="" onChange={handleChange} value={formData.date} />
                            )}
                        </div>
                        {!formData.everyday && (
                            <Input type="time" name="time" label="Time:" classNameDiv="ms-0 w-[41%]" onChange={handleChange} value={formData.time} />
                        )}
                        <div className="w-1/2 pt-8">
                            <label htmlFor="audioFile" className="bg-green-300 w-[90%] py-2 rounded-lg text-green-900 text-center mt-1 mb-4 border-none focus:outline-none block mt-8 cursor-pointer">
                                Upload MP3 File
                            </label>
                            <input
                                type="file"
                                id="audioFile"
                                name="audioFile"
                                accept="audio/mpeg"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <CampusRoomSelector onSubmit={(data) => setSelectedData(data)} />
                    <Input type="text" name="audioFileName" label="Audio File Name:" onChange={ handleChange} value={formData.audioFileName} placeholder="eg. Nation" />
                </div>
                <button className="block p-2 bg-blue-600 rounded-lg w-1/5 mx-auto mt-8 text-white font-semibold">Save Changes</button>
            </form>
        </div>
    );
};
