import { Request, Response } from "express";

export class AdminController {
  public dashboard = async (req: Request, res: Response) => {
    try {
      // You can add any admin-specific data fetching here
      res.status(200).json({ 
        message: "Welcome to the admin dashboard",
        user: req.user // Optional: include user info
      });
    } catch (error) {
      console.error("Admin dashboard error:", error);
      res.status(500).json({ message: "Failed to load admin dashboard" });
    }
  };
}

export default AdminController;