import mongoose, { Document, model } from "mongoose";
import { IAddress } from "../../interfaces/customer";
const Schema = mongoose.Schema


const addressSchema = new Schema({
    street: String,
    postalCode: String,
    city: String,
    country: String
}, {
    timestamps: true
})

const AddressModel = model<IAddress & Document>('Address', addressSchema)
export default AddressModel
