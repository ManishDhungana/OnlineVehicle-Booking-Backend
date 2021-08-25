const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    bikeimage: { // column name
        
        type: String   //data type String
    },
        bname: { // column name
            type: String   //data type String
        },
        btype: { // column name
            type: String   //data type String
        },
        bdesc: { // column name
            type: String   //data type String
        },
        bmil: {  // column name
            type: String  //data type Number
        },
        brent: {  // column name
            type: String  //data type Number
        }
       
    })

        const bike= mongoose.model('bike',bikeSchema)
    module.exports = bike 
    