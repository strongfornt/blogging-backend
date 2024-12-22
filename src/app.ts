import cors from 'cors';
import express, { Application, Request, Response } from 'express';
// import globalErrorHandler from './app/middleware/globalErrorHanlder';
// import notFound from './app/middleware/notFound';
import  cookieParser from 'cookie-parser'
import router from './app/router';

const app: Application = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5173']}));


app.get('/', async (req: Request, res: Response) => {
  res.send('a');
});

//applications routes
app.use('/api/v1', router)

// // global error handlers
// app.use(notFound);
// app.use(globalErrorHandler);

// start the server
export default app;
