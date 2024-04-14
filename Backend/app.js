// const express = require('express');
// require('dotenv').config();
// // require('express-async-errors');
// // const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 3000;

// //Database
// const connectDB = require('./db/connect');

// //routers
// const authRouter = require('./routes/authRoute');
// const workspaceRouter = require('./routes/workspaceRoute');

// //middlewares
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler')

// // app.use(cors({
// //     origin: 'http://localhost:5173',
// //     // credentials: true
// // }));
// // Handle preflight requests for all routes
// // app.options('*', cors());

// // Custom middleware to ensure 'Access-Control-Allow-Credentials' header is set
// // app.use((req, res, next) => {
// //   res.header('Access-Control-Allow-Credentials', 'true');
// //   next();
// // });

// // Add your routes and other middleware here...

// app.use(express.json());


// app.get('/', (req, res) => {
//   res.send('Server is running');
// });


// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/project', workspaceRouter);


// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);


// const start = async function() {
//   await connectDB(process.env.MONGO_URL);
//   try {
//       app.listen(port,console.log(`Server is listening on ${port}`));
//   } catch (error) {
//       console.log(error);
//   }
// }


// start();
















const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

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
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    // Example event
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
        socket.to(roomId).emit('userJoined', roomId);
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

