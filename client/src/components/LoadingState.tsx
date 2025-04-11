import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-8"
    >
      <div className="bg-card rounded-xl p-5 shadow-lg">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white font-medium">Analyzing your skills...</p>
          <p className="text-muted-foreground text-sm mt-2">Finding the perfect job roles for you</p>
        </div>
      </div>
    </motion.div>
  );
}
