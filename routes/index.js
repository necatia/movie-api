const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

//Models
const User = require('../models/Users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  
    const {username, password} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
      const user = new User({
        username,
        password: hash
      });
  
      const promise = user.save();
      promise.then((data) => {
        res.json(data)
      }).catch((err) => {
        res.json(err);
      })
    });
});



router.post('/authenticate',(req,res)=>{

  const {username, password} = req.body;
  
  User.findOne(
    {
      username
    },(err,user)=>{
      if (err)
          throw err;
      
      if(!user){
        res.json({
          status:false,
          message:'Authentication failed'
        });
      }else{
        bcrypt.compare(password,user.password).then((result)=>{
          if(!result){
            res.json({
              status:false,
              message:"wrong password"
            });
          }else{
            const payload = {
              username
            };
            const token = jwt.sign(payload,req.app.get('api_secret_key'),{
              expiresIn:720
            });

            res.json({
              status:true,
              token:token
            })
          }
        });
      }
    }
  );

});
module.exports = router;
