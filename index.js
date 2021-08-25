
const express = require('express');
const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');
const auth = require('./middleware/auth')
const mongoose = require('./db/mongoose')
const path = require('path');
const app = express();
const multer = require('multer');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const User = require('./model/User');
const Car = require('./model/Car');
const Bike = require('./model/Bike');
const Truck = require('./model/Truck');
const Showbookings = require('./model/Showbookings');
const Showbikebookings = require('./model/Showbikebookings');
const Showtruckbookings = require('./model/Showtruckbookings');
const bikerate = require('./model/Bikerate');
const truckrate = require('./model/Truckrate');
const carrate = require('./model/Carrate');
const Contact = require('./model/Contact');
//



const middleware = require('./middleware/middleware');
require('./db/mongoose');
app.get("/test11", middleware, function (req, res) {
  console.log("this should load after the middleware");

})
app.use('/images', express.static('./cars'));
app.use('/images', express.static('./bikes'));
app.use('/images', express.static('./trucks'));
app.use(bodyParser.urlencoded({ extended: false }));

/* ==========================================Registration form for user=========================================================================== */
app.post('/upload', (req, res) => {
  console.log(req.body);
  var mydata = new User(req.body);

  mydata.save().then(function () {
    //alert(Success)
    res.send('fine');
  }).catch(function (e) {
    res.send(e);


  });
});


app.get('/users', function (req, res) {
  User.find().then(function (user) {
    res.send(user);
  }).catch(function (e) {
    res.send(e)
  });

});

/* ======================================End of user registration ================================================================================= */


/* =================================Login and Lgout form for both admin and user==================================================================== */

app.post("/login22", async function (req, res) {
  const user = await User.checkCrediantialsDb(req.body.username, req.body.password)
  console.log(user);
  if (user) {
    const token = await user.generateAuthToken()
    res.status(201).json({
      token: token,
      user: user,
      id: user._id,
      userfname: user.userfname,
      userlname: user.userlname,
      username: user.username,
      password: user.password,
      Usertype: user.Usertype


    })
    console.log(token);
  }
})
// token is generated from here
app.get('/user/me', auth, function (req, res) {
  res.send(req.user);
})



app.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})
app.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})




/* =============================================End ogf login and logout of user====================================================================== */

/* ========================================Update Information of user and admin====================================================================== */

app.put('/updateprofile', auth, function (req, res) {   //update producte
  console.log(req.body);
  User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
    res.send("succesfull");
  });
});

/* =============================================End of update function================================================================================ */


















/* =================================================================Image upload by admin=================================================================== */

var storage = multer.diskStorage({
  destination: 'cars',
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, "Car" + Date.now() + ext);
  }
});

var storage = multer.diskStorage({
  destination: 'bikes',
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, "Bike" + Date.now() + ext);
  }
});

var storage = multer.diskStorage({
  destination: 'trucks',
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, "Truck" + Date.now() + ext);
  }
});

var imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1000000 }
});

app.post('/uploadCarimg', upload.single('imageFile'), (req, res) => {
  res.send(req.file)
  console.log(req.file)
});

app.post('/uploadBikeimg', upload.single('imageFile'), (req, res) => {
  res.send(req.file)
  console.log(req.file)
});
app.post('/uploadTruckimg', upload.single('imageFile'), (req, res) => {
  res.send(req.file)
  console.log(req.file)
});



/* =========================================================End of Admin Car upload ========================================================================= */
/* app.post('/uploadrating', auth, function (req, res) {
  console.log(req.user._id);
  const rating = new Rate({ ...req.body, userId: req.user._id });
  rating.save().then(function () {
    res.json('fine');
  }).catch(function (e) {
    res.send(e)
  })
});

app.get('/rating', function (req, res) {
  Rate.find().then(function (rate) {
    res.send(rate);
  }).catch(function (e) {
    res.send(e)
  });

}); */

