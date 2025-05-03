import { Request, Response } from "express";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import { JWT_SECRETE } from "../../node_modules/@repo/common-backend/dist/config";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    res.json({
      message: "signup Successfully!",
      user: {
        email,
        username,
        password,
      },
    });
    return;
  } catch (err) {
    res.status(400).json({
      message: "Incorrect Input!",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { password, username } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
        password,
      },
    });

    if (!user) {
      res.json({
        message: "User Not Found!",
      });
      return;
    }

    const token = jwt.sign({ userid: user.id }, JWT_SECRETE);

    res.json({
      message: "signin Successfully!",
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "User Already exist",
    });
  }
};
