import Image from 'next/image';
import { ArrowRight, FileDown, Github, Linkedin, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 hero-glow" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

      <div className="container flex min-h-[100svh] flex-col justify-center py-28 md:py-40">
        <div className="grid items-center gap-8 md:gap-12 md:grid-cols-[1fr_1fr]">
          <div className="order-2 flex flex-col gap-6 md:order-1">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to opportunities — interning at SKANLOG
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {profile.name}
            </h1>
            <p className="text-balance text-xl text-muted-foreground md:text-2xl">
              {profile.title} — {profile.tagline}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#projects">
                  View projects <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <FileDown className="h-4 w-4" /> Download resume
                </a>
              </Button>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <Button asChild variant="ghost" size="icon">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="group relative w-full max-w-[16rem] sm:max-w-xs md:max-w-md">
              <div className="absolute -inset-8 rounded-3xl bg-foreground/5 blur-3xl transition-all duration-500 group-hover:bg-foreground/10" />
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border ring-1 ring-border transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                <Image
                  src="/images/hero.jpg"
                  alt={profile.name}
                  fill
                  sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 16rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
