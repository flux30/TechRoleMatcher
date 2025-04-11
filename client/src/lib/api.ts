import { Skill, Recommendation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

// Get all available skills
export async function getSkills(): Promise<Skill[]> {
  const response = await apiRequest("GET", "/api/skills", undefined);
  return response.json();
}

// Get job recommendations based on selected skills
export async function getRecommendations(
  skillIds: number[]
): Promise<Recommendation[]> {
  const response = await apiRequest(
    "POST",
    "/api/recommend",
    { skills: skillIds }
  );
  return response.json();
}
