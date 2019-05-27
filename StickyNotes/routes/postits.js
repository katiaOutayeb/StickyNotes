var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

var Postit = require('../models/postit');

router.post('/save',function(req, res, next) {
  var text = req.body.text;
  var x = req.body.x;
  var y = req.body.y;
  var user = req.body.user;
  var sab = req.body.submit

  console.log(text);
  if (sab == "save") {
  // Form Validator
  req.checkBody('text','text field is required').notEmpty();
  req.checkBody('text','text field is not Alphanumeric').matches(/^[a-z0-9 ]+$/i);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
    req.flash('error', 'Text is empty or is not alphanumeric');
    res.location('/users/espace');
    res.redirect('/users/espace');
    /*res.render('espace', {
      errors: errors
    });*/
  } else{ 
    var now = new Date();
    var s = now.getDate() + "/" + now.getMonth() + "/" + now.getYear().toString().substr(1,2) +" - " + now.getHours() + ":" + now.getMinutes() 
    console.log(s)
    var time = s.toString()
  	var newPostit = new Postit({
      text: text,
      user: user,
      x: x,
      y: y,
      date : time
    })
    Postit.createPostit(newPostit, function(err, user){
      if(err) throw(err);
      console.log(user);
    })
    req.flash('success', 'Postit created');
    res.location('/users/espace');
    res.redirect('/users/espace');

    /*res.location('/');
    res.redirect('/');*/
  }



  }else{
    req.flash('error', 'Adding a postit is canceled');
    res.location('/users/espace');
    res.redirect('/users/espace');
  }


});

router.post('/update',function(req, res, next) {
  var text = req.body.text;
  var id = req.body.id;
  var type = req.body.submit;
  var u = req.body.user
  var cu = req.body.cuser
  if (type == "supprimer") {
    if(cu == u){ 
      Postit.remove({"_id" : id})
      .exec()
      .then(docs => {
      req.flash('success', 'Postit deleted');
      res.location('/users/espace');
      res.redirect('/users/espace');
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })

      })
    }
    else{
      req.flash('error', 'You are not the owner');
      res.location('/users/espace');
      res.redirect('/users/espace');
    }
  }
  if (type == "enregistrer") {
    if(cu == u){ 
        Postit.update({_id: id}, {$set:{text : text}})
        .exec()
        .then(docs => {
        req.flash('success', 'Postit updated');
        res.location('/users/espace');
        res.redirect('/users/espace');
        })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })

      })
  }
  else{
    req.flash('error', 'You are not the owner');
    res.location('/users/espace');
    res.redirect('/users/espace');
  }
  }

});

router.post("/getpostits", function(req, res, next) {
  var user = req.body.user;
	Postit.find()
	.exec()
	.then(docs => {
		//console.log(docs[0]);
		//res.status(200).json(docs);
    res.render('espace', {output: docs});
  })
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})

	})
});

module.exports = router;
