export interface Project {
  id: string;
  title: string;
  studio: string;
  role: string;
  status: 'UPCOMING' | 'IN PROGRESS' | 'COMPLETED';
}

export interface VoiceDemo {
  id: string;
  title: string;
  filename: string;
  uploadedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  deadline?: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  icon: string;
}

export interface Equipment {
  category: string;
  items: string[];
}
