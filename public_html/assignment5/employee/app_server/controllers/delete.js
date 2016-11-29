var employeeSchema = require("../models/employee");

module.exports.home = function(req, res) {
  var id = req.params.id;
  
  employeeSchema.findByIdAndRemove(id, function() {
    res.render('delete', {
      title: "Your Fired! *Trump Voice*",
      id: id
    });
  }); 
}

