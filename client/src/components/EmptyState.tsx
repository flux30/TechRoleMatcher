import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

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
      <div className="bg-card rounded-xl p-8 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="text-muted-foreground rounded-full bg-accent p-4">
            <Lightbulb className="h-8 w-8" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Ready to discover your ideal IT role?
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Select 2-5 technical skills you're proficient in, and we'll match you with 
          the most compatible job roles in the tech industry.
        </p>
        <Button
          onClick={onStart}
          className="bg-primary hover:bg-primary/90 text-white font-medium"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
}
