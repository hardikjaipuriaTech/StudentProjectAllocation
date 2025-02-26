const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
const Project = require("./../model/projectModel");
const Deadline = require("./../model/deadlineModel");
const ScheduleMeeting = require("./../model/scheduleMeetingModel");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (owner) => {
    return (token = signToken(owner._id));
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    console.log(req.headers.authorization);
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return next(
                new AppError("you are not logged in ! please log in to get access", 401)
            );
        } else {
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded.id);
            const user = await User.findById(decoded.id)
                .populate("studentProjectPreference")
                .populate("projectAssign");
            if (!user) {
                return next(new AppError("User not found", 404));
            } else {
                req.user = user;
                next();
            }
        }
    } else {
        return next(new AppError("invalid token", 401));
    }
});

// Log function to log requests, responses, and errors
const log = (req, res, error = null) => {
    const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        requestBody: req.body,
        responseStatusCode: res.statusCode,
        responseBody: res.locals.responseData,
        error,
    };

    console.log(JSON.stringify(logData, null, 2));
};

// Middleware for logging requests and responses
exports.logRequestResponse = (req, res, next) => {
    res.locals.responseData = {}; // Store response data here
    const originalSend = res.send;

    res.send = function (data) {
        res.locals.responseData = data;
        originalSend.call(this, data);
    };

    res.on("finish", () => {
        log(req, res);
    });

    next();
};


exports.userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Enter Email or Password",
            });
        }

        if (email === "admin@gmail.com" && password === "Test@1234") {
            user = await User.findOne({email}).select("+password");
            if (!user || !(await user.correctPassword(password, user.password))) {
                const user = await User.create({
                    email,
                    password,
                    name: "admin",
                    passwordConfirm: password,
                    userType: "admin",
                });
                const token = createSendToken(user);
                res.status(200).json({
                    status: "success",
                    message: "login successfully",
                    data: user,
                    token,
                });
            } else {
                const token = createSendToken(user);
                res.status(200).json({
                    status: "success",
                    message: "login successfully",
                    data: user,
                    token,
                });
            }
        } else {
            const user = await User.findOne({email}).select("+password");
            if (!user || !(await user.correctPassword(password, user.password))) {
                res.status(403).json({
                    status: "unauthorized",
                    message: "Invalid Email id or Password",
                });
            } else {
                const token = createSendToken(user);
                res.status(200).json({
                    status: "success",
                    message: "login successfully",
                    data: user,
                    token,
                });
            }
        }
    } catch
        (error) {
        console.log(error);
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        });
    }
}
;


async function findUserAndCheckPassword(email, password) {
    const user = await User.findOne({email}).select("+password");

    if (user && (await user.correctPassword(password, user.password))) {
        console.log("Authentication Successful")
        return user;
    }

    return null;
}

