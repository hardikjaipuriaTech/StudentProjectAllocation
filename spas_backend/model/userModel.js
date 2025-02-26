const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    rollNo: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        minlength: 8,
    },

    studentProjectPreference: [
        {
            type: Schema.ObjectId,
            ref: "Project",
        },
    ],

    projectPreference: [
        {
            project: {
                type: Schema.Types.ObjectId,
                ref: "Project",
            },
            preferenceNumber: {
                type: Number,
                min: 1,
                max: 10,
                default: 1
            },
        }
    ],
    projectAssign: {
        type: Schema.ObjectId,
        ref: "Project",
    },

    assignedProjects: {
        type: Number,
        default: 0
    },

    supervisorWorkLoad: {
        type: Number,
        min: 0,
        max: 7,
        default: 1
    },

    userType: {
        type: String,
        required: true,

        enum: ["admin", "student", "supervisor"],
    },
    projectStatus: {
        type: String,
        enum: ["listSubmitted", "assign", "submitted", "presented"],
    },
    projectFile: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

// checks if a user's password is being modified. If it is, it hashes the password using bcrypt,
// sets the "passwordConfirm" field to undefined (likely for data cleanliness),
// and then allows the save operation to proceed.

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

//Method to validate the password for users when they log in
UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
