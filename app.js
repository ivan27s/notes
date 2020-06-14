const express = require('express');
const path =require('path');
const mongoose = require('mongoose');
const keys = require('./keys/index');

const app =express();
app.use(express.json({extended:true}));

app.use('/api/auth',require('./routes/authRouter'));
app.use('/api/notes',require('./routes/notesRouter'));

if(process.env.Node_ENV ==='production'){
    app.use('/',express.static(path.join(__dirname,'client','build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build',index.html))
    })
}

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true});
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        });
    }catch (e) {
        console.log(e)
    }

}
start();