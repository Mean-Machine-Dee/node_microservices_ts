import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { SECRET_KEY,EXPIRES_IN } from "../config"


 class AuthHandler{

    //============= PASSWORDS ========//
         saltRounds;
 
         constructor(){
            this.saltRounds = 10;
         }

         generateSalt = async () =>{
            return await bcrypt.genSalt(this.saltRounds)
        }


        generatePassword = async (password,salt) =>{
            return await bcrypt.hash(password,salt)
        }

        validatePassword = async (requestPassword,savedPassword, salt) =>{
            return (await this.generatePassword(requestPassword,salt) === savedPassword)
        }

        generateToken = async (payload) =>{
            try{
                return await jwt.sign(payload,SECRET_KEY, {"expiresIn":EXPIRES_IN})
            }catch(err){
                console.log("error",err)
            }
        }

        validateToken = async (req) =>{
            try{
                const token = req.get("Authorization")
                const payload = await jwt.verify(token.split(" ")[1], SECRET_KEY)
                req.user = payload
                return true
            }catch(err){
                return false
            }
        }


}

export default new AuthHandler()