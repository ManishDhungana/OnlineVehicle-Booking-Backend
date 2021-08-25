const mongoose = require('mongoose');

const truckrateSchema = new mongoose.Schema({
     
    tid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'truck',
    required: true
 },
       
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }, 
        rating:
        {type:String,
        required:true}
       
    })
        const truckrate= mongoose.model('truckrate',truckrateSchema)
    module.exports = truckrate 