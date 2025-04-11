import express, { Router, type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { recommendRequestSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = Router();
  
  // Get all skills
  apiRouter.get("/skills", async (_req, res) => {
    try {
      const skills = await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ 
        error: "Failed to fetch skills",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Get job recommendations based on selected skills
  apiRouter.post("/recommend", async (req, res) => {
    try {
      const validatedData = recommendRequestSchema.parse(req.body);
      const recommendations = await storage.getRecommendations(validatedData.skills);
      res.json(recommendations);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Invalid request data", 
          details: fromZodError(error).message
        });
      } else {
        res.status(500).json({ 
          error: "Failed to get recommendations",
          details: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });
  
  // Use api prefix for all routes
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
