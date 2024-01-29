const express = require('express')
const router = express.Router()
const multer = require('multer');
const addAnouncement = require('../models/Anouncement');
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });

// Route 1: Get All the Notes using: GET route of "http://localhost:5000/api/add/fetchall"
router.get('/fetchall',async(req, res)=>{

    try {
      const Anouncement = await addAnouncement.find({});
      res.json(Anouncement);
    } catch (err) {
      res.status(500).json("Internal Server Error || fetchall-Anouncement")
    }
  
  
  })

  // Route 2: Get All the Notes using: GET route of "http://localhost:5000/api/add/"
  router.post('/', upload.none(), async (req, res) => {
    try {
        const newAnnouncement = new addAnouncement(req.body);
        const savedAnnouncement = await newAnnouncement.save();
        res.json(savedAnnouncement);
    } catch (error) {
        console.error('Error saving data to the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router