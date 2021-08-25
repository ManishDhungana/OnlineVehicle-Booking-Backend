const Bike = require('../model/Bike');
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

describe('Bike  Schema test', () => {
    var id='';
    it('Add Bike upload', () => {
        const bike = {
			'bikeimage':'ducati.jpg',
			'bname':'Monster',
            'btype': 'Petrol',
            'bdesc':'Good working condition',
            'bmil':'22',
            'brent':'2000'
			
			
        };
        return Bike.create(bike)
            .then((bikes_res) => {
				id=bikes_res._id
                expect(bikes_res.bname).toEqual('Monster');
            });
    });


 

   it('to test the update', async () => {
        const updatebike = {
            bname: "DucatiMonster22"
        }
        console.log(id)
                    return Bike.findOneAndUpdate(id,updatebike,{new :true }).then(
                        (updatebike) => {
                            expect(updatebike.bname).toEqual('DucatiMoster212');
                        });



    });  

    it('to test the delete bike is working or not', async () => {         
        const status = await Bike.deleteMany();         
        expect(status.ok).toBe(1); });
});