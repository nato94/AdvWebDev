var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: Date,
    jobTitle: String,
    salary: Number
});


var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;