import { Skill, Recommendation, JobRole } from "@shared/schema";

export interface IStorage {
  // User methods (keeping for reference)
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Skill methods
  getAllSkills(): Promise<Skill[]>;
  getSkillById(id: number): Promise<Skill | undefined>;
  
  // Job recommendation methods
  getRecommendations(skillIds: number[]): Promise<Recommendation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private skills: Map<number, Skill>;
  private jobRoles: Map<number, JobRole>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.jobRoles = new Map();
    this.currentId = 1;
    
    // Initialize with skills data
    this.initializeSkills();
    
    // Initialize with job roles data
    this.initializeJobRoles();
  }

  // User methods (keeping for reference)
  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Skill methods
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }
  
  async getSkillById(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }
  
  // Job recommendation methods
  async getRecommendations(skillIds: number[]): Promise<Recommendation[]> {
    if (skillIds.length < 2 || skillIds.length > 5) {
      throw new Error("Please select between 2 and 5 skills");
    }
    
    const selectedSkills = skillIds
      .map(id => this.skills.get(id))
      .filter((skill): skill is Skill => !!skill);
    
    if (selectedSkills.length !== skillIds.length) {
      throw new Error("One or more selected skills could not be found");
    }
    
    // Calculate match scores for all job roles
    const scoredRoles: Array<{role: JobRole; score: number; matchedSkills: Skill[]}> = [];
    
    for (const role of this.jobRoles.values()) {
      const requiredSkillIds = role.requiredSkills as number[];
      
      // Find matched skills
      const matchedSkills = selectedSkills.filter(skill => 
        requiredSkillIds.includes(skill.id)
      );
      
      // Calculate match percentage
      const matchScore = Math.round(
        (matchedSkills.length / requiredSkillIds.length) * 100
      );
      
      // Only include roles with a match score greater than 0%
      if (matchScore > 0) {
        scoredRoles.push({
          role,
          score: matchScore,
          matchedSkills,
        });
      }
    }
    
    // Sort roles by score (descending)
    scoredRoles.sort((a, b) => b.score - a.score);
    
    // Return all matching recommendations (not just top 3)
    const matchingRecommendations = scoredRoles;
    
    // Format the response
    return matchingRecommendations.map(({ role, score, matchedSkills }) => {
      const requiredSkills = (role.requiredSkills as number[])
        .map(id => this.skills.get(id))
        .filter((skill): skill is Skill => !!skill);
        
      return {
        id: role.id,
        title: role.title,
        description: role.description,
        matchPercentage: score,
        matchedSkills,
        requiredSkills,
      };
    });
  }
  
  // Initialize the skills data
  private initializeSkills() {
    const skillsData: { id: number; name: string }[] = [
      { id: 1, name: 'React' },
      { id: 2, name: 'Node.js' },
      { id: 3, name: 'TypeScript' },
      { id: 4, name: 'JavaScript' },
      { id: 5, name: 'Python' },
      { id: 6, name: 'Java' },
      { id: 7, name: 'C#' },
      { id: 8, name: 'PHP' },
      { id: 9, name: 'Ruby' },
      { id: 10, name: 'Go' },
      { id: 11, name: 'Swift' },
      { id: 12, name: 'Kotlin' },
      { id: 13, name: 'Rust' },
      { id: 14, name: 'AWS' },
      { id: 15, name: 'Azure' },
      { id: 16, name: 'GCP' },
      { id: 17, name: 'Docker' },
      { id: 18, name: 'Kubernetes' },
      { id: 19, name: 'Git' },
      { id: 20, name: 'SQL' },
      { id: 21, name: 'MongoDB' },
      { id: 22, name: 'GraphQL' },
      { id: 23, name: 'Redis' },
      { id: 24, name: 'Django' },
      { id: 25, name: 'Flask' },
      { id: 26, name: 'Spring Boot' },
      { id: 27, name: 'Express' },
      { id: 28, name: 'Angular' },
      { id: 29, name: 'Vue.js' },
      { id: 30, name: 'Next.js' },
      { id: 31, name: 'CI/CD' },
      { id: 32, name: 'DevOps' },
      { id: 33, name: 'Data Science' },
      { id: 34, name: 'Machine Learning' },
      { id: 35, name: 'TensorFlow' },
      { id: 36, name: 'C++' },
      { id: 37, name: 'C' },
      { id: 38, name: 'Scala' },
      { id: 39, name: 'Haskell' },
      { id: 40, name: 'R' },
      { id: 41, name: 'MATLAB' },
      { id: 42, name: 'Perl' },
      { id: 43, name: 'Elixir' },
      { id: 44, name: 'Clojure' },
      { id: 45, name: 'Assembly' },
      { id: 46, name: 'COBOL' },
      { id: 47, name: 'Fortran' },
      { id: 48, name: 'Objective-C' },
      { id: 49, name: 'Dart' },
      { id: 50, name: 'Flutter' },
      { id: 51, name: 'React Native' },
      { id: 52, name: 'Unity' },
      { id: 53, name: 'Unreal Engine' },
      { id: 54, name: 'Selenium' },
      { id: 55, name: 'Cypress' },
      { id: 56, name: 'Jest' },
      { id: 57, name: 'Mocha' },
      { id: 58, name: 'Chai' },
      { id: 59, name: 'PyTorch' },
      { id: 60, name: 'Keras' }
    ];
    
    for (const skill of skillsData) {
      this.skills.set(skill.id, skill);
    }
  }
  
  // Initialize the job roles data with required skills
  private initializeJobRoles() {
    const jobRolesData: { id: number; title: string; description: string; requiredSkills: number[] }[] = [
      {
        id: 1,
        title: 'Full-Stack Developer',
        description: 'Develops both client and server software. Your skills are perfectly aligned with modern full-stack development requirements.',
        requiredSkills: [1, 2, 3, 4, 21, 22, 27, 30]
      },
      {
        id: 2,
        title: 'Frontend Developer',
        description: 'Specializes in building user interfaces and client-side applications. Your skills make you an excellent candidate for modern frontend roles.',
        requiredSkills: [1, 3, 4, 28, 29, 30]
      },
      {
        id: 3,
        title: 'Backend Developer',
        description: 'Focuses on server-side logic, database interactions, and API development. Your expertise is particularly valuable in this role.',
        requiredSkills: [2, 3, 4, 20, 21, 22, 27]
      },
      {
        id: 4,
        title: 'DevOps Engineer',
        description: 'Combines software development and IT operations to shorten the development lifecycle. Your skills are essential for modern DevOps practices.',
        requiredSkills: [14, 15, 16, 17, 18, 19, 31, 32]
      },
      {
        id: 5,
        title: 'Data Scientist',
        description: 'Extracts knowledge and insights from structured and unstructured data. Your skills are in high demand for data analysis and visualization.',
        requiredSkills: [5, 20, 33, 34, 35, 40, 59, 60]
      },
      {
        id: 6,
        title: 'Mobile App Developer',
        description: 'Creates applications for mobile devices. Your skills in mobile frameworks are perfectly suited for native and cross-platform development.',
        requiredSkills: [4, 11, 12, 19, 49, 50, 51]
      },
      {
        id: 7,
        title: 'Cloud Architect',
        description: 'Designs and implements cloud computing solutions. Your cloud platform expertise makes you valuable for organizations migrating to the cloud.',
        requiredSkills: [14, 15, 16, 17, 18, 32]
      },
      {
        id: 8,
        title: 'UI/UX Developer',
        description: 'Focuses on user interface design and user experience. Your frontend skills are essential for creating intuitive and engaging applications.',
        requiredSkills: [1, 4, 28, 29]
      },
      {
        id: 9,
        title: 'Machine Learning Engineer',
        description: 'Designs and implements machine learning systems. Your skills in AI technologies are crucial for organizations leveraging data for predictions.',
        requiredSkills: [5, 33, 34, 35, 59, 60]
      },
      {
        id: 10,
        title: 'API Developer',
        description: 'Specializes in creating application programming interfaces. Your backend skills are perfect for designing and implementing robust APIs.',
        requiredSkills: [2, 5, 20, 22, 27]
      },
      {
        id: 11,
        title: 'Game Developer',
        description: 'Creates video games for various platforms. Your expertise in game development technologies is highly sought after in the gaming industry.',
        requiredSkills: [4, 36, 37, 52, 53]
      },
      {
        id: 12,
        title: 'Embedded Systems Engineer',
        description: 'Develops software for embedded systems and IoT devices. Your low-level programming skills are valuable for creating efficient device firmware.',
        requiredSkills: [36, 37, 45]
      },
      {
        id: 13,
        title: 'QA Automation Engineer',
        description: 'Creates and maintains automated testing frameworks. Your testing expertise ensures software quality and reliability.',
        requiredSkills: [5, 54, 55, 56, 57, 58]
      },
      {
        id: 14,
        title: 'Blockchain Developer',
        description: 'Develops applications using blockchain technology. Your specialized skills are in high demand for decentralized applications.',
        requiredSkills: [4, 13, 38]
      },
      {
        id: 15,
        title: 'Systems Programmer',
        description: 'Works on core systems software, drivers, and operating systems. Your low-level programming expertise is crucial for system performance.',
        requiredSkills: [36, 37, 45, 47]
      },
      {
        id: 16,
        title: 'Quantum Computing Developer',
        description: 'Specializes in quantum algorithms and computing. This cutting-edge field requires your specialized knowledge in quantum programming.',
        requiredSkills: [5, 40, 41]
      },
      {
        id: 17,
        title: 'Big Data Engineer',
        description: 'Develops systems to process and analyze large volumes of data. Your expertise in big data technologies is essential for data-driven organizations.',
        requiredSkills: [5, 6, 10, 20, 21, 33]
      },
      {
        id: 18,
        title: 'Security Engineer',
        description: 'Focuses on protecting systems and data from threats. Your cybersecurity skills are critical for maintaining secure applications and infrastructure.',
        requiredSkills: [5, 14, 15, 16, 36]
      }
    ];
    
    for (const role of jobRolesData) {
      this.jobRoles.set(role.id, role);
    }
  }
}

export const storage = new MemStorage();