exports.userSignUp = async (req, res) => {
    try {
        const {email, password, passwordConfirm, userType, rollNo, name} =
            req.body;
        const emailCheck = await User.findOne({email});

        if (emailCheck) {
            res.status(409).json({
                status: "conflict",
                message: "Email Already exist ",
            });
        } else {
            const user = await User.create({
                email,
                name,
                password,
                passwordConfirm,
                userType,
                rollNo,
            });
            const token = createSendToken(user);
            res.status(201).json({
                status: "created",
                message: "User Created successfully ",
                data: user,
                token,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.dashboard = async (req, res) => {
    try {
        const user = req.user;
        res
            .status(200)
            .json({status: "success", message: "successful", data: user});
    } catch (error) {
        res.status(200).json({status: "error", message: "Internal Server Error"});
    }
};

exports.createProject = async (req, res) => {
    try {
        const {description, title, justification} = req.body;

        if (req.user && req.user?.userType === 'supervisor') {
            const project = await Project.create({
                description,
                title,
                justification,
                supervisor: req.user,
                projectProposedBy: req.user,
            });
            res.status(201).json({
                status: "created",
                message: "Project Proposed successfully",
                data: project,
            });

        } else {
            const project = await Project.create({
                description,
                title,
                justification,
                projectProposedBy: req.user,
            });
            res.status(201).json({
                status: "created",
                message: "Project Proposed successfully",
                data: project,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.createMeetingSlots = async (req, res) => {
    try {
        const {date, startTime, endTime} = req.body;
        const scheduleMeeting = await ScheduleMeeting.create({
            date: date,
            startTime: startTime,
            endTime: endTime,
            supervisor: req.user
        });

        await scheduleMeeting.save();

        res.status(201).json({
            status: "created",
            message: "Meeting Slot Created successfully",
            data: scheduleMeeting,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.createdeadlines = async (req, res) => {
    try {
        const {dateType, deadlineDate} = req.body;
        const deadline = await Deadline.create({
            deadlineType: dateType,
            deadlineDate: deadlineDate,
        });
        res.status(201).json({
            status: "created",
            message: "Deadline Created successfully",
            data: deadline,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        console.log("Project to delete with check: " + projectId)
        // Check if the project with the given ID exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({error: 'Project not found'});
        }

        // Delete the project
        await Project.findByIdAndRemove(projectId);

        // Return a success response
        return res.status(200).json({message: 'Project deleted successfully'});
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};

exports.supervisorProjectList = async (req, res) => {
    try {
        const projects = await Project.find({
            supervisor: req.user,
        });
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminProjectList = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};
exports.adminProposedProjectList = async (req, res) => {
    try {
        const projects = await Project.find({status: 'pending'});
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminProposedProjectApprove = async (req, res) => {
    try {
        const {_id, status, supervisor} = req.body;

        const project = await Project.findByIdAndUpdate(_id
            , {status: 'approved', supervisor: supervisor}, {new: true});
        res.status(201).json({
            status: "updated",
            message: "Project Approved",
            data: project,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminProposedProjectReject = async (req, res) => {
    try {
        const {_id, status} = req.body;

        const project = await Project.findByIdAndUpdate(_id
            , {status: 'rejected'});
        res.status(201).json({
            status: "updated",
            message: "Project Rejected",
            data: project,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminStudentList = async (req, res) => {
    try {
        const students = await User.find({
            userType: "students"
        });
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: students,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminSupervisorList = async (req, res) => {
    try {
        const supervisors = await User.find({
            userType: "supervisor"
        });
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: supervisors,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminSaveSupervisor = async (req, res) => {
    try {
        const {_id, supervisorWorkLoad} = req.body;

        const userUpdate = await User.findByIdAndUpdate(_id
            , {supervisorWorkLoad: supervisorWorkLoad});
        res.status(201).json({
            status: "created",
            message: "Supervisor Saved successfully",
            data: userUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.updateProject = async (req, res) => {
    try {
        const {_id, title, description, justification} = req.body;

        const projectUpdate = await Project.findByIdAndUpdate(_id
            , {title: title, description: description, justification: justification});
        res.status(201).json({
            status: "updated",
            message: "Projected Updated successfully",
            data: projectUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminProjectDate = async (req, res) => {
    try {
        const {projectId, date} = req.body;
        const project = await Project.findById(projectId);
        project.deadline = new Date(date);
        await project.save();
        res.status(200).json({
            status: "success",
            message: "deadline set successfully",
            data: project,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminProjectAssign = async (req, res) => {
    try {
        const {projectId} = req.body;
        const project = await Project.findById(projectId);

        await project.save();
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: project,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.studentProjectList = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("supervisor")
            .populate("projectAssign");
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.studentProjectProposalList = async (req, res) => {
    try {
        const projects = await Project.find({projectProposedBy: req.user})
        res.status(200).json({
            status: "success",
            message: "Proposed Projects Fetched successfully",
            data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.fetchMeetingSlots = async (req, res) => {
    try {
        const supervisorId = req.params.id;
        const meetingslots = await ScheduleMeeting.find({supervisor: supervisorId})
        res.status(200).json({
            status: "success",
            message: "Meeting Slots Fetched successfully",
            data: meetingslots,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.getDeadlines = async (req, res) => {
    try {
        const deadlines = await Deadline.find()
        res.status(200).json({
            status: "success",
            message: "successfully",
            data: deadlines,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.studentProjectAddToPreferences = async (req, res) => {
    try {
        const {projectId} = req.body;
        const project = await Project.findById(projectId);
        const user = await User.findById(req.user._id);
        if (user.studentProjectPreference.includes(project._id)) {
            user.studentProjectPreference.pull(project._id);
        } else {
            user.studentProjectPreference.push(project._id);
        }
        await user.save();

        res.status(200).json({
            status: "success",
            message: "project added to preferences List",
            // data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.studentProjectsPreferencesReArrange = async (req, res) => {
    try {
        const {projectIds} = req.body;

        const user = User.findById(req.user._id);
        user.studentProjectPreference = projectIds;
        await user.save();

        res.status(200).json({
            status: "success",
            message: "project added to preferences List",
            // data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.studentProjectListSubmit = async (req, res) => {
    try {
        if (req.user.userType === "student") {
            const preferences = req.body;
            const user = await User.findByIdAndUpdate(req.user._id, {projectPreference: preferences});
            user.projectStatus = "listSubmitted";
            await user.save();

            res.status(200).json({
                status: "success",
                message: "project Final Submitted",
                // data: projects,
            });
        } else {
            res.status(401).json({
                status: "error",
                message: "you are not student",
                // data: projects,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.updateSlotStatus = async (req, res) => {
    try {
        const {_id} = req.body;
        const scheduleMeeting = await ScheduleMeeting.findByIdAndUpdate(_id, {status: 'slot booked'});

        res.status(200).json({
            status: "success",
            message: "Appointment Scheduled",
            data: scheduleMeeting,
            slotBookedby: req.user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminStudentWithProjectListSubmitted = async (req, res) => {
    try {
        const user = await User.find({
            userType: "student",
            projectStatus: "listSubmitted",
        }).populate("studentProjectPreference");

        res.status(200).json({
            status: "success",
            message: "success",
            data: user,
            // data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};

exports.adminStudentWithProjectListAssign = async (req, res) => {
    try {
        const user = await User.find({
            userType: "student",
            projectStatus: "assign",
        }).populate("projectAssign");

        res.status(200).json({
            status: "success",
            message: "success",
            data: user,
            // data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};
exports.adminStudentWithProjectListFileSubmitted = async (req, res) => {
    try {
        const user = await User.find({
            userType: "student",
            projectStatus: "submitted",
        }).populate("projectAssign");

        res.status(200).json({
            status: "success",
            message: "success",
            data: user,
            // data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
};


exports.adminStudentProjectAssign = async (req, res) => {
    try {
        if (req.user.userType === "admin") {

            const supervisors = await User.find({
                userType: "supervisor",
            });

            const students = await User.find({
                userType: "student",
                projectStatus: "listSubmitted",
            }).populate("studentProjectPreference projectPreference.project");

            for (const student of students) {
                console.log(student)
                if (
                    student.projectPreference &&
                    student.projectPreference.length > 0
                ) {
                    student.projectPreference.sort((a, b) => a.preferenceNumber - b.preferenceNumber);

                    console.log(student.projectPreference)

                    for (const projectPreference of student.projectPreference) {
                        const project = projectPreference.project;

                        console.log(project)

                        // Find supervisor for the project
                        const projectSupervisor = supervisors.find(supervisor =>
                            supervisor._id.equals(project.supervisor._id)
                        );

                        console.log(projectSupervisor)

                        // Checking if supervisor has remaining workload capacity
                        if (
                            projectSupervisor &&
                            projectSupervisor.supervisorWorkLoad > 0
                        ) {
                            // Decrementing supervisor's workload capacity
                            projectSupervisor.supervisorWorkLoad -= 1;
                            student.projectStatus = "assign";
                            student.projectAssign = project._id;
                            project.projectAssign.push(student._id);
                            await student.save();
                            await projectSupervisor.save();
                            await project.save();
                            break;
                        }
                    }
                }
            }

            res.status(200).json({
                status: "success",
                message: "Project assigned Successfully",
                // data: user,
                // data: projects,
            });
        } else {
            res.status(401).json({
                status: "error",
                message: "Only admins are allowed to perform this action.",
                // data: projects,
            });
        }
    } catch
        (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }
}
;

exports.studentFilePresented = async (req, res) => {
    try {
        const {userId} = req.query;
        const user = await User.findById(userId);
        user.projectStatus = "presented";
        await user.save();
        res
            .status(200)
            .json({status: "success", message: "file presented successfully"});
    } catch (error) {
        console.log(error);
        res
            .status(404)
            .json({status: "error", message: "file upload unsuccessfully"});
    }
};

exports.adminStudentWithProjectListFilePresented = async (req, res) => {
    try {
        const user = await User.find({
            userType: "student",
            projectStatus: "presented",
        }).populate("projectAssign");

        res.status(200).json({
            status: "success",
            message: "success",
            data: user,
            // data: projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", message: "Internal Server Error"});
    }

};