const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);

let noteList = []

//GET route for retrieving all the notes
router.get('/notes', (req, res) => {
    returnJson(res)
})

//POST route for new note
router.post('/notes', (req, res) => {
    //grab req.body
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4()
    };

    readFromFile('db/db.json').then((data) => {
        let jsonData = JSON.parse(data)
        jsonData.push(newNote);
        writeToJson(jsonData);
        returnJson(res);
    })
})

//DELETE route 
router.delete('/notes/:id', (req, res) => {
    const id = req.params['id'];
    readFromFile('db/db.json').then((data) => {
        let actualData = JSON.parse(data);
        for (let i = 0; i < actualData.length; i++) {
            if (actualData[i].id === id) {
                actualData.splice(i, 1);
                writeToJson(actualData);
                break;
            }
        }
    });
    returnJson(res);
});

function returnJson(res) {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
}

function writeToJson(notes) {
    fs.writeFileSync('db/db.json', JSON.stringify(notes), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('file was saved');
    })
}

module.exports = router;