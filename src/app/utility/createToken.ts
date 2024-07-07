import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';




export const createToken=(data:JwtPayload,expiresIn:string)=>{
      return  jwt.sign(data, config.access_token_secrete as string, { expiresIn });
}
