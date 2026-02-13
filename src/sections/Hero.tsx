import { Mic, Sparkles, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  isAvailable: boolean;
}

export function Hero({ isAvailable }: HeroProps) {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Microphone Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-coral flex items-center justify-center animate-pulse-glow">
              <Mic size={40} className="text-white" />
            </div>
            <Sparkles
              size={24}
              className="absolute -top-2 -right-2 text-yellow animate-twinkle"
              fill="#FFE4A1"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4">
          <span className="text-gradient">YanbieVA</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-foreground/80 font-medium mb-3">
          Putting heart and voice to every role!
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground mb-8">
          Voice Actress | NJ Based | Home Studio
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            onClick={() => scrollToSection('voice-acting')}
            className="bg-gradient-coral hover:opacity-90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-coral hover:shadow-coral-lg transition-all"
          >
            <Sparkles size={18} className="mr-2" />
            Explore My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="border-2 border-coral text-coral hover:bg-coral hover:text-white rounded-full px-8 py-6 text-base font-semibold transition-all"
          >
            <Mail size={18} className="mr-2" />
            Contact Me
          </Button>
        </div>

        {/* Availability Badge */}
        {isAvailable && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/30 text-green-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open for Work
          </div>
        )}
      </div>
    </section>
  );
}
