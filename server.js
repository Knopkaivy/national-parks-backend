import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
