import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const authJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (token === undefined || token === null) {
            return next(new ApiError(401, "token not found"));
        }

        const jwtData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(jwtData?._id);

        if (!user) {
            throw new ApiError(401, "Unauthorised Access token");
        }
        req.user = user;
        next();
    } catch (error) {
        return next(
            new ApiError(401, error?.message || "Invalid access token")
        );
    }
});
