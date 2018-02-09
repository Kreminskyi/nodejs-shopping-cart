var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSessionSchema = new Schema({
  createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('UserSession', UserSessionSchema);
