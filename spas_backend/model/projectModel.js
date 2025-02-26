const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    justification: {
        type: String,
    },
    supervisor: {
        type: Schema.ObjectId,
        ref: "User",
    },
    projectProposedBy: {
        type: Schema.ObjectId,
        ref: "User",
    },
    projectAssign: [
        {
            type: Schema.ObjectId,
            ref: "User",
        },
    ],
    status: {type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending'},

    deadline: {
        type: Date,
    },

    approvedDate: {
        type: Date,
        default: Date.now()
    }

});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
