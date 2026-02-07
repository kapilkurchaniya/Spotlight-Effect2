const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static("./public")); //user access kr skta hai public folder k ander ki files ko browsers se 

const noteModel = require('./models/notes.model');
const { log } = require('console');

app.post('/notes', async (req, res) => {
    const { title, description } = req.body;
        const note = await noteModel.create({ title, description });

    res.status(201).json({
        message: "note created successfully",
        note //        const note = await noteModel.create({ title, description }); iske karan call ho rha hai
    })
})
app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "all notes fetched successfully",
        notes
    })
})
app.delete('/notes/:id', async (req, res) => {
    const id  = req.params.id;
        // const {id}  = req.params;
    await noteModel.findByIdAndDelete(id);  
    res.status(200).json({
        message: "note deleted successfully"
    })
});
app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { title,description } = req.body;
    await noteModel.findByIdAndUpdate(id, { description });
    res.status(200).json({
        message: "note updated successfully"
    })
});
console.log(__dirname);

app.use('*name', (req,res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"))
    //  res.sendFile(path.join(__dirname,"..","/public/index.html"))

})

    
module.exports = app;