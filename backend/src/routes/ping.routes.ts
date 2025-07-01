import type { Request, Response } from "express";
import { Router } from "express";

const pingRouter = Router();

pingRouter.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

export default pingRouter;
