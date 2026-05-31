import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';

const photos = [
  '/images/aboutme2.jpg',
  '/images/aboutme3.jpg',
  '/images/aboutme4.jpg',
  '/images/aboutme5.jpg',
  '/images/aboutme6.jpg',
  '/images/aboutme1.jpg',
  '/images/iris1.jpg',
];

const AUTO_MS = 4500;

export default function About() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  const go = (n) => setIndex((i) => (i + n + photos.length) % photos.length);

  const onPointerDown = (e) => {
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
  };
  const onPointerUp = (e) => {
    if (dragStart.current == null) return;
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStart.current;
    const delta = end - dragStart.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    dragStart.current = null;
  };

  return (
    <section id="about" className="container py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">A bit about me</h2>
      </div>

      <Card>
        <CardContent className="grid gap-10 p-6 md:grid-cols-[1fr_1fr] md:p-10">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            {profile.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div
            className="select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onMouseDown={onPointerDown}
            onMouseUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchEnd={onPointerUp}
          >
            <div className="group relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-border bg-muted">
              {photos.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${profile.name} — photo ${i + 1}`}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className={`object-cover transition-opacity duration-700 ease-out ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority={i === 0}
                  draggable={false}
                />
              ))}

              <Button
                size="icon"
                variant="secondary"
                className="absolute left-3 top-1/2 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-90 md:flex"
                onClick={() => go(-1)}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-3 top-1/2 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-90 md:flex"
                onClick={() => go(1)}
                aria-label="Next photo"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 flex justify-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? 'w-6 bg-foreground' : 'w-1.5 bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
