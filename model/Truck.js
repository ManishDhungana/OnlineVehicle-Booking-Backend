const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    truckimage: { // column name
        
        type: String   //data type String
    },
        tname: { // column name
            type: String   //data type String
        },
        ttype: { // column name
            type: String   //data type String
        },
        tdesc: { // column name
            type: String   //data type String
        },
        tmil: {  // column name
            type: String  //data type Number
        },
        trent: {  // column name
            type: String  //data type Number
        }/* ,
        userId: {
            type: String
        } */
       
    })

   
        
        const truck= mongoose.model('truck',truckSchema)
    

    module.exports = truck
    //User is const name