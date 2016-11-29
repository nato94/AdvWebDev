var express = require('express');
var router = express.Router();

//Create variables for all the controllers
var ctrlHome = require('../controllers/home');
var ctrlView = require('../controllers/view');
var ctrlUpdate = require('../controllers/update');
var ctrlDelete = require('../controllers/delete');

/* Locations pages */
router.get('/', ctrlHome.home);
router.post('/', ctrlHome.home)

router.get('/view', ctrlView.home);

router.get('/update/:id', ctrlUpdate.home);
router.post('/update/:id', ctrlUpdate.home);

router.get('/delete/:id', ctrlDelete.home);

module.exports = router;
