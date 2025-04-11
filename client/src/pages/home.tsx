import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SkillSelector from "@/components/SkillSelector";
import Results from "@/components/Results";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import { Skill, Recommendation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Fetch the list of skills
  const { data: skills, isLoading: isLoadingSkills } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  // Function to handle skill selection
  const handleAddSkill = (skill: Skill) => {
    if (selectedSkills.length >= 5) {
      toast({
        title: "Maximum skills reached",
        description: "You can select a maximum of 5 skills",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Function to handle skill removal
  const handleRemoveSkill = (skillId: number) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId));
  };

  // Function to handle job recommendation request
  const handleGetRecommendations = async () => {
    if (selectedSkills.length < 2 || selectedSkills.length > 5) {
      toast({
        title: "Invalid skill selection",
        description: "Please select between 2 and 5 skills",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setShowResults(false);
      
      const response = await apiRequest(
        "POST",
        "/api/recommend",
        { skills: selectedSkills.map(skill => skill.id) }
      );
      
      const data = await response.json();
      setRecommendations(data);
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Failed to get recommendations",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header with Visual Enhancement */}
      <header className="mb-12 text-center">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-2xl shadow-lg mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            IT Job Role Recommender
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-4 rounded-full"></div>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Discover the perfect IT career path that matches your technical expertise
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Data-Driven</span>
          <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Skill-Based Matching</span>
          <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Career Guidance</span>
        </div>
        <p className="text-muted-foreground text-sm md:text-base">
          Select 2-5 technical skills below to get personalized job role recommendations
        </p>
      </header>

      {/* Skill Selector */}
      <SkillSelector 
        skills={skills || []}
        selectedSkills={selectedSkills}
        isLoading={isLoadingSkills}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        onSubmit={handleGetRecommendations}
      />

      {/* Loading State */}
      {isSubmitting && <LoadingState />}

      {/* Results or Empty State */}
      {(!isSubmitting && showResults) ? (
        <Results recommendations={recommendations} />
      ) : (!isSubmitting && !showResults && selectedSkills.length === 0) ? (
        <EmptyState onStart={() => null} />
      ) : null}
    </div>
  );
}
