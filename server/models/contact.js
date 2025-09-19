const user = require('./user');

mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, minlength: 10, maxlength: 20,trim: true },
});

module.exports = mongoose.model('Contact', contactSchema);
