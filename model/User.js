const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({

        userfname: { // column name
            type: String   //data type String
        },
        userlname: { // column name
            type: String   //data type String
        },
        date: { // column name
            type: Date  //data type String
        },
        username: { // column name
            type: String   //data type String
        },
        password: {  // column name
            type: String  //data type Number
        },
        cpassword: {  // column name
            type: String  //data type Number
        },
        
        Usertype:{
            type:String,
            
        },
        tokens:[{token: {type:String}}]
       
    })

    userSchema.statics.test = function(user, pass){
        console.log(user)
        console.log(pass)
        }

        userSchema.statics.myFirst=function(user,pass){
            if(user=="admin" && pass=="1234"){
                console.log("Welcome you fool")
            }
            else{
                console.log("You are fool");
            }
           
        }
        userSchema.statics.checkCrediantialsDb = async (user22, pass) =>{

            const user1 = await user.findOne({username : user22, password : pass})
             return user1;
    }

            userSchema.methods.generateAuthToken = async function () {
                const user = this
               const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
               
               console.log(token);
                user.tokens = user.tokens.concat({ token :token })
                await user.save()
                return token
               }
        
        const user= mongoose.model('user',userSchema)
    

    module.exports = user 
    //User is const name