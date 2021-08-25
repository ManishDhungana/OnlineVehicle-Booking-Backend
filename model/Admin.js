const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const adminSchema = new mongoose.Schema({

        adminfname: { // column name
            type: String   //data type String
        },
        adminlname: { // column name
            type: String   //data type String
        },
        
        adminusername: { // column name
            type: String   //data type String
        },
        adminpassword: {  // column name
            type: String  //data type Number
        },
        tokens:[{token: {type:String}}]
       
    })

    /* adminSchema.statics.test = function(user, pass){
        console.log(user)
        console.log(pass)
        } */
/* 
        adminSchema.statics.myFirst=function(user,pass){
            if(user=="admin" && pass=="1234"){
                console.log("Welcome you fool")
            }
            else{
                console.log("You are fool");
            }
           
        } */
     adminSchema.statics.checkCrediantialsDb = async (admin22, apass) =>{

            const admin1 = await admin.findOne({ausername : admin22, apassword : apass})
             return admin1;
    }
 
            adminSchema.methods.generateAuthToken = async function () {
                const admin = this
               const token = jwt.sign({ _id: admin._id.toString() }, 'thisismynewcourse')
               
               console.log(token);
                admin.tokens = admin.tokens.concat({ token :token })
                await admin.save()
                return token
               }
        
        const admin= mongoose.model('admin',adminSchema)
    

    module.exports = admin
    //User is const name