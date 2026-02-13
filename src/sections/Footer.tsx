import { Heart, Youtube, MessageCircle, Music } from 'lucide-react';
import { socialLinks } from '@/data/content';

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'youtube':
      return <Youtube size={20} />;
    case 'mic':
      return <Music size={20} />;
    case 'message-circle':
      return <MessageCircle size={20} />;
    case 'music':
      return <Music size={20} />;
    default:
      return null;
  }
};

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-coral/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <h3 className="text-2xl font-bold text-coral mb-2">YanbieVA</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Putting heart and voice to every role!
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral hover:bg-coral hover:text-white transition-all"
              >
                {getSocialIcon(link.icon)}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <p className="flex items-center gap-1 justify-center">
              © {new Date().getFullYear()} YanbieVA. All rights reserved. Made with{' '}
              <Heart size={14} className="text-coral fill-coral" /> using{' '}
              <a
                href="https://www.kimi.com/agent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:underline"
              >
                Kimi Agent
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
