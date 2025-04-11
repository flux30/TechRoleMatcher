import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Skills schema
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
});

// Job roles schema
export const jobRoles = pgTable("job_roles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requiredSkills: jsonb("required_skills").notNull(), // Array of skill IDs
});

export const insertJobRoleSchema = createInsertSchema(jobRoles).pick({
  title: true,
  description: true,
  requiredSkills: true,
});

// Types for the frontend
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type InsertJobRole = z.infer<typeof insertJobRoleSchema>;
export type JobRole = typeof jobRoles.$inferSelect;

// Type for recommendation response
export interface Recommendation {
  id: number;
  title: string;
  description: string;
  matchPercentage: number;
  matchedSkills: Skill[];
  requiredSkills: Skill[];
}

// Request schema for recommendations
export const recommendRequestSchema = z.object({
  skills: z.array(z.number()).min(2).max(5),
});

export type RecommendRequest = z.infer<typeof recommendRequestSchema>;
