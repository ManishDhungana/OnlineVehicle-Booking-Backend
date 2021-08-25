const User = require('../model/user');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/webapitest'; // use the new name of the database 

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('User  Schema test', () => {
    var id='';
    it('Add User testing', () => {
        const user = {
			'userfname':'Manil',
			'userlname':'Shakya',
            'username': 'manil@gmail.com',
			'password':'manil123',
			'cpassword':'manil123',
			'Usertype':'User'
			
        };
        return User.create(user)
            .then((users_res) => {
				id=users_res._id
                expect(users_res.userlname).toEqual('Shakya');
            });
    });


 


        //update user
        it('to test the update', async () => {
const updateuser = {
    username: "Manik"
}
console.log(id)
            return User.findOneAndUpdate(id,updateuser,{new :true }).then(
                (updateuser) => {
                    expect(updateuser.username).toEqual('Manik');
                });
                
                   
               
        });



    });