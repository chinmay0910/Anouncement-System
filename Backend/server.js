const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' })); 

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
        date DATE,
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

        // Add a new cronjob to note.txt
        // const cronExpression = `${formData.time} ${formData.date} * *`;
        // const cronCommand = 'YourCronCommandHere'; // Replace with your actual cron command
        // const cronJobEntry = `${cronExpression} ${cronCommand}\n`;

        const dateTime = new Date(`${formData.date} ${formData.time}`);

        let minute = dateTime.getMinutes();
        let hour = dateTime.getHours();
        const day = dateTime.getUTCDate();
        const month = dateTime.getUTCMonth()+1;

        // minute hour day month dayOFWeek commandToExecute
        if (minute < 3) {
            minute += 60;  // Add 60 minutes to handle negative values
            hour -= 1;     // Subtract 1 from hour to adjust
        }
    
        // Calculate times for each entry
        const threeMinutesBefore = `${minute - 2} ${hour} ${day} ${month}`;
        const twoMinutesBefore = `${minute - 1} ${hour} ${day} ${month}`;
        const givenTime = `${minute > 59 ? minute - 60 : minute} ${hour + (minute > 59 ? 1 : 0)} ${day} ${month}`;
    
        // Add cron job entries to note.txt
        const cronJobEntry1 = `${threeMinutesBefore} * mpc clear\n`;
        const cronJobEntry2 = `${twoMinutesBefore} * mpc add ${formData.audioFileName}.mp3\n`;
        const cronJobEntry3 = `${givenTime} * mpc play\n`;

        const cronJobEntry = "\n"+cronJobEntry1+cronJobEntry2+cronJobEntry3;

        fs.appendFile('note.txt', cronJobEntry, (err) => {
            if (err) {
                console.error('Error adding cronjob to note.txt:', err);
            } else {
                console.log('Cronjob added to note.txt');
            }
        });

        res.status(200).json({ message: 'Announcement created successfully' });
    });
});

// Endpoint to fetch announcements
app.get('/api/announcements', (req, res) => {
    const selectQuery = 'SELECT * FROM announcements';

    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Failed to fetch data' });
            return;
        }

        res.json(result);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
