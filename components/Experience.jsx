import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { experience } from '@/data/experience';
import { useInView } from '@/lib/use-in-view';

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <span className="absolute -left-[33px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-foreground bg-background md:-left-[37px]">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
      </span>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                {item.role}
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
            </div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:flex-col sm:items-end sm:gap-x-0 sm:gap-y-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" /> {item.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> {item.location}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <Badge key={t} variant="outline" className="font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="container py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Experience
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Where I&apos;ve worked & led
        </h2>
      </div>

      <div className="relative space-y-6 border-l border-border pl-6 md:pl-8">
        {experience.map((item, i) => (
          <TimelineItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
