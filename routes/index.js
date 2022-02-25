const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes)

//GET Route for Notes Page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})
//GET Route for Homepage
router.get('*' , (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router; 