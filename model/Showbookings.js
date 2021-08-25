const mongoose = require('mongoose');

const showcarSchema = new mongoose.Schema({
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car',
        required: true
    },
    status: {
        type: String
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

})
const showcar = mongoose.model('showcar', showcarSchema)
module.exports = showcar 