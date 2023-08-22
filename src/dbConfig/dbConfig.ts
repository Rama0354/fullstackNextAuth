import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGOO_URI!)
        const connetion = mongoose.connection
        connetion.on('connected',()=>{
            console.log('MongooDB connection Success')
        })
        connetion.on('error',(err)=>{
            console.log('MongooDB is error, check your database connection '+ err)
            process.exit()
        })
        
    } catch (error) {
        console.log('something wens wrong!')
        console.log(error)
    }
}