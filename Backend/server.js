const express = require('express');
const mysql = require('mysql');
const util = require('util');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

const createAudioFileFromBase64 = (base64Data, audioFileName) => {
    const base64WithoutPrefix = base64Data.replace(/^data:[^;]+;base64,/, '');
    const outputPath = "./audio/" + audioFileName + ".mp3";

    const binaryData = Buffer.from(base64WithoutPrefix, 'base64');
    const fileStream = fs.createWriteStream(outputPath);

    fileStream.write(binaryData);
    fileStream.end();

    console.log(`Audio file created at ${outputPath}`);
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 50 } });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pradip',
    database: 'kanchan',
    port: '3307'
});

const queryAsync = util.promisify(db.query).bind(db);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS announcements (
            id INT AUTO_INCREMENT PRIMARY KEY,
            AnouncementName VARCHAR(255) NOT NULL,
            Description TEXT NOT NULL,
            date DATE,
            time VARCHAR(255) NOT NULL,
            audio TEXT NOT NULL,
            selectedCampuses JSON NOT NULL,
            availableRooms JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `;

    queryAsync(createTableQuery)
        .then(() => {
            console.log('Table "announcements" created (if it did not exist)');
        })
        .catch((error) => {
            console.error('Error creating table:', error);
        });
});

app.post('/api/add', upload.single('audio'), async (req, res) => {
    const formData = req.body;

    const selectedCampusesJSON = Array.isArray(formData.selectedCampuses) ? JSON.stringify(formData.selectedCampuses) : formData.selectedCampuses;
    const availableRoomsJSON = Array.isArray(formData.availableRooms) ? JSON.stringify(formData.availableRooms) : formData.availableRooms;

    createAudioFileFromBase64(req.body.audio, req.body.audioFileName);

    const sql = 'INSERT INTO announcements (AnouncementName, Description, date, time, audio, selectedCampuses, availableRooms) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.AnouncementName, formData.Description, formData.date, formData.time, 'Backend/audio/' + req.body.audioFileName, selectedCampusesJSON, availableRoomsJSON];

    try {
        await queryAsync(sql, values);
        console.log('Announcement created successfully');
        res.status(200).json({ message: 'Announcement created successfully' });
    } catch (error) {
        console.error('Error inserting data into database:', error);
        res.status(500).json({ error: 'Failed to create announcement' });
    }
});

app.get('/api/announcements', async (req, res) => {
    const selectQuery = 'SELECT * FROM announcements';

    try {
        const result = await queryAsync(selectQuery);
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/announcements/:id', async (req, res) => {
    const announcementId = req.params.id;
    const selectQuery = 'SELECT * FROM announcements WHERE id = ?';

    try {
        const result = await queryAsync(selectQuery, [announcementId]);

        if (result.length === 0) {
            res.status(404).json({ error: 'Announcement not found' });
            return;
        }

        res.json(result[0]);
    } catch (error) {
        console.error('Error fetching announcement data:', error);
        res.status(500).json({ error: 'Failed to fetch announcement data' });
    }
});

app.put('/api/edit/:id', upload.single('audio'), async (req, res) => {
    console.log('Received data in PUT request:',req.body);
    const announcementId = req.params.id;
    const formData = req.body;

    const selectedCampusesJSON = Array.isArray(formData.selectedCampuses) ? JSON.stringify(formData.selectedCampuses) : formData.selectedCampuses;
    const availableRoomsJSON = Array.isArray(formData.availableRooms) ? JSON.stringify(formData.availableRooms) : formData.availableRooms;

    if (req.body.audio) {
        createAudioFileFromBase64(req.body.audio, req.body.audioFileName);
        formData.audio = 'Backend/audio/' + req.body.audioFileName;
    }

    const sql = `
        UPDATE announcements 
        SET 
            AnouncementName = ?,
            Description = ?,
            date = ?,
            time = ?,
            audio = ?,
            selectedCampuses = ?,
            availableRooms = ?
        WHERE id = ?
    `;

    const values = [
        formData.AnouncementName,
        formData.Description,
        formData.date,
        formData.time,
        formData.audio,
        selectedCampusesJSON,
        availableRoomsJSON,
        announcementId
    ];

    try {
        await queryAsync(sql, values);
        console.log('Announcement updated successfully');
        res.status(200).json({ message: 'Announcement updated successfully' });
    } catch (error) {
        console.error('Error updating data in the database:', error);
        res.status(500).json({ error: 'Failed to update announcement' });
    }
});
app.delete('/api/delete/:id', async (req, res) => {
    const announcementId = req.params.id;
    const deleteQuery = 'DELETE FROM announcements WHERE id = ?';

    try {
        const result = await queryAsync(deleteQuery, [announcementId]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Announcement not found' });
            return;
        }

        console.log('Announcement deleted successfully');
        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ error: 'Failed to delete announcement' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


