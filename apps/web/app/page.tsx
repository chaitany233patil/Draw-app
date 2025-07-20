"use client";

import { Navbar } from "@/components/Navbar";
import { Main } from "@/components/Main";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const params = useSearchParams();
  const urlToken = params.get("token");

  useEffect(() => {
    // If URL has a token, store it in localStorage
    if (urlToken) {
      localStorage.setItem("token", urlToken);
      // Remove token from URL after storing
      window.history.replaceState({}, "", "/");
    }
  }, [urlToken]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (!localToken) {
      window.location.href = "http://localhost:3000";
      return;
    }

    async function verifyToken() {
      try {
        const res = await axios.post("http://localhost:5000/api/v1/verify", {
          token: localToken,
        });

        if (!res.data.success) {
          localStorage.removeItem("token");
          window.location.href = "http://localhost:3000";
        } else {
          console.log("Welcome back!");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000";
      }
    }

    verifyToken();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <Main />
    </div>
  );
}
