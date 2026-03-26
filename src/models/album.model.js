const mongoose = require('mongoose')


const albumSchema= new mongoose.Schema({
    title:{
        type: String,
        require: true,
        
    },
    musics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"musics"
    }],
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    }
})

const albumModel= mongoose.model("albums",albumSchema)


module.exports=albumModel