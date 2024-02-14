import express from 'express';
import cors from 'cors';
import morgan from 'morgan'

// import {createRoles,createFilesFolder} from './libs/initialSetup.lib';
// import userRoutes from './routes/user.routes';
import membersRoutes from './routes/members.routes';


const app = express();
app.use(morgan('dev')); 


app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ limit: "300mb", extended: true, parameterLimit: 3000000  }));

app.use("/health", (req, res) => {
    res.sendStatus(200);
});

app.use(cors({
    origin: true,
    credentials: true
}));
  
// app.use("/api/user",userRoutes);
app.use('/api/members',membersRoutes);

export default app;


