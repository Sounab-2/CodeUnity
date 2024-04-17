const mongoose = require('mongoose');
const User = require('./User');

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    fileName: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        enum: ['java', 'python', 'c++', 'javascript']
    },
    code: {
        type: {
            cPlusPlus: { type: String, default: '#include <iostream>\nint main() {\n  std::cout << "Hello World!";\n  return 0;\n}' },
            java: { type: String, default: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}' },
            python: { type: String, default: 'print("Hello World!")' },
            javascript: { type: String, default: 'console.log("Hello World!");' }
        }
    },
    type: {
        type: String,
        required: true,
        enum: ['solo', 'team']
    },
    team: [{
        type: String,
        ref: 'User',
        required: true,
    }],
    host: {
        type: String,
        ref: 'User',
        required: true,
    }
});

const WorkspaceModel = mongoose.model('Workspace', WorkspaceSchema);

module.exports = WorkspaceModel;