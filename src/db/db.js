
const mongoose=require('mongoose')

async function connectDB () {
    //console.log("efefefe",process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully!")
        
    } catch (error) {
        console.error("Database connection error: ",error)
        process.exit();
        
    }
    


}

module.exports=connectDB