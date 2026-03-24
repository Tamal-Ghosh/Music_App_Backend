const mongoose= require('mongoose')

const musicSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type: String,
        enum:['user','atrist'],
        default:'user'
    }
})

const userModel= mongoose.model('users',userSchema);

module.exports=userModel