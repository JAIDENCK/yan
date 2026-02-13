import { useState } from 'react';
import { LogOut, Folder, Music, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project, VoiceDemo, ContactMessage } from '@/types';
import { ProjectsTab } from './ProjectsTab';
import { DemoReelTab } from './DemoReelTab';
import { MessagesTab } from './MessagesTab';
import { SettingsTab } from './SettingsTab';

type TabType = 'projects' | 'demos' | 'messages' | 'settings';

interface AdminDashboardProps {
  onLogout: () => void;
  projects: Project[];
  demos: VoiceDemo[];
  messages: ContactMessage[];
  isAvailable: boolean;
  onProjectsChange: (projects: Project[]) => void;
  onDemosChange: (demos: VoiceDemo[]) => void;
  onMessagesChange: (messages: ContactMessage[]) => void;
  onAvailabilityChange: (available: boolean) => void;
}

const tabs = [
  { id: 'projects' as TabType, label: 'Projects', icon: Folder },
  { id: 'demos' as TabType, label: 'Demo Reel', icon: Music },
  { id: 'messages' as TabType, label: 'Messages', icon: MessageSquare },
  { id: 'settings' as TabType, label: 'Settings', icon: Settings },
];

export function AdminDashboard({
  onLogout,
  projects,
  demos,
  messages,
  isAvailable,
  onProjectsChange,
  onDemosChange,
  onMessagesChange,
  onAvailabilityChange,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  const unreadCount = messages.filter((m) => !m.read).length;

  const renderTab = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <ProjectsTab
            projects={projects}
            onProjectsChange={onProjectsChange}
          />
        );
      case 'demos':
        return <DemoReelTab demos={demos} onDemosChange={onDemosChange} />;
      case 'messages':
        return (
          <MessagesTab
            messages={messages}
            onMessagesChange={onMessagesChange}
          />
        );
      case 'settings':
        return (
          <SettingsTab
            isAvailable={isAvailable}
            onAvailabilityChange={onAvailabilityChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-coral/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-coral">Admin Dashboard</h1>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-muted-foreground hover:text-coral hover:bg-coral/10"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-coral/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-coral text-white'
                    : 'text-foreground/70 hover:bg-coral/10 hover:text-coral'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {tab.id === 'messages' && unreadCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white text-coral text-xs rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTab()}
      </main>
    </div>
  );
}
