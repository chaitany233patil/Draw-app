"use client";

import { Navbar } from "@/components/Navbar";
import { Main } from "@/components/Main";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const params = useSearchParams();
  const urlToken = params.get("token");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (urlToken) {
      localStorage.setItem("token", urlToken);
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
      setIsLoading(true);
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
        setIsLoading(false);
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Navbar />
          <Main />
        </>
      )}
    </div>
  );
}
