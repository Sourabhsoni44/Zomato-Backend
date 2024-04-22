
let mongoose=    require('mongoose')
const restaurant = require('./restaurant')
      let productSchema=   new  mongoose.Schema({
        name:{
            type:String
        },
        description:{
            type:String
        },
        price:{
            type:Number
        },
        image:{
            type:String
        },
        restaurant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Restaurant'
        }
      })

     let Product=    mongoose.model('Product',productSchema)
     module.exports=Product
