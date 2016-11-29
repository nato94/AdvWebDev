module.exports.home = function(req, res) {
  
var Employees = require('../models/employee');

  Employees.find().exec(function(err, results) {
    res.render('view', {               
      title: "Employee's Page",
      employeeResults : results,
      err: err
    });
  });
}


