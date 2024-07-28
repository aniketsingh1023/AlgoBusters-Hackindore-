const express=require('express');
const router = express.Router();

const { updateDocument, createDocument, getDocuments }= require('../controllers/documentController');

router.post('/createDocument', createDocument);
router.get('/getDocument', getDocuments);
router.put('/updateDocument', updateDocument);

module.exports = router;