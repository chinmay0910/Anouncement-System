import React, { useEffect, useState } from 'react';
import { UpdateFeild } from '../components/UpdateFeild.jsx';
import { IconSearch } from '@tabler/icons-react';

export const Update = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/announcements');
            const data = await response.json();
            setAnnouncements(data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const handleDeleteClick = async (ann_no) => {
        try {
            const response = await fetch(`http://localhost:5000/api/delete/${ann_no}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                console.log('Announcement deleted successfully');
                // Fetch updated announcements
                fetchAnnouncements();
            } else {
                console.error('Failed to delete announcement');
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const filteredAnnouncements = announcements.filter((announcement) =>
        String(announcement.AnouncementName).includes(searchQuery)
    );

    return (
        <div className="mt-16 text-lg font-semibold">
            <div className="flex flex-col">
                <div className="flex flex-row bg-white border-black border-2 mx-[14%] rounded-xl shadow-lg">
                    <input
                        type="text"
                        className="p-4 rounded-xl outline-none w-[96%]"
                        placeholder="Search with Announcement Name."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconSearch className="my-auto" />
                </div>
                <div className="flex flex-col mx-[14%] mt-12">
                    {filteredAnnouncements.map((announcement) => (
                        <UpdateFeild
                            key={announcement.id}
                            ann_no={announcement.id}
                            name={announcement.AnouncementName}
                            location={announcement.audio}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