/* ========================================Bike upload form of Admin================================================================================ */
app.post('/uploadbike', auth, function (req, res) {
  console.log(req.user._id);
  const bike = new Bike({ ...req.body, userId: req.user._id });
  bike.save().then(function () {
    res.json('fine');
  }).catch(function (e) {
    res.send(e)
  })
});


app.get('/bike', function (req, res) {
  Bike.find().then(function (bike) {
    res.send(bike);
  }).catch(function (e) {
    res.send(e)
  });

});

//--------------Rent Bike-----------------------------//
app.post('/rentbike/:id', auth, function (req, res) {
  console.log("reserve bike")
  uid = req.params.id.toString();
  const bookbikes = new Showbikebookings({ bid: uid, status: "Book", userid: req.user._id });
  bookbikes.save().then(function () {
    res.send('fine');
  })
})



//------------------Bike hire status admin---------------------//

app.get('/bikehire', function (req, res) {
  Showbikebookings.find()
    .populate('bikeimage') 
    .populate('bid')
    .populate('userid')
   
    .exec()
    .then(function (docs) {
      if (docs) {

        res.send({
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              bid: doc.bid,
              status: doc.status,
              userid: doc.userid

            }
          })
        })
      }

    })
});


//------------------Bike hire aprroval----------------//
app.put('/updateaprovalbike/:id', function (req, res) {
  uid = req.params.id.toString();
  console.log(uid);
  Showbikebookings.findByIdAndUpdate(uid, { $set: { status: "Approved" } }, { new: true }, (err, detail) => {
    res.send("fine");
  })

})


/* app.delete('/deletecar/:id',auth, function (req, res) {   //update producte
  console.log(req.body);
  Car.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
    res.send("succesfull");
  });
}); */

/* ======================================================End of bike uploads===================================================================== */

/* =========================================Truck upload form of admin============================================================================= */


app.post('/uploadtruck', auth, function (req, res) {
  console.log(req.user._id);
  const truck = new Truck({ ...req.body, userId: req.user._id });
  truck.save().then(function () {
    res.json('fine');
  }).catch(function (e) {
    res.send(e)
  })
});


app.get('/truck', function (req, res) {
  Truck.find().then(function (truck) {
    res.send(truck);
  }).catch(function (e) {
    res.send(e)
  });

});


//-----------------------------rent truck----------------------
app.post('/renttruck/:id', auth, function (req, res) {
  console.log("reserve truck")
  uid = req.params.id.toString();
  const booktrucks = new Showtruckbookings({ tid: uid, status: "Book", userid: req.user._id });
  booktrucks.save().then(function () {
    res.send('fine');
  })
})



//------------------Truck hire status admin---------------------//

app.get('/truckhire', function (req, res) {
  Showtruckbookings.find()
    .populate('tid')
    .populate('userid')
    .exec()
    .then(function (docs) {
      if (docs) {

        res.send({
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              tid: doc.tid,
              status: doc.status,
              userid: doc.userid

            }
          })
        })
      }

    })
});

//------------------Truck hire aprroval----------------//
app.put('/updateaprovaltruck/:id', function (req, res) {
  uid = req.params.id.toString();
  console.log(uid);
  Showtruckbookings.findByIdAndUpdate(uid, { $set: { status: "Approved" } }, { new: true }, (err, detail) => {
    res.send("fine");
  })

})


/* =====================================================================End of truck's */


/* ================================================================Upload Car by admin=========================================================== */

app.post('/uploadcar', auth, function (req, res) {

  /* console.log(req.user._id); */

  const car = new Car({ ...req.body, userId: req.user._id });
  /* console.log("here") */
  car.save().then(function () {
    /* console.log("here 2") */
    res.json('fine');
  }).catch(function (e) {
    /*  console.log("here 3") */
    res.send(e)
  })

});
//--------------Rent Car-----------------------------//
app.post('/rentcar/:id', auth, function (req, res) {
  console.log("reserve cars")
  uid = req.params.id.toString();
  const bookcars = new Showbookings({ cid: uid, status: "Book", userid: req.user._id });
  bookcars.save().then(function () {
    res.send('fine');
  })
})
//------------------car hire status admin---------------------//
app.get('/carhire', function (req, res) {
  Showbookings.find()
    .populate('cid')
    .populate('userid')
    .exec()
    .then(function (docs) {
      if (docs) {

        res.send({
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              cid: doc.cid,
              status: doc.status,
              userid: doc.userid

            }
          })
        })
      }

    })
});

