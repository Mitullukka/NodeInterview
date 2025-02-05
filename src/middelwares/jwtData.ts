import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req:any, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, config.get("JWT_ACCESS_SECRET")) as { userId: string };
        
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}
