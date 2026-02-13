import { useState } from 'react';
import { Mail, User, Calendar, DollarSign, Clock, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ContactMessage } from '@/types';

interface MessagesTabProps {
  messages: ContactMessage[];
  onMessagesChange: (messages: ContactMessage[]) => void;
}

export function MessagesTab({ messages, onMessagesChange }: MessagesTabProps) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );

  const handleMarkAsRead = (id: string) => {
    const updatedMessages = messages.map((m) =>
      m.id === id ? { ...m, read: true } : m
    );
    onMessagesChange(updatedMessages);
  };

  const handleDelete = (id: string) => {
    onMessagesChange(messages.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleOpenMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Contact Submissions
          </h2>
          <p className="text-sm text-muted-foreground">
            {unreadCount} unread / {messages.length} total
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => handleOpenMessage(message)}
            className={`bg-white/70 backdrop-blur-sm rounded-2xl p-4 border cursor-pointer transition-all hover:shadow-soft ${
              message.read
                ? 'border-coral/10'
                : 'border-coral/30 bg-coral/5'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.read ? 'bg-coral/10' : 'bg-coral/20'
                }`}
              >
                <Mail
                  size={18}
                  className={message.read ? 'text-coral/60' : 'text-coral'}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {message.name}
                  </h3>
                  {!message.read && (
                    <span className="px-2 py-0.5 bg-coral text-white text-xs rounded-full font-medium">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {message.projectType}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {message.message.substring(0, 80)}
                  {message.message.length > 80 ? '...' : ''}
                </p>
                <p className="text-xs text-coral/70 mt-2">
                  {new Date(message.submittedAt).toLocaleDateString()} at{' '}
                  {new Date(message.submittedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12 bg-white/40 rounded-2xl border border-dashed border-coral/30">
          <Mail size={48} className="mx-auto text-coral/40 mb-4" />
          <p className="text-muted-foreground">No messages yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Contact submissions will appear here when someone fills out the
            contact form.
          </p>
        </div>
      )}

      {/* Message Detail Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                  <User size={18} className="text-coral" />
                </div>
                <div>
                  <p className="font-semibold">{selectedMessage.name}</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-sm text-coral hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-coral/5 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar size={14} />
                    <span className="text-xs">Project Type</span>
                  </div>
                  <p className="text-sm font-medium">
                    {selectedMessage.projectType}
                  </p>
                </div>

                {selectedMessage.budget && (
                  <div className="bg-coral/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign size={14} />
                      <span className="text-xs">Budget</span>
                    </div>
                    <p className="text-sm font-medium">
                      {selectedMessage.budget}
                    </p>
                  </div>
                )}

                {selectedMessage.deadline && (
                  <div className="bg-coral/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock size={14} />
                      <span className="text-xs">Deadline</span>
                    </div>
                    <p className="text-sm font-medium">
                      {new Date(selectedMessage.deadline).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="bg-coral/5 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar size={14} />
                    <span className="text-xs">Received</span>
                  </div>
                  <p className="text-sm font-medium">
                    {new Date(selectedMessage.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Message</p>
                <div className="bg-coral/5 rounded-xl p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1"
                >
                  <X size={16} className="mr-2" />
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="flex-1"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
