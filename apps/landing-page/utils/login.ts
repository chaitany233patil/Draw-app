import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export const HandleLoginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const tokenID = await result.user.getIdToken();

  const res = await fetch("http://localhost:5000/api/v1/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokenID }),
  });
  const data = await res.json();
  if (data.success) {
    window.location.href = "http://localhost:3001?token=" + data.token;
  } else {
    alert("Somthing Went Wrong");
  }
};
