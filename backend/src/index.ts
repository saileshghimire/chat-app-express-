import express, { Request, Response} from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import { PORT } from './secret';
import rootRouter from './route';
import { PrismaClient } from '@prisma/client';
import { setupSocketServer } from './server/server';

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

app.use('/api/v1', rootRouter);

app.get('/', (req: Request,res: Response)=>{
    res.json("Hello ..")
})
export const prisma = new PrismaClient()
setupSocketServer(server);

server.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });