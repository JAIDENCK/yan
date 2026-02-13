import { Star, Heart, Mic } from 'lucide-react';

interface Decoration {
  id: number;
  type: 'star' | 'heart' | 'mic';
  x: string;
  y: string;
  size: number;
  rotation: number;
  animation: string;
  delay: string;
  opacity: number;
  color: string;
}

const decorations: Decoration[] = [
  { id: 1, type: 'star', x: '5%', y: '10%', size: 24, rotation: 15, animation: 'animate-float', delay: '0s', opacity: 0.6, color: '#FFE4A1' },
  { id: 2, type: 'heart', x: '8%', y: '25%', size: 20, rotation: -10, animation: 'animate-float-reverse', delay: '0.5s', opacity: 0.5, color: '#FFB8C9' },
  { id: 3, type: 'mic', x: '3%', y: '45%', size: 18, rotation: 5, animation: 'animate-float-slow', delay: '1s', opacity: 0.4, color: '#FFD4C7' },
  { id: 4, type: 'star', x: '12%', y: '60%', size: 28, rotation: -20, animation: 'animate-float', delay: '1.5s', opacity: 0.7, color: '#FFE4A1' },
  { id: 5, type: 'heart', x: '6%', y: '80%', size: 22, rotation: 10, animation: 'animate-float-reverse', delay: '2s', opacity: 0.5, color: '#FFB8C9' },
  { id: 6, type: 'star', x: '88%', y: '15%', size: 26, rotation: -15, animation: 'animate-float-reverse', delay: '0.3s', opacity: 0.6, color: '#FFE4A1' },
  { id: 7, type: 'heart', x: '92%', y: '35%', size: 20, rotation: 15, animation: 'animate-float', delay: '0.8s', opacity: 0.5, color: '#FFB8C9' },
  { id: 8, type: 'mic', x: '95%', y: '55%', size: 16, rotation: -5, animation: 'animate-float-slow', delay: '1.3s', opacity: 0.4, color: '#FFD4C7' },
  { id: 9, type: 'star', x: '85%', y: '75%', size: 24, rotation: 20, animation: 'animate-float-reverse', delay: '1.8s', opacity: 0.7, color: '#FFE4A1' },
  { id: 10, type: 'heart', x: '93%', y: '90%', size: 18, rotation: -10, animation: 'animate-float', delay: '2.3s', opacity: 0.5, color: '#FFB8C9' },
  { id: 11, type: 'star', x: '20%', y: '5%', size: 20, rotation: 10, animation: 'animate-twinkle', delay: '0s', opacity: 0.5, color: '#FFE4A1' },
  { id: 12, type: 'star', x: '75%', y: '8%', size: 22, rotation: -10, animation: 'animate-twinkle', delay: '1s', opacity: 0.5, color: '#FFE4A1' },
  { id: 13, type: 'mic', x: '15%', y: '95%', size: 14, rotation: 5, animation: 'animate-float-slow', delay: '2.5s', opacity: 0.3, color: '#FFD4C7' },
  { id: 14, type: 'mic', x: '80%', y: '95%', size: 16, rotation: -5, animation: 'animate-float', delay: '3s', opacity: 0.3, color: '#FFD4C7' },
];

export function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((dec) => (
        <div
          key={dec.id}
          className={`absolute ${dec.animation}`}
          style={{
            left: dec.x,
            top: dec.y,
            transform: `rotate(${dec.rotation}deg)`,
            animationDelay: dec.delay,
            opacity: dec.opacity,
          }}
        >
          {dec.type === 'star' && (
            <Star
              size={dec.size}
              fill={dec.color}
              stroke={dec.color}
              strokeWidth={1}
            />
          )}
          {dec.type === 'heart' && (
            <Heart
              size={dec.size}
              fill={dec.color}
              stroke={dec.color}
              strokeWidth={1}
            />
          )}
          {dec.type === 'mic' && (
            <Mic
              size={dec.size}
              stroke={dec.color}
              strokeWidth={1.5}
            />
          )}
        </div>
      ))}
    </div>
  );
}
