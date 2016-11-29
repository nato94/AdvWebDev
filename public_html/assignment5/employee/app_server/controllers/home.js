/* GET 'home info' page */


var Employee = require('../models/employee');

module.exports.home = function(req, res){
    
    var msg = '';
    function successCB(){
         res.render('index', { 
            title: 'Welcome To The Employee Database!',
            message : 'Employee Saved'
        });        
    }
    if (req.method === 'POST') {
        console.log(req.body);
        
        Employee.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
        },function (err) {           
           // saved!
           successCB();
        });
              
    } else {
         res.render('index', { 
            title: 'Welcome To The Employee Database!',
            message : msg
        });
    }   
    
 
};
