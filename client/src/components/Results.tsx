import { motion } from "framer-motion";
import ResultCard from "./ResultCard";
import { Recommendation } from "@shared/schema";
import { Award, BarChart, ArrowUp } from "lucide-react";

interface ResultsProps {
  recommendations: Recommendation[];
}

export default function Results({ recommendations }: ResultsProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-card rounded-xl p-8 shadow-lg text-center border border-primary/10">
        <div className="text-muted-foreground mb-2">
          <BarChart className="h-12 w-12 mx-auto opacity-50 mb-4" />
          <p className="text-lg font-medium text-white">No matching job roles found</p>
          <p className="text-sm mt-2">Try selecting different skills to get recommendations</p>
        </div>
      </div>
    );
  }

  // Sort recommendations by match percentage (highest first)
  const sortedRecommendations = [...recommendations].sort((a, b) => 
    b.matchPercentage - a.matchPercentage
  );

  // Get top match
  const topMatch = sortedRecommendations[0];
  // Get other matches
  const otherMatches = sortedRecommendations.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Results Header */}
      <div className="mb-8 text-center">
        <motion.div 
          className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            <span>Matching Complete</span>
          </span>
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Career Recommendations</h2>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Based on your selected skills, we've analyzed {recommendations.length} potential career paths 
          that match your technical expertise.
        </p>
      </div>

      {/* Top Match Section */}
      {topMatch && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Best Match</h3>
            <div className="h-px flex-grow bg-border mx-4"></div>
          </div>
          <ResultCard
            key={topMatch.id}
            recommendation={topMatch}
            delay={0}
          />
        </div>
      )}
      
      {/* Other Matches Section */}
      {otherMatches.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Other Matches</h3>
            <div className="h-px flex-grow bg-border mx-4"></div>
            <span className="text-xs text-muted-foreground">{otherMatches.length} results</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherMatches.map((recommendation, index) => (
              <ResultCard
                key={recommendation.id}
                recommendation={recommendation}
                delay={(index + 1) * 100}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Back to top button */}
      <motion.button
        className="mt-8 mx-auto flex items-center justify-center text-xs text-primary bg-primary/10 rounded-full px-4 py-2 hover:bg-primary/20 transition-colors"
        whileHover={{ y: -2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="h-3 w-3 mr-1" />
        <span>Back to top</span>
      </motion.button>
    </motion.div>
  );
}
