import { useState, useRef, useEffect } from "react";
import { Skill } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, ChevronDown } from "lucide-react";
import SkillChip from "./SkillChip";
import { cn } from "@/lib/utils";

interface SkillSelectorProps {
  skills: Skill[];
  selectedSkills: Skill[];
  isLoading: boolean;
  onAddSkill: (skill: Skill) => void;
  onRemoveSkill: (skillId: number) => void;
  onSubmit: () => void;
}

export default function SkillSelector({
  skills,
  selectedSkills,
  isLoading,
  onAddSkill,
  onRemoveSkill,
  onSubmit,
}: SkillSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter skills based on search term and already selected skills
  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.some((selected) => selected.id === skill.id)
  );

  // Validation message based on the number of selected skills
  const getValidationMessage = () => {
    const count = selectedSkills.length;
    
    if (count === 0) {
      return { message: "Please select at least 2 skills", type: "error" };
    } else if (count < 2) {
      return { message: "Please select at least one more skill", type: "warning" };
    } else if (count > 5) {
      return { message: "You can select a maximum of 5 skills", type: "error" };
    } else {
      return { 
        message: `Great! You've selected ${count} skill${count === 1 ? "" : "s"}`,
        type: "success"
      };
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validation = getValidationMessage();
  const isSubmitDisabled = selectedSkills.length < 2 || selectedSkills.length > 5;

  return (
    <div className="mb-8 bg-card rounded-xl p-5 shadow-lg">
      {/* Skill Dropdown */}
      <div className="relative mb-4" ref={dropdownRef}>
        <div
          className="flex items-center justify-between bg-accent text-white rounded-lg px-4 py-3 cursor-pointer border border-border hover:border-primary transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedSkills.length > 0 ? `${selectedSkills.length} skill${selectedSkills.length !== 1 ? 's' : ''} selected` : 'Search and select skills...'}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-accent rounded-lg shadow-lg border border-border animate-fade-in">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-black rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="p-2 max-h-[250px] overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  Loading skills...
                </div>
              ) : filteredSkills.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No matching skills found
                </div>
              ) : (
                filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-2 rounded-md bg-accent-foreground/20 hover:bg-accent-foreground cursor-pointer transition-colors flex items-center justify-between hover:text-white my-1"
                    onClick={() => {
                      onAddSkill(skill);
                      setSearchTerm('');
                    }}
                  >
                    <span className="font-medium text-white">{skill.name}</span>
                    <div className="text-xs bg-primary/40 text-white px-2 py-0.5 rounded-full hover:bg-primary">Click to add</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Skills */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Selected Skills (2-5):
        </h3>

        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {selectedSkills.map((skill) => (
            <SkillChip
              key={skill.id}
              skill={skill}
              onRemove={() => onRemoveSkill(skill.id)}
            />
          ))}
        </div>

        <div 
          className={cn(
            "mt-3 text-sm font-medium flex items-center",
            validation.type === "success" && "text-green-500",
            validation.type === "warning" && "text-amber-500",
            validation.type === "error" && "text-rose-500"
          )}
        >
          {validation.type === "error" && (
            <div className="bg-rose-500/10 p-1 rounded-full mr-2">
              <span className="text-rose-500 text-xs">!</span>
            </div>
          )}
          {validation.type === "warning" && (
            <div className="bg-amber-500/10 p-1 rounded-full mr-2">
              <span className="text-amber-500 text-xs">!</span>
            </div>
          )}
          {validation.type === "success" && (
            <div className="bg-green-500/10 p-1 rounded-full mr-2">
              <span className="text-green-500 text-xs">✓</span>
            </div>
          )}
          {validation.message}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        className={cn(
          "mt-6 w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center",
          isSubmitDisabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span>Get Job Recommendations</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
