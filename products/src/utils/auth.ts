import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET_KEY, EXPIRES_IN } from "../config";
class AuthHandler {
  generateToken = async (payload: any) => {
    try {
      return await jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    } catch (err) {
      console.log("error", err);
    }
  };

  validateToken = async (req: any) => {
    try {
      const token = req.get("Authorization");
      const payload = await jwt.verify(token.split(" ")[1], SECRET_KEY);
      req.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  };
}
