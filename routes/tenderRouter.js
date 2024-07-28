const express=require('express');
const router = express.Router();

const { CreateTender, getTender, deleteTender, updateTender  } = require('../controllers/TenderController');
router.post('/createTender', CreateTender);
router.get('/getTender', getTender);
router.delete('/deleteTender/:id', deleteTender);
router.put('/updateTender/:id', updateTender);

module.exports = router;