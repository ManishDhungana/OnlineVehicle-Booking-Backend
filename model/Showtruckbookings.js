const mongoose = require('mongoose');

const showtruckSchema = new mongoose.Schema({
 tid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'truck',
    required: true
 },
        status:{
            type:String
        },
        
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
       
    })
        const showtruck= mongoose.model('showtruck',showtruckSchema)
    module.exports = showtruck 