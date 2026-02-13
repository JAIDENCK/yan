import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { VoiceActing } from '@/sections/VoiceActing';
import { Credits } from '@/sections/Credits';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import type { Project, VoiceDemo, ContactMessage } from '@/types';
import { projects as initialProjects } from '@/data/content';

// Storage keys for localStorage
const STORAGE_KEYS = {
  projects: 'yanbieva-projects',
  demos: 'yanbieva-demos',
  messages: 'yanbieva-messages',
  availability: 'yanbieva-availability',
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // State for data
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [demos, setDemos] = useState<VoiceDemo[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEYS.projects);
    const savedDemos = localStorage.getItem(STORAGE_KEYS.demos);
    const savedMessages = localStorage.getItem(STORAGE_KEYS.messages);
    const savedAvailability = localStorage.getItem(STORAGE_KEYS.availability);

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    if (savedDemos) {
      setDemos(JSON.parse(savedDemos));
    }
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedAvailability !== null) {
      setIsAvailable(JSON.parse(savedAvailability));
    }
  }, []);

  // Save data to localStorage when changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.demos, JSON.stringify(demos));
  }, [demos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.availability, JSON.stringify(isAvailable));
  }, [isAvailable]);

  const handleAdminClick = () => {
    setShowAdminLogin(true);
  };

  const handleLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleBackToWebsite = () => {
    setShowAdminLogin(false);
  };

  const handleSubmitMessage = (
    message: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>
  ) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  // Render admin login
  if (showAdminLogin) {
    return <AdminLogin onLogin={handleLogin} onBack={handleBackToWebsite} />;
  }

  // Render admin dashboard
  if (isAdmin) {
    return (
      <AdminDashboard
        onLogout={handleLogout}
        projects={projects}
        demos={demos}
        messages={messages}
        isAvailable={isAvailable}
        onProjectsChange={setProjects}
        onDemosChange={setDemos}
        onMessagesChange={setMessages}
        onAvailabilityChange={setIsAvailable}
      />
    );
  }

  // Render main website
  return (
    <div className="relative min-h-screen bg-cream">
      <FloatingDecorations />
      <Navigation onAdminClick={handleAdminClick} />
      
      <main className="relative z-10">
        <Hero isAvailable={isAvailable} />
        <About />
        <VoiceActing demos={demos} />
        <Credits projectsList={projects} />
        <Contact
          isAvailable={isAvailable}
          onSubmitMessage={handleSubmitMessage}
        />
        <Footer />
      </main>
    </div>
  );
}

export default App;
