import { Request, Response } from "express";
import { logger } from "@/services";

export class WebhookController {
  public async handleQualtricsResponse(req: Request, res: Response) {
    // --- Start of new simplified test code ---

    // Log everything we receive from Qualtrics for debugging.
    // You will need to check your server logs (e.g., on Supabase or your hosting provider) to see this output.
    logger.info("--- Qualtrics Test Webhook Triggered ---");
    logger.info("Received headers from Qualtrics: " + JSON.stringify(req.headers, null, 2));
    logger.info("Received body from Qualtrics: " + JSON.stringify(req.body, null, 2));

    // Immediately send a success response. We are not touching the database.
    res.status(200).json({
      status: "success",
      message: "Test webhook received successfully. Check server logs for data.",
      received_data: req.body,
    });

    // --- End of new simplified test code ---
  }
}