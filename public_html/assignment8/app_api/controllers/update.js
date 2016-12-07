var Employee = require('../models/employee');

module.exports.index = function(req, res) {

  Employee.findById(req.params.id, function (err, data) {
    var date = new Date(data.date);
    var dateString = (date.getFullYear()+'-'+(date.getMonth()+1)+"-"+date.getDate());
    
    res.render('update', {               
      title: "Update Employee",
      id: req.params.id,
      userData: data,
      date: dateString
    });
  });
  
  if (req.method === 'POST') {
    
    console.log(req.body);
    console.log("Updating Database");
    Employee.findById(req.params.id, function (err, doc) {
      doc.firstName = req.body.firstName;
      doc.lastName = req.body.lastName;
      doc.department = req.body.department;
      doc.startDate = req.body.startDate;
      doc.jobTitle = req.body.jobTitle;
      doc.salary = req.body.salary;
      doc.save();
    });
  }
}
