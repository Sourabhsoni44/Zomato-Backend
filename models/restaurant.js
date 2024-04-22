let mongoose = require('mongoose')
let restroSchema=mongoose.Schema({
    name:{
        type:String,
        
    },
    address:{
        type:String, 
    },
    description:{
        type:String,
       
    },
    image:{
        type:String, 
    },
    contactNo:{
        type:String, 
    },
    openingTime:{
        type:String, 
    }
})
let restaurant= mongoose.model('restaurant',restroSchema)
module.exports=restaurant


