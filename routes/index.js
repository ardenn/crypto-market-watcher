import express from 'express';
const request = require('request');
const router = express.Router();


/* GET index page. */
router.get('/', (req,res)=>{
    res.render('index', {
        title: 'Mc\'Alila - The CryptWatcher'
    });
});

/* GET prices page. */
router.get('/prices', (req,res)=>{
    res.render('prices', {
        title: 'Mc\'Alila - The CryptWatcher'
    });
});

/* GET login page. */
router.get('/login', (req,res)=>{
    res.render('login', {
        title: 'Mc\'Alila - The CryptWatcher',
        message: []
    });
});

/* GET signup page. */
router.get('/signup', (req,res)=>{
    res.render('signup', {
        title: 'Mc\'Alila - The CryptWatcher',
        message: []
    });
});
export default router;