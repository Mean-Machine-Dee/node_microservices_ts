import { custom } from "zod";
import { CustomError } from "../../config/custom-error.model";
import { IAddress, ICustomer, IUser, IWishlist } from "../../interfaces/customer";
import AddressModel from "../models/address.model";
import CustomerModel from "../models/customer.model";
import authHandler from "../../utils/auth";
import { customerSchema } from "../../schemas/customer";



interface ICustomerRepository{
    save(customer: ICustomer) : Promise<IUser>
    getCustomerById(id: number) : Promise<ICustomer | null>
    addAddress (id: string, address: IAddress): Promise<any>
}

class CustomerRepository implements ICustomerRepository{

    async findCustomer(email: string){
        return await CustomerModel.findOne({email: email})
    }
   
    async save(customer: ICustomer): Promise<IUser> {
        const {email,password,phone} = customer
        try{

            const salt = await authHandler.generateSalt()
            const userPassword = await authHandler.generatePassword(password,salt)
            customer.password = userPassword
            customer.salt = salt
            const newCustomer = new CustomerModel(
                customer
            ) 
            const user =  await newCustomer.save()
            const authToken = await authHandler.generateToken({email:email, _id:user._id, phone: phone})
            return ({email: email, token: authToken })
        }catch(err:any){
            console.log(err)
            throw new CustomError(err.stackTrace,400)
        }
       
    }
    


    async getCustomerById(id: number): Promise<ICustomer>{
        try{
            return await CustomerModel.findById(id) as ICustomer;
        }catch(err: any){
            throw new CustomError(err.stackTrace,404)
        }
    }


    async addAddress(id: string, address: IAddress) {
        const profile = await CustomerModel.findById(id);
         if(profile){
            const newAddress = new AddressModel(address);
            await newAddress.save();
            profile.address?.push(newAddress);
         }
         return await profile?.save()
         
    }

    async handleWishList(data: any) {
        const {customer_id,name,description,price,available,banner } = data
        const _id = data.product_id;

        const product : IWishlist = { _id,name,description,available,price,banner}
        const customer = await CustomerModel.findById(customer_id).populate("wishlist")
        if(customer){
            let wishlist = customer.wishList
            if(wishlist.length > 0){
                let exists = false
                wishlist.map(item =>{
                    if(item._id.toString() === product._id){
                        const index = wishlist?.indexOf(item)
                        wishlist?.splice(index,1)
                        exists = true
                    }
                })
                if(!exists){
                    wishlist.push(product)
                }
            }else{
                wishlist.push(product)
            }

            customer.wishList = wishlist

            await customer.save()

        }
    }

   


    // async createAddress(id:string, address: IAddress): Promise<ICustomer | null> {
    //     const newAddress = new AddressModel(address)
    //     await newAddress.save();
    //     return null;
    //     // return await CustomerModel.findById(id);

     
    //     // profile.address?.push(newAddress)
    
    //     //   try{
    //     //     if(profile){
    //     //         const newAddress = new AddressModel(address)
    //     //         await newAddress.save();
    //     //         profile.address?.push(newAddress)
    //     //     }
    //     //     return await profile?.save() as ICustomer
    //     //   }catch(err){
    //     //         throw new Error("Not Found")
    //     //   }
       

    
    // }


   

}

export default new CustomerRepository()