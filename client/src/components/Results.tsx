import { motion } from "framer-motion";
import ResultCard from "./ResultCard";
import { Recommendation } from "@shared/schema";

interface ResultsProps {
  recommendations: Recommendation[];
}

export default function Results({ recommendations }: ResultsProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No recommendations found.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-white mb-4">Your Recommended Job Roles</h2>
      
      {recommendations.map((recommendation, index) => (
        <ResultCard
          key={recommendation.id}
          recommendation={recommendation}
          delay={index * 100}
        />
      ))}
    </motion.div>
  );
}
