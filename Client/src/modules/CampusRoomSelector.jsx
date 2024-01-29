import React, { useState, useEffect } from 'react';

const CampusRoomSelector = ({ onSubmit }) => {
    const [selectedCampuses, setSelectedCampuses] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);

    const handleCheckboxChange = (campus) => {
        setSelectedCampuses((prevSelected) =>
            prevSelected.includes(campus)
                ? prevSelected.filter((selected) => selected !== campus)
                : [...prevSelected, campus]
        );
    };

    const handleRoomCheckboxChange = (room) => {
        setAvailableRooms((prevRooms) =>
            prevRooms.includes(room) ? prevRooms.filter((prevRoom) => prevRoom !== room) : [...prevRooms, room]
        );
    };

    const renderRoomCheckboxes = () => {
        // Replace this with your logic to fetch available rooms based on selected campuses
        // For demonstration purposes, this is a simple example
        const campusRoomsMap = {
            VIT: ['Room1', 'Room2', 'Room3'],
            VP: ['RoomA', 'RoomB', 'RoomC'],
            VSIT: ['RoomX', 'RoomY', 'RoomZ'],
        };

        const allRooms = selectedCampuses.flatMap((campus) => campusRoomsMap[campus]);
        const roomCheckboxes = allRooms.map((room) => (
            <label key={room} className='flex flex-row justify-between mx-2 text-gray-700'>
                {room}
                <input
                    type="checkbox"
                    value={room}
                    checked={availableRooms.includes(room)}
                    onChange={() => handleRoomCheckboxChange(room)}
                />
            </label>
        ));

        return roomCheckboxes.length > 0 ? roomCheckboxes : <p className='mx-2 text-gray-800'>No room is selected.</p>;
    };

    useEffect(() => {
        // You can perform any side effect or data submission here
        // For example, you can call onSubmit with the selected data
        onSubmit({ selectedCampuses, availableRooms });
    }, [selectedCampuses, availableRooms]);

    return (
        <div>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-[45%] mx-4 my-8 border-2 rounded-md">
                    <h3 className='mx-2'>Select Building</h3><hr className='mx-2' />
                    {/* Checkboxes for campuses */}
                    <div className='flex flex-col mx-2 text-gray-700'>
                        <label className='flex flex-row justify-between'>
                            VIT
                            <input type="checkbox" value="VIT" onChange={() => handleCheckboxChange('VIT')} />
                        </label>
                        <label className='flex flex-row justify-between'>
                            VP
                            <input type="checkbox" value="VP" onChange={() => handleCheckboxChange('VP')} />
                        </label>
                        <label className='flex flex-row justify-between'>
                            VSIT
                            <input type="checkbox" value="VSIT" onChange={() => handleCheckboxChange('VSIT')} />
                        </label>
                    </div>
                </div>
                {/* Checkboxes for available rooms */}
                <div className="flex flex-col w-1/2 mx-4 my-8 border-2 rounded-md">
                    <h3 className='mx-2'>Block / Room Details: </h3><hr className='mx-2' />
                    <div className='h-[100px] overflow-y-auto '>
                    {renderRoomCheckboxes()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampusRoomSelector;
