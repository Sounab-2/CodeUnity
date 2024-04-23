const User = require('../model/User');
const WorkspaceModel = require('../model/Workspace');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
let compiler = require('compilex');
let options = {stats : true}; //prints stats on console 
compiler.init(options)

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
    const { name, fileName, language } = req.body;
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

const joinTeam = async (req,res) => {
    const { userId } = req.params;
    const meetingId = req.body.meetingId;
    try{
        const workspace = await WorkspaceModel.findOne({_id:meetingId});
        workspace.team.push(userId);
        await workspace.save();
        res.status(StatusCodes.OK).json({ workspace });
    }
    catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

const saveCode = async (req,res) => {
    const meetingId = req.body.meetingId;
    const code = req.body.code;
    try{
        const workspace = await WorkspaceModel.findOne({_id:meetingId});
        const lang = workspace.language
        workspace.code[lang] = code;
        await workspace.save();
       
        res.status(StatusCodes.OK).json({ workspace });
    }
    catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};
const languageSelector = async (req,res) => {
    const meetingId = req.body.meetingId;
    const lang = req.body.language;
    try{
        const workspace = await WorkspaceModel.findOne({_id:meetingId});
        workspace.language = lang;
        await workspace.save();
       
        res.status(StatusCodes.OK).json({ workspace });
    }
    catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

const runCode = async (req,res) => {
    const code = req.body.code;
    const input = req.body.input;
    const lang = req.body.language;
    try{
        if(lang == 'python'){
            if(input==''){
                let envData = {OS :"windows"};
                compiler.compilePython(envData,code,function(data){
                    res.status(StatusCodes.OK).json({ data });
                });
            }
            else{
                let envData = {OS :"windows"};
                compiler.compilePythonWithInput(envData,code,input,function(data){
                    res.status(StatusCodes.OK).json({ data });
                });
            }
        }
        else if(lang == 'java'){
            if(input == ''){
                let envData = {OS :"windows"};
                compiler.compileJava(envData,code,function(data){
                    res.status(StatusCodes.OK).json({ data });
                });
            }else{
                let envData = {OS :"windows"};
                compiler.compileJavaWithInput(envData,code,input,function(data){
                    res.status(StatusCodes.OK).json({ data });
                });
            }
        }
        else if(lang == 'cPlusPlus'){
            if(input == ''){
                let envData = {OS :"windows"};
                compiler.compileCPP(envData,code,function(data){
                    res.status(StatusCodes.OK).json({ data });
                });
            }
            else{
                let envData = {OS :"windows"};
                compiler.compileCPPWithInput(envData,code,input,function(data){
                    res.status(StatusCodes.OK).json({ data });
                });
            }
        }
           
    }catch(error){
        console.log(error);
    }finally{
        compiler.flush(function(){
            console.log('All temporary files flushed !'); 
        });
    }
};


module.exports = { createSoloWorkspace,createTeamWorkspace,joinTeam,languageSelector,saveCode,runCode };
