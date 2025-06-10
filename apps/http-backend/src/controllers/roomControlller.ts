import { Request, Response } from "express";
import { prisma } from "@repo/db";

export const createRoom = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { slug } = req.params;
  try {
    const room = await prisma.room.create({
      data: {
        userId,
        //@ts-ignore
        slug,
      },
    });
    if (!room) {
      res.status(400).json({
        message: "Unexpected Error Occured!",
      });
    }

    res.json({
      roomId: room.id,
    });
  } catch (err) {
    res.status(400).json({
      message: "Somthing Went Wrong!",
    });
  }
};

export const allShapes = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const allShapes = await prisma.chats.findMany({
    where: {
      RoomId: Number(roomId),
    },
  });

  const shapes = allShapes.map((shape) => {
    return JSON.parse(shape.message);
  });

  res.json({
    shapes,
  });
};

export const getRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const roomStatus = await prisma.room.findFirst({
    where: {
      id: Number(roomId),
    },
  });

  if (roomStatus) {
    res.json({
      status: true,
    });
    return;
  }

  res.json({
    status: false,
  });
};
