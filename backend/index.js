import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverRoutes from './routes/requests.js';
import postRoutes from './routes/postRoutes.js';


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());

// const cors=require("cors");
const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/bruinshare', serverRoutes);
app.use('/bruinshare', postRoutes);

// app.get('/places-autocomplete', async (req, res) => {
//     // console.log(req);
//     const inputValue = req.query.input;

//     // console.log(inputValue);

//     const fetchOptions = async () => {
//       try {
//         const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCp-Anp2C_fMkiB8BSaxP9KcMsSQ-fg-_g&input=${inputValue}`);
//         const data = await response.json();
//         res.json(data);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching data' });
//       }
//     };
  
//     fetchOptions();
//   });  

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is listening on port:${PORT}`));
