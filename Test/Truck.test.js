const Truck = require('../model/Truck');
 const mongoose = require('mongoose');
 const url = 'mongodb://localhost:27017/webapitest'; // use the new name of the database 
 
beforeAll(async () => {  
       await mongoose.connect(url, {         
           useNewUrlParser: true, 
        useCreateIndex: true     }); }); 
 
afterAll(async () => { 
 
    await mongoose.connection.close(); }); 
 
describe('Truck  Schema test', () => {    
    var id='';
     it('Add Truck testing', () => {         
         const truck = { 
	 
             
'truckimage':'Truck1562405407249.jpg',
'tname': 'Smalltruck'  ,		
'ttype':'Electric',
'tdesc':'Good',
'tmil':'40',
'trent':'4000'	 
             };                  
             return Truck.create(truck)             
             .then((trucks) => {                 
                 expect(trucks.tname).toEqual('Smalltruck');            
                 });
                     }); 
 
  /*    it('to test the delete venue is working or not', async () => {         
         const status = await Truck.deleteMany();         
         expect(status.ok).toBe(1); });  */  

   it('to test the update', async () => {
        const updatetruck = {
            tname: "DucatiMonster212truck"
        }
        console.log(id)
                    return Truck.findOneAndUpdate(id,updatetruck,{new :true }).then(
                        (updatetruck) => {
                            expect(updatetruck.tname).toEqual('DucatiMoster212truck');
                        });



    }); 



		 
}) 