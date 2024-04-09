const express = require('express');
require('dotenv').config();
// require('express-async-errors');
// const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Connect Database

//routers


//middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

// app.use(cors({
//     origin: 'http://localhost:5173',
//     // credentials: true
// }));
// Handle preflight requests for all routes
// app.options('*', cors());

// Custom middleware to ensure 'Access-Control-Allow-Credentials' header is set
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// Add your routes and other middleware here...

app.get('/', (req, res) => {
  res.send('Server is running');
});


// app.get('/', (req,res,next)=>{
//     res.send("Collaborative Code Editor api")
// })

app.get('/api/v1', (req,res,next)=>{
    res.send('testing')
})


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async function() {
    try {
        app.listen(port,console.log(`Server is listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
}


start();
