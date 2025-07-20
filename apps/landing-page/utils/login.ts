import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export const HandleLoginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();

  const res = await fetch("http://localhost:5000/api/v1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  console.group(res);
};
