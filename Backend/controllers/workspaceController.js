const User = require('../model/User');
const WorkspaceModel = require('../model/Workspace');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');

const createSoloWorkspace = async (req, res) => {
    const { name,fileName, language } = req.body; // Correctly extract and rename filename to fileName
    const { userId } = req.params;

    if (!name || !fileName || !language || !userId) { // Check for userId as well
        throw new customError.BadRequestError('Please provide all project details');
    }

    try {
        const workspace = await WorkspaceModel.create({ name, fileName, language, type: 'solo', host: userId });
        res.status(StatusCodes.CREATED).json({ workspace });
    } catch (error) {
        // Handle possible errors such as MongoDB errors or validation errors
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

const createTeamWorkspace = async (req, res) => {
    const { name, fileName, language } = req.body; // Correctly extract and rename filename to fileName
    const { userId } = req.params;

    if (!name || !fileName || !language || !userId) {
        throw new customError.BadRequestError('Please provide all project details');
    }

    try {
        // Create the workspace with initial host and then add the host to the team
        const workspace = new WorkspaceModel({
            name,
            fileName,
            language,
            type: 'team',
            host: userId,
            team: [userId] 
        });

        await workspace.save(); // Save the workspace with the user added to the team

        res.status(StatusCodes.CREATED).json({ workspace });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};



module.exports = { createSoloWorkspace,createTeamWorkspace };
