import { Router } from "express";
import { signin, signup } from "../controllers/authController";
import { allShapes, createRoom, getRoom } from "../controllers/roomControlller";
import { Auth } from "../middleware";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/room/:slug", Auth, createRoom);
router.get("/room/:roomId", allShapes);
router.get("/verify/:roomId", getRoom); 

export default router;
