import type { VoiceDemo } from '@/types';
import { characterArchetypes } from '@/data/content';
import { Play, Pause, Music, User, Frown, Zap } from 'lucide-react';
import { useState, useRef } from 'react';

interface VoiceActingProps {
  demos: VoiceDemo[];
}

export function VoiceActing({ demos }: VoiceActingProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (demo: VoiceDemo) => {
    if (playingId === demo.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(`/audio/${demo.filename}`);
      audioRef.current.play().catch(() => {
        // If file doesn't exist, ignore
      });
      audioRef.current.onended = () => setPlayingId(null);
      setPlayingId(demo.id);
    }
  };

  const getArchetypeIcon = (name: string) => {
    if (name.includes('Villain')) return <Frown size={16} />;
    if (name.includes('Bubbly')) return <Zap size={16} />;
    if (name.includes('Mean')) return <User size={16} />;
    return <Music size={16} />;
  };

  return (
    <section id="voice-acting" className="relative py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-2">
            Voice
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Acting
          </h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            High to Med-Low Range | Wide Range of Emotions + Character Archetypes
          </p>
        </div>

        {/* Character Archetypes */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {characterArchetypes.map((archetype, index) => (
            <div
              key={index}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${archetype.color}`}
            >
              {getArchetypeIcon(archetype.name)}
              {archetype.name}
            </div>
          ))}
        </div>

        {/* Voice Demos */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-6">
            Voice Demos
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Listen to my latest voice acting samples
          </p>

          {demos.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-2xl border border-dashed border-coral/30">
              <Music size={48} className="mx-auto text-coral/40 mb-4" />
              <p className="text-foreground/60 font-medium">No demos yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Voice demos will appear here once uploaded through the admin panel.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {demos.map((demo) => (
                <div
                  key={demo.id}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-coral/10 card-hover flex items-center gap-4"
                >
                  <button
                    onClick={() => togglePlay(demo)}
                    className="w-12 h-12 rounded-full bg-gradient-coral flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    {playingId === demo.id ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} className="ml-1" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{demo.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded {new Date(demo.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-xs text-coral/70 font-medium">
                    {playingId === demo.id ? 'Playing...' : 'Click to play'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
