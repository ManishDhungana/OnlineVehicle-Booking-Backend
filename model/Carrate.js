const mongoose = require('mongoose');

const carrateSchema = new mongoose.Schema({
     
    cid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car',
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
        const carrate= mongoose.model('carrate',carrateSchema)
    module.exports = carrate 