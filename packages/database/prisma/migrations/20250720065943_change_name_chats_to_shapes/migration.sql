/*
  Warnings:

  - You are about to drop the `Chats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_RoomId_fkey";

-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_userId_fkey";

-- DropTable
DROP TABLE "Chats";

-- CreateTable
CREATE TABLE "Shapes" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "RoomId" INTEGER NOT NULL,

    CONSTRAINT "Shapes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shapes" ADD CONSTRAINT "Shapes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shapes" ADD CONSTRAINT "Shapes_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
