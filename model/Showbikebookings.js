const mongoose = require('mongoose');

const showbikeSchema = new mongoose.Schema({
    
    bid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bike',
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
        const showbike= mongoose.model('showbike',showbikeSchema)
    module.exports = showbike 