export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  workType: 'On-site' | 'Remote' | 'Hybrid';
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  companyLogo?: string;
  matchPercentage: number;
  liked?: boolean;
  applied?: boolean;
  skillsMatch?: string;
  experience?: string;
  level?: 'Entry Level' | 'Mid Level' | 'Senior Level';
  applicants?: number;
  country?: string;
  // Detailed job information
  qualifications?: {
    introduction?: string;
    skillTags?: string[];
    requiredSkills?: string[];
    preferredSkills?: string[];
  };
  responsibilities?: string[];
  benefits?: {
    introduction?: string;
    items?: Array<{
      icon: 'home' | 'chart' | 'utensils' | 'building' | 'heart' | 'cake' | 'brain' | 'globe';
      title: string;
      description: string;
    }>;
  };
  companyInfo?: {
    founded?: string;
    employeeCount?: string;
    website?: string;
    description?: string;
  };
}

export type JobType = Job['type'] | 'All';