//-------------------car hire aprroval----------------//
app.put('/updateaprovalcar/:id', function (req, res) {
  uid = req.params.id.toString();
  console.log(uid);
  Showbookings.findByIdAndUpdate(uid, { $set: { status: "Approved" } }, { new: true }, (err, detail) => {
    res.send("fine");
  })

})
/* ================================================================================================================================================== */
/* Car Details -- Admins uploads */
app.get('/car', function (req, res) {
  Car.find().then(function (car) {
    res.send(car);
  }).catch(function (e) {
    res.send(e)
  });

});
/*=============================================== End of upload car by admin================================================================== */


/* ====================================================Contact form for user================================================================== */

app.get('/contact', function (req, res) {
  Contact.find().then(function (contact) {
    res.send(contact);
  }).catch(function (e) {
    res.send(e)
  });

});

app.post('/contact', auth, function (req, res) {

  console.log(req.user._id);

  const contact = new Contact({ ...req.body, userId: req.user._id });
  /* console.log("here") */
  contact.save().then(function () {
    /* console.log("here 2") */
    res.json('fine');
  }).catch(function (e) {
    /*  console.log("here 3") */
    res.send(e)
  })

});

/* =========================================================End of contact section of user========================================================== */















//--------------Rate Car-----------------------------//

//------------------car hire status admin---------------------//
app.get('/carrate', function (req, res) {
  Ratecar.find().then(function (showratings) {
    res.send(showratings);
  });
});




/* app.get('/ratecar', function (req, res) {
  Rate.find()
    .populate('cid')
    .populate('userid')
    .exec()
    .then(function (docs) {
      if (docs) {

        res.send({
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              cid: doc.cid,
              status: doc.status,
              userid: doc.userid

            }
          })
        })
      }

    })
}); */

//---
//---


app.delete('/deletebikebookings/:id', function (req, res) {
  Showbikebookings.findByIdAndDelete(req.params.id).then(function () {
  }).catch(function () {
  })
})
app.delete('/deletecarbookings/:id', function (req, res) {
  Showbookings.findByIdAndDelete(req.params.id).then(function () {
  }).catch(function () {
  })
})
app.delete('/deletetruckbookings/:id', function (req, res) {
  Showtruckbookings.findByIdAndDelete(req.params.id).then(function () {
  }).catch(function () {
  })
})

app.delete('/deletecar/:id', function (req, res) {

  Car.findByIdAndDelete(req.params.id).then(function () {

  }).catch(function () {


  })
})

app.delete('/deletebike/:id', function (req, res) {
  Bike.findByIdAndDelete(req.params.id).then(function () {

  }).catch(function () {


  })
})
app.delete('/deletetruck/:id', function (req, res) {
  Truck.findByIdAndDelete(req.params.id).then(function () {

  }).catch(function () {


  })
})


app.get('/truckstatus', auth, function (req, res) {
  Showtruckbookings.find({ userid: req.user._id })
    .populate('tid')
    .exec()
    .then(function (truckdash) {
      if (truckdash) {

        res.send({
          orders: truckdash.map(doc => {
            return {
              _id: doc._id,
              tid: doc.tid,
              status: doc.status,
              userid: doc.userid

            }
          })
        })
      }

    })
})















