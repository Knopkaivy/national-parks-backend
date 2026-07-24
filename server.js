import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);

(async () =>{
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})();