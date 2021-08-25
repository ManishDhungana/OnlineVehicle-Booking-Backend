const mongoose = require('mongoose');

const bikerateSchema = new mongoose.Schema({
     
    bid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bike',
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
        const bikerate= mongoose.model('bikerate',bikerateSchema)
    module.exports = bikerate 