import express from 'express';

const request = require('request');
const router = express.Router();
const db = require('../db')
const bcrypt = require('bcrypt')

// middleware function to check for logged-in users
let sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/prices');
  } else {
    next();
  }
};

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index',{
    title: "Mc'Alila - The CryptWatcher"
  })
});

/* GET prices page. */
router.get('/prices', (req, res) => {
  if (req.session.user){
    res.render('prices',{
      title: "Mc'Alila - The CryptWatcher"
    })
  }else{
    res.redirect('/login')
  }
});

/* GET login page. */
router.get('/login',sessionChecker, (req, res) => {
    res.render('login',{
      title: "Mc'Alila - The CryptWatcher"
    })
  })
router.post('/login',(req, res) => {
    let username, password = [req.body.username, req.body.password]
    db.query('SELECT username,password FROM users where username = $1', [username], (err, response) => {
      if (err) {
        console.log("Username does not exist", err)
        res.redirect('/login')
      }else{
      bcrypt.compare(password, response.rows[0].password).then(function (resp) {
        if (resp) {
          req.session.user = username;
          res.redirect('/prices');
        }
      })
    }
    })
  });

/* GET signup page. */
router.get('/signup',sessionChecker, (req, res) => {
    res.render('signup',{
      title: "Mc'Alila - The CryptWatcher"
    });
  })
  router.post('/signup',(req, res) => {
    let username = req.body.username
    bcrypt.hash(req.body.password, 10, function (err, passHash) {
      db.query('INSERT INTO users (username,password) VALUES ($1,$2)', [username, passHash],(err,resp)=>{
        if (err) {
          res.redirect('/signup');
        }else{
        req.session.user = username;
        res.redirect('/prices');
        }
      })
    })
  });
export default router;
