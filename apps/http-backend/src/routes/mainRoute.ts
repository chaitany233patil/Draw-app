import { Router } from "express";
import { signin, signup } from "../controllers/authController";
import { createRoom } from "../controllers/roomControlller";
import { Auth } from "../middleware";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/room/:slug", Auth, createRoom);

export default router;
