import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { TUserRole } from "../interface/globle";
import catchAsync from "../utility/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from "../config/config";
import { User } from "../modules/users/user.model";
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.access_token_secrete as string,
    ) as JwtPayload;

    
    const { role, username,  } = decoded;

    // checking if the user is exist
    const user = await User.findOne({username});

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    

    
 
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;