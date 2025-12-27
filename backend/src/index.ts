import express, { Request, Response } from 'express'
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
import cors from 'cors';
app.use(cors());

// Static folder
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// DB Connection
import { ConnectDB } from './db';
ConnectDB();

// Routes
import investorRoutes from './routes/investor.routes';
import officeRoutes from './routes/office.routes';
import contactRoutes from './routes/contact.routes';
import partnerRoutes from './routes/partner.routes';
import galleryRoutes from './routes/gallery.routes';
import newsRoutes from './routes/news.routes';
import eventRoutes from './routes/event.routes';
import careerRoutes from './routes/career.routes';
import employeeRoutes from './routes/employee.routes';
import salesExpertRoutes from './routes/salesExpert.routes';




app.use('/api/investor', investorRoutes);
app.use('/api/office', officeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/sales-experts', salesExpertRoutes);




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});