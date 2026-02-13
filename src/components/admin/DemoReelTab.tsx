import { useState, useRef, useCallback } from 'react';
import { Upload, Music, Trash2, Play, Pause, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { VoiceDemo } from '@/types';

interface DemoReelTabProps {
  demos: VoiceDemo[];
  onDemosChange: (demos: VoiceDemo[]) => void;
}

export function DemoReelTab({ demos, onDemosChange }: DemoReelTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [demoTitle, setDemoTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
        setSelectedFile(file);
        if (!demoTitle) {
          setDemoTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      }
    }
  }, [demoTitle]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!demoTitle) {
        setDemoTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !demoTitle.trim()) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    // Create form data for file upload
    const formData = new FormData();
    formData.append('audio', selectedFile);
    formData.append('title', demoTitle);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Send file to backend API
      const response = await fetch('/api/upload-audio', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (response.ok) {
        const result = await response.json();
        setUploadProgress(100);
        setUploadSuccess(true);
        
        // Add new demo to list
        const newDemo: VoiceDemo = {
          id: Date.now().toString(),
          title: demoTitle,
          filename: result.filename || selectedFile.name,
          uploadedAt: new Date().toISOString(),
        };
        onDemosChange([...demos, newDemo]);
        
        // Reset form after a delay
        setTimeout(() => {
          setDemoTitle('');
          setSelectedFile(null);
          setUploadProgress(0);
          setUploadSuccess(false);
        }, 1500);
      } else {
        console.error('Upload failed');
        // Fallback: add demo without server upload
        const newDemo: VoiceDemo = {
          id: Date.now().toString(),
          title: demoTitle,
          filename: selectedFile.name,
          uploadedAt: new Date().toISOString(),
        };
        onDemosChange([...demos, newDemo]);
        setDemoTitle('');
        setSelectedFile(null);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Fallback: add demo without server upload
      const newDemo: VoiceDemo = {
        id: Date.now().toString(),
        title: demoTitle,
        filename: selectedFile.name,
        uploadedAt: new Date().toISOString(),
      };
      onDemosChange([...demos, newDemo]);
      setDemoTitle('');
      setSelectedFile(null);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    const demo = demos.find((d) => d.id === id);
    if (demo && playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    }
    onDemosChange(demos.filter((d) => d.id !== id));
  };

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
        // If file doesn't exist, show alert
        alert('Audio file not found. Please ensure the server is running and the file was uploaded successfully.');
      });
      audioRef.current.onended = () => setPlayingId(null);
      setPlayingId(demo.id);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Voice Demos</h2>
          <p className="text-sm text-muted-foreground">
            {demos.length} demo{demos.length !== 1 ? 's' : ''} uploaded
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-coral/10 mb-8">
        <h3 className="font-semibold mb-4">Upload New Demo</h3>

        <div className="space-y-4">
          <div>
            <Label>Demo Title</Label>
            <Input
              value={demoTitle}
              onChange={(e) => setDemoTitle(e.target.value)}
              placeholder="Enter demo title (e.g., Character Demo Reel)"
              className="mt-1"
            />
          </div>

          {/* Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-coral bg-coral/5'
                : 'border-coral/30 hover:border-coral/50 hover:bg-coral/5'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload
              size={40}
              className="mx-auto mb-3 text-coral/60"
            />
            <p className="text-sm font-medium text-foreground mb-1">
              {selectedFile
                ? selectedFile.name
                : 'Drag & drop your audio file'}
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedFile
                ? formatFileSize(selectedFile.size)
                : 'or click to browse from your computer'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports MP3, WAV, OGG, M4A
            </p>
          </div>

          {/* Selected File Preview */}
          {selectedFile && (
            <div className="flex items-center gap-3 p-3 bg-coral/5 rounded-xl">
              <Music size={20} className="text-coral" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="p-1 rounded-lg hover:bg-coral/10 text-muted-foreground hover:text-coral"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="h-2 bg-coral/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-coral transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {uploadSuccess ? 'Upload complete!' : `Uploading... ${uploadProgress}%`}
              </p>
            </div>
          )}

          {/* Success Message */}
          {uploadSuccess && (
            <div className="flex items-center gap-2 p-3 bg-mint/20 rounded-xl text-green-700">
              <Check size={18} />
              <span className="text-sm font-medium">Demo uploaded successfully!</span>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !demoTitle.trim() || isUploading}
            className="w-full bg-gradient-coral hover:opacity-90 text-white"
          >
            {isUploading ? 'Uploading...' : 'Upload Demo'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-yellow/20 rounded-lg">
          <p className="text-xs text-foreground/70">
            <strong>How it works:</strong> When the server is running, audio files are uploaded to the{' '}
            <code className="bg-white/50 px-1 rounded">public/audio/</code>{' '}
            folder and will be available on the website immediately. If the server is not running, 
            the demo metadata will still be saved but you'll need to manually add the audio file to the folder.
          </p>
        </div>
      </div>

      {/* Demo List */}
      <div className="space-y-4">
        {demos.map((demo) => (
          <div
            key={demo.id}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-coral/10 flex items-center gap-4"
          >
            <button
              onClick={() => togglePlay(demo)}
              className="w-12 h-12 rounded-full bg-gradient-coral flex items-center justify-center text-white hover:opacity-90 transition-opacity flex-shrink-0"
            >
              {playingId === demo.id ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-1" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {demo.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Uploaded {new Date(demo.uploadedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(demo.id)}
              className="p-2 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {demos.length === 0 && (
        <div className="text-center py-12 bg-white/40 rounded-2xl border border-dashed border-coral/30">
          <Music size={48} className="mx-auto text-coral/40 mb-4" />
          <p className="text-muted-foreground">No demos yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload your first voice demo above
          </p>
        </div>
      )}
    </div>
  );
}
