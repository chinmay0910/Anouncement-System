const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' })); 

const fs = require('fs');

function createAudioFileFromBase64(base64Data, audioFileName) {
    const base64WithoutPrefix = base64Data.replace(/^data:[^;]+;base64,/, '');
    const outputPath = "./audio/" + audioFileName + ".mp3"; // Adjust the path as needed

    const binaryData = Buffer.from(base64WithoutPrefix, 'base64');
    const fileStream = fs.createWriteStream(outputPath);

    fileStream.write(binaryData);
    fileStream.end();

    console.log(`Audio file created at ${outputPath}`);
}


// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Filename for uploaded files
    }
});

// Initialize multer instance with configuration
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 50 } })


// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yashshree',
    database: 'anouncements',
    // port: 3306
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');

    // Create the table if it doesn't exist
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS announcements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        AnouncementName VARCHAR(255) NOT NULL,
        Description TEXT NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(255) NOT NULL,
        audio TEXT NOT NULL,
        selectedCampuses JSON NOT NULL,
        availableRooms JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        // console.log('Table "announcements" created (if it did not exist)');
    });
});

// API endpoint to handle POST request and save data to database
app.post('/api/add', upload.single('audio'), (req, res) => {
    // console.log(req.body);
    const formData = req.body;

    // Convert arrays to JSON strings (if not already)
    const selectedCampusesJSON = Array.isArray(formData.selectedCampuses) ? JSON.stringify(formData.selectedCampuses) : formData.selectedCampuses;
    const availableRoomsJSON = Array.isArray(formData.availableRooms) ? JSON.stringify(formData.availableRooms) : formData.availableRooms;
    createAudioFileFromBase64(req.body.audio, req.body.audioFileName);
    // SQL query to insert data into database
    const sql = 'INSERT INTO announcements (AnouncementName, Description, date, time, audio, selectedCampuses, availableRooms) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.AnouncementName, formData.Description, formData.date, formData.time, 'Backend/audio/' + req.body.audioFileName, selectedCampusesJSON, availableRoomsJSON];

    // Execute the SQL query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: 'Failed to create announcement' });
            return;
        }
        console.log('Announcement created successfully');
        res.status(200).json({ message: 'Announcement created successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
