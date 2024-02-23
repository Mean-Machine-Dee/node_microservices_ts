import mongoose, { Document, model } from "mongoose";
import { ICustomer } from "../../interfaces/customer";
import { authorizationRoles } from "../../constants";
const Schema = mongoose.Schema

const customerSchema = new Schema({
    email: { type: String, unique:true},
    password: String,
    phone: String,
    salt:String,
    address:[
        {type:Schema.Types.ObjectId, ref: "address", require:true}],
    cart: [
        {
            product: {
                _id: {type:String, require:true},
                name: { type: String},
                banner: { type: String},
                price: { type: Number},
            },
            unit: { type:Number, require:true}
        }
    ],
    wishlist:[
        { 
            _id: { type: String, require: true },
            name: { type: String },
            description: { type: String },
            banner: { type: String },
            avalable: { type: Boolean },
            price: { type: Number },
        }
    ],
    orders: [ 
        {
            _id: {type: String, required: true},
            amount: { type: String},
            date: {type: Date, default: Date.now()}
        }
    ],
    roles:{
        type: String,
        lowercase : true,
        enum: [
            authorizationRoles.admin,
            authorizationRoles.client,
            authorizationRoles.supervisor,
            authorizationRoles.user
        ],
        default: authorizationRoles.user
    }

}, {
     timestamps: true
})

const CustomerModel = model<ICustomer & Document>('Customer', customerSchema)
export default CustomerModel