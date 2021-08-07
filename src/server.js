import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoute from './routes/userRoute.js';
import productRoutes from './routes/index.js';


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));

let corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200, 
};


app.get('/', (req, res) => {
    res.json({message: 'server is ready'});
})


// routes 
app.use('/api', userRoute);
app.use('/', productRoutes, cors(corsOptions));


export default app;