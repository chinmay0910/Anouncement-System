const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
app.use(cors());
const port = 5000;

// Increase the payload size limit
app.use(express.json({ limit: '50mb' }));

app.use('/api/add', require('./routes/addAnouncement.js'));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
