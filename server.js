import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
