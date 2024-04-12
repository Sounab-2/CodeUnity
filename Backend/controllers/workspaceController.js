const User = require('../model/User');
const WorkspaceModel = require('../model/Workspace');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');

const createSoloWorkspace = async (req, res) => {
    const { name,fileName, language, type } = req.body; // Correctly extract and rename filename to fileName
    const { userId } = req.params;

    if (!name || !fileName || !language || !type || !userId) { // Check for userId as well
        throw new customError.BadRequestError('Please provide all project details');
    }

    try {
        const workspace = await WorkspaceModel.create({ name, fileName, language, type, host: userId });
        res.status(StatusCodes.CREATED).json({ workspace });
    } catch (error) {
        // Handle possible errors such as MongoDB errors or validation errors
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

module.exports = { createSoloWorkspace };
