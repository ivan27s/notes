const {Router} =require('express');
const router =Router();
const Note =require('../models/Note');
const auth =require('../middleware/auth.middleware');
const keys = require('../keys/index');

router.get('/',auth, async (req,res)=>{
    try{
        const notes=await Note.find({owner: req.user.userId});
        res.json(notes)
    }catch (e) {
        res.status(500).json({message:"Try again"})
    }
});

router.delete('/:noteId',auth, async (req,res)=>{
    try{
        await Note.findByIdAndRemove(req.params.noteId);
    }catch (e) {
        res.status(500).json({message:"Error"})
    }
});

router.post('/addNote',auth, async (req,res)=>{
    try{
        const {title,text}= req.body;
        const note =new Note({
            title,text, owner: req.user.userId
        });
        await note.save();

        res.status(201).json({note});

    }catch (e) {
        res.status(500).json({message:"Try again"+ e})
    }
});

module.exports =router;