app.get('/bikestatus', auth, function (req, res) {
  Showbikebookings.find({ userid: req.user._id })
    .populate('bid')
    .exec()
    .then(function (bikedash) {
      if (bikedash) {
        

        res.send({
          orders: bikedash.map(doc => {
            
            return {
              _id: doc._id,
              bid: doc.bid,
              status: doc.status,
              userid: doc.userid

            }
          })
        })
      }

    })
})


app.get('/carstatus', auth, function (req, res) {
  Showbookings.find({ userid: req.user._id })
    .populate('cid')
    .exec()
    .then(function (cardashboard) {
      if (cardashboard) {

        res.send({
          orders: cardashboard.map(doc => {
            return {
              _id: doc._id,
              cid: doc.cid,
              status: doc.status,
              userid: doc.userid

            }
          })
        })
      }

    })
})




app.post('/bikerating', auth, function (req, res) {
  bikerate.findOne({ bid: req.body.bid, userid: req.user._id }).then(function (Bikerating) {
    
    if (Bikerating) {
    rate=req.body.rating;
      bikerate.updateOne({ bid: req.body.bid, userid: req.user._id }, { $set: { rating:rate} }).then(function () {
        res.send('update');
        console.log('update');
      })
    } else {
console.log('asfd')
      data = {
        'bid': req.body.bid,
        'userid': req.user._id,
        'rating': req.body.rating
      }
      const ratebike = new bikerate(data);
      ratebike.save().then(function () {
        console.log('success');
      })
    }
  })
})




app.post('/truckrating', auth, function (req, res) {
  truckrate.findOne({ tid: req.body.tid, userid: req.user._id }).then(function (Truckrating) {
    
    if (Truckrating) {
    rate=req.body.rating;
      truckrate.updateOne({ tid: req.body.tid, userid: req.user._id }, { $set: { rating:rate} }).then(function () {
        res.send('update');
        console.log('update');
      })
    } else {
      data = {
        'tid': req.body.tid,
        'userid': req.user._id,
        'rating': req.body.rating
      }
      const ratetruck = new truckrate(data);
      ratetruck.save().then(function () {
        console.log('success');
      })
    }
  })
})



app.post('/carrating', auth, function (req, res) {
  carrate.findOne({ cid: req.body.cid, userid: req.user._id }).then(function (Carrating) {
    
    if (Carrating) {
    rate=req.body.rating;
      carrate.updateOne({ cid: req.body.cid, userid: req.user._id }, { $set: { rating:rate} }).then(function () {
        res.send('update');
        console.log('update');
      })
    } else {
      data = {
        'cid': req.body.cid,
        'userid': req.user._id,
        'rating': req.body.rating
      }
      const ratecar = new carrate(data);
      ratecar.save().then(function () {
        console.log('success');
      })
    }
  })
})
app.put('/updatebike/:id', function (req, res) {
	const id = req.params.id.toString();
  Bike.findByIdAndUpdate(id, req.body, {new:true}).then(function (bike) {
	  res.status(201).json({
		  message:"Yes"
	  })

  }).catch(function (err) {


  })
})


app.put('/updatetruck/:id', function (req, res) {
	const id = req.params.id.toString();
  Truck.findByIdAndUpdate(id, req.body, {new:true}).then(function (truck) {
	  res.status(201).json({
		  message:"Yes"
	  })

  }).catch(function (err) {


  })
})

app.get('/bikebyID/:id', function (req, res) {
  const id = req.params.id.toString();
  console.log(id);
  Bike.findById(id).then(function (get){
  console.log(get);
  res.status(201).json(get);
  })
  .catch(function (e){
  res.status(500).json({message : e});
  })

})


app.get('/truckbyID/:id', function (req, res) {
  const id = req.params.id.toString();
  console.log(id);
  Truck.findById(id).then(function (get){
  console.log(get);
  res.status(201).json(get);
  })
  .catch(function (e){
  res.status(500).json({message : e});
  })

})









app.get('/gcontact', function (req, res) {
  Contact.find().then(function (contact) {
    res.send(contact);
  }).catch(function (e) {
    res.send(e)
  });

});

app.listen(9000);
