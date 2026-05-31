import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Maximize2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { projects } from '@/data/projects';
import { useInView } from '@/lib/use-in-view';

function ProjectCover({ project, onExpand }) {
  const imgs = project.images || [];
  const has = imgs.length > 0;

  if (!has) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border border-border bg-gradient-to-br from-secondary/60 via-muted/40 to-background">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
          <ImageOff className="h-6 w-6" />
          <span className="text-[10px] uppercase tracking-widest">{project.tags[0]}</span>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onExpand(0)}
      className="group relative aspect-video w-full overflow-hidden rounded-md border border-border bg-muted text-left"
      aria-label={`Expand ${project.title} screenshots`}
    >
      <Image
        src={imgs[0]}
        alt={`${project.title} screenshot`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute bottom-3 right-3 flex translate-y-1 items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <Maximize2 className="h-3 w-3" />
        {imgs.length > 1 ? `${imgs.length} screenshots` : 'View full size'}
      </span>
    </button>
  );
}

function ProjectLinks({ project }) {
  const hasLinks = project.repoUrl || project.liveUrl;
  if (!hasLinks) return null;
  return (
    <CardFooter className="gap-1 border-t border-border pt-4">
      {project.repoUrl && (
        <Button asChild variant="ghost" size="sm">
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" /> Code
          </a>
        </Button>
      )}
      {project.liveUrl && (
        <Button asChild variant="ghost" size="sm">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" /> Live
          </a>
        </Button>
      )}
    </CardFooter>
  );
}

function ProjectCard({ project, index, onExpand }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-foreground/30">
        <CardHeader className="space-y-3">
          <ProjectCover project={project} onExpand={(i) => onExpand(project, i)} />
          <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
            <span>{project.role}</span>
            <span className="text-muted-foreground/40">•</span>
            <span>{project.dates}</span>
          </div>
          <CardDescription className="text-sm leading-relaxed">{project.summary}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((t) => (
              <Badge key={t} variant="outline" className="font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>

        <ProjectLinks project={project} />
      </Card>
    </div>
  );
}

function Lightbox({ project, startIndex, onClose }) {
  const [i, setI] = useState(startIndex || 0);
  const imgs = project?.images || [];

  useEffect(() => {
    setI(startIndex || 0);
  }, [project, startIndex]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setI((p) => (p + 1) % imgs.length);
      if (e.key === 'ArrowLeft') setI((p) => (p - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, imgs.length]);

  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-0 bg-transparent shadow-none p-0">
        <DialogTitle className="sr-only">{project.title} screenshots</DialogTitle>
        <div className="relative flex h-[90vh] w-full items-center justify-center">
          {imgs.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`${project.title} screenshot ${idx + 1}`}
              fill
              sizes="100vw"
              className={`object-contain transition-opacity duration-300 ${
                idx === i ? 'opacity-100' : 'opacity-0'
              }`}
              priority={idx === startIndex}
            />
          ))}

          {imgs.length > 1 && (
            <>
              <button
                onClick={() => setI((p) => (p - 1 + imgs.length) % imgs.length)}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-3 backdrop-blur transition-colors hover:bg-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setI((p) => (p + 1) % imgs.length)}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-3 backdrop-blur transition-colors hover:bg-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur">
            <span className="text-xs font-medium text-foreground">{project.title}</span>
            {imgs.length > 1 && (
              <span className="text-xs text-muted-foreground">
                {i + 1} / {imgs.length}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState({ project: null, index: 0 });

  return (
    <section id="projects" className="container py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Projects
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          What I&apos;ve built
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Click any screenshot to view it full-size.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            onExpand={(project, idx) => setLightbox({ project, index: idx })}
          />
        ))}
      </div>

      <Lightbox
        project={lightbox.project}
        startIndex={lightbox.index}
        onClose={() => setLightbox({ project: null, index: 0 })}
      />
    </section>
  );
}
