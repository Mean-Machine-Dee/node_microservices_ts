import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET_KEY, EXPIRES_IN } from "../config";

class AuthHandler {
  //============= PASSWORDS ========//
  saltRounds;

  constructor() {
    this.saltRounds = 10;
  }

  generateSalt = async (): Promise<string> => {
    return await bcrypt.genSalt(this.saltRounds);
  };

  generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
  };

  validatePassword = async (
    requestPassword: string,
    savedPassword: string,
    salt: string
  ) => {
    return (
      (await this.generatePassword(requestPassword, salt)) === savedPassword
    );
  };

  generateToken = async (payload: any) => {
    try {
      return await jwt.sign(payload, SECRET_KEY ? SECRET_KEY : "secret", {
        expiresIn: EXPIRES_IN,
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  validateToken = async (req: any) => {
    try {
      const token = req.get("Authorization");
      const payload = await jwt.verify(
        token.split(" ")[1],
        SECRET_KEY ? SECRET_KEY : "secret"
      );
      req.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  };
}

export default new AuthHandler();
