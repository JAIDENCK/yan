import { Briefcase, Check } from 'lucide-react';

interface SettingsTabProps {
  isAvailable: boolean;
  onAvailabilityChange: (available: boolean) => void;
}

export function SettingsTab({
  isAvailable,
  onAvailabilityChange,
}: SettingsTabProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Website Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your portfolio settings
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-coral/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
            <Briefcase size={24} className="text-coral" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Availability Status
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Toggle whether you're currently open for new work. This will be
              displayed on your website.
            </p>

            <div className="flex items-center gap-4">
              <div
                className={`flex-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isAvailable
                    ? 'border-coral bg-coral/5'
                    : 'border-transparent bg-coral/5 opacity-50'
                }`}
                onClick={() => onAvailabilityChange(true)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isAvailable ? 'border-coral' : 'border-muted-foreground'
                    }`}
                  >
                    {isAvailable && (
                      <div className="w-3 h-3 rounded-full bg-coral" />
                    )}
                  </div>
                  <span className="font-medium">Open for Work</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Show "Open for Work" badge on your website
                </p>
              </div>

              <div
                className={`flex-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  !isAvailable
                    ? 'border-coral bg-coral/5'
                    : 'border-transparent bg-coral/5 opacity-50'
                }`}
                onClick={() => onAvailabilityChange(false)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      !isAvailable ? 'border-coral' : 'border-muted-foreground'
                    }`}
                  >
                    {!isAvailable && (
                      <div className="w-3 h-3 rounded-full bg-coral" />
                    )}
                  </div>
                  <span className="font-medium">Not Available</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Hide availability badge from your website
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-coral/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Check size={16} className="text-coral" />
                <span className="text-sm font-medium">Current Status</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your availability is currently set to{' '}
                <span className="font-medium text-coral">
                  {isAvailable ? 'Open for Work' : 'Not Available'}
                </span>
                . This will be displayed on your website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
