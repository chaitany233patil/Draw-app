"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        console.log("User is logged in:", user.displayName);
        alert("done");
      } else {
        window.location.href = "http://localhost:3000";
      }
    });
  }, []);

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <div>Hello</div>
    </div>
  );
}
