import { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const ADMIN_PASSWORD = 'yanbieva-admin';

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-coral transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Website
        </button>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-coral/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-coral" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Admin Access
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your password to continue
            </p>
            <p className="text-xs text-coral/70 mt-2">
              Default password: yanbieva-admin
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 bg-white/60 border-coral/20 focus:border-coral focus:ring-coral/20"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-coral transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-coral hover:opacity-90 text-white rounded-xl py-6 font-semibold shadow-coral hover:shadow-coral-lg transition-all"
            >
              Login
            </Button>
          </form>
        </div>

        {/* Logo */}
        <p className="text-center mt-8 text-coral font-bold text-lg">
          YanbieVA
        </p>
      </div>
    </div>
  );
}
