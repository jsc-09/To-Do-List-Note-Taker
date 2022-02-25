const router = require('express').Router();
const fs = require('fs');
const db = require('../../db/db.json')

//GET route for retrieving all the notes
router.get('/notes', (req, res) => {
    res.json(db)
})

//POST route for new note
router.post('/notes', (req, res) => {
    //grab req.body
    const  {title , text} = req.body;
    
    const newNote = {
        title,
        text
    };
    
    /*
    if (req.body) {
        const newNote = {
            title,
            text
        };

        getAndRenderNote(newNote, '../../db/db.json');
        res.json(`New Note added successfully.`);
    } else {
        res.error('Error in adding note.')
    }*/

    
    db.push(newNote);
    fs.writeFileSync(path.resolve(__dirname, '../../db/db.json'), JSON.stringify(newNote));
    //use fs to rewrite database 

   res.json(db)

})



module.exports = router;