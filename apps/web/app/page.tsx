"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const roomID = "room_" + Date.now().toString(36);
    window.location.href = `/canvas/${roomID}`;
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>Loading...</div>
    </div>
  );
}
