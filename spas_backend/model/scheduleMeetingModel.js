const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const scheduleMeeting = new Schema({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    supervisor: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['slot booked', 'available'], default: 'available' },
    slotBookedby: { type: Schema.Types.ObjectId, ref: 'User' },
});


const Schedule = mongoose.model("ScheduleMeeting", scheduleMeeting);

module.exports = Schedule;