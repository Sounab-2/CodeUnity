// import { handleChat,createNewSession } from './chatbot/chatbot';
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const {handleChat,createNewSession} = require('./chatbot/chatbot');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173'], 
    credentials: true
}));
app.use(express.json());

// Database
const connectDB = require('./db/connect');
const WorkspaceModel = require('./model/Workspace');

// Routers
const authRouter = require('./routes/authRoute');
const workspaceRouter = require('./routes/workspaceRoute');

// Error handling middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/project', workspaceRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://code-unity.vercel.app'], 
        methods: ["GET", "POST","PUT", "DELETE"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('userDisconnect', async ({ userId, username, meetingId }) => {
        try {
            // console.log(`User ${username} disconnected from meeting ${meetingId}`);
            
            // Update the user's status to offline in the database based on meetingId
            const updatedWorkspace = await WorkspaceModel.findOneAndUpdate(
                { _id: meetingId, 'team.id': userId }, 
                { $set: { 'team.$.status': 'offline' } },
                { new: true }  
            );
            // console.log(updatedWorkspace.team);
            socket.to(meetingId).emit('user-left', { userId, username, meetingId, updatedWorkspace});

        } catch (error) {
            console.error('Error updating user status:', error);
        }
    });
    
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
        socket.to(roomId).emit('userJoined', {roomId,userId: socket.id});
    });

    socket.on('code-change',({value,meetingId})=>{
        // console.log(value);
        socket.to(meetingId).emit('code-sync',value);
    })

    socket.on('language-change',({lang,meetingId})=>{
        // console.log(lang);
        socket.to(meetingId).emit('tab-change',lang);
    })

    socket.on('message',({text,meetingId,sender,senderPhoto})=>{
        console.log(text);
        // console.log(sender);
        // console.log(senderPhoto);
        socket.to(meetingId).emit('received-message',{text,sender,senderPhoto});
    })

    socket.on('remove-user',({memberId,meetingId}) => {
        socket.to(meetingId).emit('user-removed',{memberId,meetingId});
    })

    socket.on('call', (meetingId)=>{
        socket.to(meetingId).emit('incoming-call');
    })
    
    let sessionId = createNewSession();
  
    socket.on('userMessage', async (userInput) => {
        try {
        const response = await handleChat(userInput.text, sessionId);
        socket.emit('botResponse', response);
        } catch (error) {
        console.error('Error handling user message:', error);
        }
    });
});






const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        server.listen(port, () => console.log(`Server is listening on ${port}`));
    } catch (error) {
        console.log('Error connecting to database or listening on port:', error);
    }
};

start();

