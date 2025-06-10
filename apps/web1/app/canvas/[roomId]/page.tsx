"use client";

import { Canvas } from "@/app/components/Canvas";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HTTP_BACKEND } from "@/app/config";

export default function RoomCanvas() {
  const { roomId } = useParams<{ roomId: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roomStatus, setRoomStatus] = useState(true);

  useEffect(() => {
    const getRoomStatus = async () => {
      const response = await fetch(HTTP_BACKEND + `/api/v1/verify/${roomId}`);
      const res = await response.json();
      console.log(res);
      if (!res.status) {
        setRoomStatus(false);
      }
    };
    getRoomStatus();
  }, [roomId]);

  if (!roomStatus) return <div>Room Does Not Exist.</div>;

  return (
    <Canvas
      canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
      roomId={roomId}
    />
  );
}
