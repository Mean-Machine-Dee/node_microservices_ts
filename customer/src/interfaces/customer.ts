import { Types } from "mongoose";
type ID = Types.ObjectId



export interface LoginResponse {
    user:string,
    email:string,
    token: string
}

export interface IAddress {
    _id ?:string
    street: string,
    postalCode:string,
    city:string,
    country: string
}


export interface IProduct{
    _id: string,
    name: string,
    description: string,
    banner: string,
    available: string,
    price: number
}



export interface IOrder{
    _id: string,
    amount: number,
    date: Date,
}

export interface IWishlist
    {
        _id: string,
        name: string,
        description: string,
        banner: string,
        available: boolean,
        price: number ,
    }

export interface ICart
        {
          product: { 
                _id: string,
                name: string,
                banner: string,
                price: number,
            },
          unit: number
        }
    
export interface IUser{
    email:string;
    token:string;
}


export interface ICustomer {
    _id: string;
    email: string;
    password: string;
    phone:string;
    salt:string;
    cart ?: ICart[];
    wishList : IWishlist[];
    orders ?: IOrder[]
    address ?: IAddress[]
  }


