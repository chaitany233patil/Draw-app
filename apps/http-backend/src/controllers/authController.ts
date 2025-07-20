import { Request, Response } from "express";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import { JWT_SECRETE } from "../../node_modules/@repo/common-backend/dist/config";

export const signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password, username } = req.body;
    console.log(email, password, username);
    await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    res.json({
      success: true,
      message: "signup Successfully!",
    });
    return;
  } catch (err) {
    console.log("ERRO :", err);
    res.status(400).json({
      success: false,
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
        success: false,
        message: "User Not Found!",
      });
      return;
    }

    const token = jwt.sign({ userid: user.id }, JWT_SECRETE);

    res.json({
      success: true,
      message: "signin Successfully!",
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "User Already exist",
    });
  }
};
