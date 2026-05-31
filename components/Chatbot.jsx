import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { profile } from '@/data/profile';

const SUGGESTIONS = [
  "What's Josh's tech stack?",
  'Tell me about the Job Recruitment Platform',
  'What is he working on right now?',
];

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: `Hi! I'm ${profile.name.split(' ')[0]}'s portfolio assistant. Ask me about his projects, skills, or experience.`,
};

const MAX_CHARS = 500;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [messages, loading]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    if (content.length > MAX_CHARS) {
      toast.error(`Message too long (max ${MAX_CHARS} chars).`);
      return;
    }

    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.filter((m) => m.role !== 'assistant' || m !== INITIAL_MESSAGE),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Something went wrong.');
        setMessages(next);
      } else {
        setMessages([...next, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          aria-label="Open portfolio assistant"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[92vw] max-w-md flex-col p-0"
        hideCloseButton
      >
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="flex items-center gap-2 text-left">
            <Sparkles className="h-4 w-4 text-primary" />
            Ask about Josh
          </SheetTitle>
          <p className="text-xs text-muted-foreground">
            AI-generated answers — verify important details from the resume.
          </p>
        </SheetHeader>

        <ScrollArea ref={scrollRef} className="flex-1 px-4 py-4">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-secondary px-3 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground">Try asking:</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full rounded-md border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-primary/40 hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-border p-4"
        >
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Josh…"
              maxLength={MAX_CHARS}
              disabled={loading}
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 shrink-0"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            {input.length}/{MAX_CHARS}
          </p>
        </form>
      </SheetContent>
    </Sheet>
  );
}
