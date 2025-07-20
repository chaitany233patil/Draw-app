import { Request, Response } from "express";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import { JWT_SECRETE } from "../../node_modules/@repo/common-backend/dist/config";
import admin from "../utils/firebase";

export const signup = async (req: Request, res: Response) => {
  try {
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
    const { tokenID } = req.body;
    if (tokenID) {
      const decoded = await admin.auth().verifyIdToken(tokenID);
      console.log(decoded);
      const { uid } = decoded;

      const token = jwt.sign({ userid: uid }, JWT_SECRETE);
      res.json({ success: true, token });
      console.log("done");
      return;
    }
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

export const verify = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    console.log(token);
    if (!token) {
      res.status(400).json({
        message: "Inavlid Credentials!",
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRETE);
    res.status(200).json({
      success: true,
    });
    return;
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Inavlid Credentials!",
    });
  }
};
