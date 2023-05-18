import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverRoutes from './routes/requests.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());
app.use(cors());

app.use('/bruinshare', serverRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));
