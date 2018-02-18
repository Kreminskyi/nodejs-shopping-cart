var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        id: { type: String, required: true },
        isVerified: { type: Boolean, default: false }
    },
    sessionId:{ type: Schema.Types.ObjectId, ref: 'UserSession' },
    address: {
        city: { type: String, required: true },
        state: { type: String, required: true }
    },
    password: { type: String, required: true },
    profilePicUrl: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema)