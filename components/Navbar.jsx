import { useState, useEffect } from 'react';
import { Menu, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';
import { profile } from '@/data/profile';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-widest text-foreground hover:text-primary transition-colors"
        >
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="sm" variant="outline">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <FileDown className="mr-1 h-4 w-4" /> Resume
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="mt-8 flex flex-col gap-1">
              {sections.map((s) => (
                <SheetClose asChild key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </SheetClose>
              ))}
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <Button asChild variant="outline" className="w-full">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <FileDown className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
