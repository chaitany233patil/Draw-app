import styles from "./page.module.css";
import { prisma } from "@repo/db";

export default async function Home() {
  // Insert a hardcoded user (only once)
  const existingUser = await prisma.user.findFirst();

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com", // assuming `email` is a required field
      },
    });
  }

  const user = await prisma.user.findFirst();

  return <div className={styles.page}>{user?.name ?? "No user added yet"}</div>;
}
