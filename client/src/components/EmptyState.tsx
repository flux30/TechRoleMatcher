import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Code, LineChart, GraduationCap } from "lucide-react";

interface EmptyStateProps {
  onStart: () => void;
}

export default function EmptyState({ onStart }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-card rounded-xl p-8 shadow-lg text-center border border-primary/10">
        <div className="flex justify-center mb-6">
          <div className="text-primary rounded-full bg-primary/10 p-5">
            <BrainCircuit className="h-10 w-10" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-4">
          Discover Your Ideal IT Career Path
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Our intelligent matching algorithm will analyze your skills and recommend the most suitable roles in the tech industry.
        </p>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-accent/50 rounded-lg flex flex-col items-center">
            <Code className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">Expert Skill Matching</span>
          </div>
          <div className="p-3 bg-accent/50 rounded-lg flex flex-col items-center">
            <LineChart className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">Compatibility Scoring</span>
          </div>
          <div className="p-3 bg-accent/50 rounded-lg flex flex-col items-center">
            <GraduationCap className="h-5 w-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">Career Guidance</span>
          </div>
        </div>
        
        <Button
          onClick={onStart}
          className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-5 rounded-lg"
        >
          Start Exploring Careers
        </Button>
      </div>
    </motion.div>
  );
}
