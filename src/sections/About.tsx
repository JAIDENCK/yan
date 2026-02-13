import { Mic, Heart, Volume2, Home } from 'lucide-react';
import { equipment } from '@/data/content';

export function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-2">
            About
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Me
          </h2>
        </div>

        {/* Bio Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
            I'm{' '}
            <span className="font-bold text-coral">YanbieVA (Yan)</span>, an
            emerging voice actress based in NJ. From my home studio, I'm
            dedicated to putting heart and voice to every role. Whether it's a{' '}
            <span className="font-semibold text-coral">bubbly sidekick</span>{' '}
            or a{' '}
            <span className="font-semibold text-coral">
              villainous mastermind
            </span>
            , I love bringing characters to life!
          </p>
        </div>

        {/* Equipment & Setup */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-center mb-8">
            Equipment & Setup
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {equipment.map((item, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-coral/10 card-hover"
              >
                <p className="text-xs font-semibold text-coral uppercase tracking-wider mb-2">
                  {item.category}
                </p>
                {item.items.map((eq, i) => (
                  <p key={i} className="text-sm text-foreground/80">
                    {eq}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Mic, title: 'Professional', subtitle: 'Recording' },
            { icon: Heart, title: 'Heart in', subtitle: 'Every Role' },
            { icon: Volume2, title: 'Wide Range', subtitle: 'of Voices' },
            { icon: Home, title: 'Home Studio', subtitle: 'Ready' },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-coral/10 to-coral/5 rounded-2xl p-6 text-center card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center mx-auto mb-4">
                <feature.icon size={24} className="text-coral" />
              </div>
              <p className="font-bold text-foreground">{feature.title}</p>
              <p className="text-sm text-coral font-medium">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
