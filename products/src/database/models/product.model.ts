import { timeStamp } from "console";
import mongoose, { Document, model, trusted } from "mongoose";
import { IProduct } from "../../interfaces";

const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    unit: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: Boolean,
    suplier: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct & Document>("Products", productSchema);
export default ProductModel;
