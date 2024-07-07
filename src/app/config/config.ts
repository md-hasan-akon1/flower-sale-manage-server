import  dotenv from "dotenv";
import path from 'path'
dotenv.config({path: path.join(process.cwd(),'.env')});

export const config={
 

 database_url:process.env.DATABASE_URL,
 access_token_secrete:process.env.ACCESS_TOKEN_SECRETE,
 node_env:process.env.NODE_ENV

}