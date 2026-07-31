import mongoose from "mongoose";
const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variant: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
);

inventorySchema.index({ product: 1, variant: 1 }, { unique: true });

export default mongoose.model("Inventory", inventorySchema);
