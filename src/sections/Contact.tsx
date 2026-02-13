import { useState } from 'react';
import { Mail, Calendar, DollarSign, User, Send, Youtube, MessageCircle, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { socialLinks } from '@/data/content';
import type { ContactMessage } from '@/types';

interface ContactProps {
  isAvailable: boolean;
  onSubmitMessage: (message: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => void;
}

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
      return <User size={20} />;
  }
};

export function Contact({ isAvailable, onSubmitMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    deadline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    onSubmitMessage({
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      budget: formData.budget || undefined,
      deadline: formData.deadline || undefined,
      message: formData.message,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        deadline: '',
        message: '',
      });
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Let's Work
          </h2>
          <h2 className="text-4xl sm:text-5xl font-bold text-coral">
            Together!
          </h2>
          <p className="mt-4 text-foreground/70">
            Open for commissions and collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                  <Mail size={18} className="text-coral" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:yarnbieva@gmail.com"
                    className="font-medium text-foreground hover:text-coral transition-colors"
                  >
                    yarnbieva@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                  <Calendar size={18} className="text-coral" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className="font-medium text-foreground">
                    {isAvailable ? 'Open for Work' : 'Not Available'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Follow Me</p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-coral/10 hover:bg-coral/5 hover:border-coral/30 transition-all"
                  >
                    <span className="text-coral">{getSocialIcon(link.icon)}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {link.platform}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {link.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>

            {submitted ? (
              <div className="bg-mint/20 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-mint/40 flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  Message Sent!
                </h4>
                <p className="text-muted-foreground mb-4">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="border-coral text-coral hover:bg-coral hover:text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/60 border-coral/20 focus:border-coral focus:ring-coral/20"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/60 border-coral/20 focus:border-coral focus:ring-coral/20"
                  />
                </div>

                <div>
                  <Label htmlFor="projectType" className="text-sm font-medium">
                    Project Type (e.g., Animation, Game, Commercial)
                  </Label>
                  <Input
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/60 border-coral/20 focus:border-coral focus:ring-coral/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget" className="text-sm font-medium">
                      Budget (Optional)
                    </Label>
                    <div className="relative">
                      <DollarSign
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="mt-1 pl-9 bg-white/60 border-coral/20 focus:border-coral focus:ring-coral/20"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deadline" className="text-sm font-medium">
                      Deadline (Optional)
                    </Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="mt-1 bg-white/60 border-coral/20 focus:border-coral focus:ring-coral/20"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium">
                    Tell me about your project...
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 bg-white/60 border-coral/20 focus:border-coral focus:ring-coral/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-coral hover:opacity-90 text-white rounded-xl py-6 font-semibold shadow-coral hover:shadow-coral-lg transition-all"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
