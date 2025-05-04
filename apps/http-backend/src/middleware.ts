import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRETE } from "../node_modules/@repo/common-backend/dist/config";
import { prisma } from "@repo/db";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  try {
    if (!token) {
      res.status(400).json({
        message: "Inavlid Credentials!",
      });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRETE);
    const user = await prisma.user.findFirst({
      where: {
        id: (decoded as JwtPayload).userid,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "User Not Found!",
      });
    }

    req.userId = user?.id;
    return next();
  } catch (err) {
    res.status(400).json({
      message: "Inavlid Credentials!",
    });
  }
};
