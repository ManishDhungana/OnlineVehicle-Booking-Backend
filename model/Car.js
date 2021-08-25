const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    /* cid: {
        type: String
    }, */
    carimg: { // column name
        type: String   //data type String
    },
    cname: { // column name
        type: String   //data type String
    },
    ctype: { // column name
        type: String   //data type String
    },
    cdesc: { // column name
        type: String   //data type String
    }
   

})
const car = mongoose.model('car', carSchema)
module.exports = car 