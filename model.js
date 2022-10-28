var mongoose = require('mongoose'); 
  
var UserModel = new mongoose.Schema({  
    firstName: String,
    lastName: String
}); 
  
module.exports = new mongoose.model('UserModel', UserModel);
