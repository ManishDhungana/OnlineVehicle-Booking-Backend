const Car = require('../model/Car');
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

describe('Car  Schema test', () => {
    var id='';
    it('Add Car upload and delete of car testing', () => {
        const car = {
			'carimg':'abc.jpg',
			'cname':'Volkswagen',
            'ctype': 'Diesel',
			'cdesc':'Good working condition'
			
			
        };
        return Car.create(car)
            .then((cars_res) => {
				id=cars_res._id
                expect(cars_res.cname).toEqual('Volkswagen');
            });
    });


 

//deleting car
it('to test the delete car is working or not', async () => {         
         const status = await Car.deleteMany({ctype:'Diesel'});         
         expect(status.ok).toBe(1); });



    });