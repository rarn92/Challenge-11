const notes = require('express').Router();
let store = require('../db/db.json');
const {writeFile} = require('fs');

console.log(store);

// GET Route for retrieving all the notes
notes.get('/', (req, res) => res.json(store));

// POST Route for a new note
notes.post('/', ({body}, res) => {
  body.id = store.length;

  store.push(body);
  writeFile('./db/db.json', JSON.stringify(store), ()=> console.log("Note added"));
});

notes.delete('/:id', ({params}, res) => {
  store = store.filter(obj => obj.id != params.id);
  console.log('store: ', store);
  writeFile('./db/db.json', JSON.stringify(store), (err)=> {
    if(err) throw err;
    console.log(`Note id ${params.id} was removed`);
})
});

module.exports = notes;
