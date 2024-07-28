const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');

app.use(express.json());

const db = require('./config/db');
db();

const userRoutes = require('./routes/userAuth');
const tenderRoutes = require('./routes/tenderRouter');
const getCategoryStatus = require('./routes/deptStatusRoute');
const updateDocument = require('./routes/docRoutes')

app.use('/api/v1', userRoutes);
app.use('/api/v1', tenderRoutes);
app.use('/api/v1', updateDocument);
// app.use('/api/v1', deptRoutes);


// Set up GridFS storage
// const storage = new GridFsStorage({
//   url: process.env.DATABASE_URL, 
//   file: (req, file) => {
//     return {
//       bucketName: 'uploads',
//       filename: `${Date.now()}-${file.originalname}`
//     };
//   }
// });

const imageStorage = multer.diskStorage({
   destination: '/sampleImage',
   filename: (req, file, cb) => {
       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({ storage: imageStorage });

// const upload = multer({ 
//   storage: Image,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
// //   fileFilter: (req, file, cb) => {
// //     console.log('File type:', file.mimetype);
// //     if (file.mimetype !== 'application/pdf') {
// //       return cb(new Error('Only PDF files are allowed!'));
// //     }
// //     cb(null, true);
// //   }
// });



// New route for PDF upload
app.post('/api/v1/upload', upload.single('pdfFile'), async (req, res) => {
   if (!req.file) {
     return res.status(400).send('No file uploaded.');
   }
 
   // Ensure the file is saved and accessible
   try {
     const fileId = req.file._id; // Access the _id property correctly
     console.log
     if (!fileId) {
       return res.status(500).send('File upload failed, no ID returned.');
     }
     res.send(`PDF uploaded successfully to MongoDB! File ID: ${fileId}`);
   } catch (error) {
     console.error('Error accessing file ID:', error);
     res.status(500).send('An error occurred while uploading the file.');
   }
 });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});