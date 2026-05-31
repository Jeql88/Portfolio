import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { profile } from '@/data/profile';

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="rounded-md border border-border bg-secondary/40 p-2">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="truncate text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
        className="block rounded-md p-2 -mx-2 transition-colors hover:bg-accent"
      >
        {content}
      </a>
    );
  }
  return <div className="p-2 -mx-2">{content}</div>;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [company, setCompany] = useState('');
  const [sending, setSending] = useState(false);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          company,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || 'Could not send the message. Please try again.');
      } else {
        toast.success("Message sent — I'll get back to you soon.");
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="container py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Contact
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Let&apos;s get in touch
        </h2>
        <p className="mt-3 text-muted-foreground">
          Have a project, internship, or just want to say hi? Drop a message.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardContent className="space-y-1 p-6">
            <ContactRow
              icon={Mail}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactRow
              icon={Phone}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
            />
            <ContactRow icon={MapPin} label="Location" value={profile.location} />
            <ContactRow
              icon={Github}
              label="GitHub"
              value={profile.github.replace('https://', '')}
              href={profile.github}
            />
            <ContactRow
              icon={Linkedin}
              label="LinkedIn"
              value="linkedin.com/in/josh-edward-lui"
              href={profile.linkedin}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
              >
                <label htmlFor="company">Company (leave blank)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me a bit about what you're working on..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={sending}>
                <Send className="h-4 w-4" />
                {sending ? 'Sending…' : 'Send message'}
              </Button>
              <p className="text-xs text-muted-foreground">
                Sent securely via an API route — your message lands directly in my inbox.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
