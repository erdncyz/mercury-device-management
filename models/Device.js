const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Telefon', 'Tablet', 'Apple TV', 'Android TV']
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    assignmentDate: {
        type: Date,
        default: Date.now
    },
    notes: String
});

module.exports = mongoose.model('Device', deviceSchema); 