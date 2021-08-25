const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    
        email: { // column name
            type: String   //data type String
        },
        title: {  // column name
            type: String  //data type Number
        },
        subject: { // column name
            type: String   //data type String
        },
        message: { // column name
            type: String   //data type String
        },
        userId: {
            type: String
        }
       
    })

   
        
        const contact= mongoose.model('contact',contactSchema)
    

    module.exports = contact
   