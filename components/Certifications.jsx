import { Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { certifications } from '@/data/certifications';

export default function Certifications() {
  return (
    <section id="certifications" className="container py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Certifications
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Credentials & awards
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {certifications.map((c) => (
          <Card
            key={c.title}
            className="transition-colors hover:border-primary/40"
          >
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md border border-border bg-secondary/40 p-2">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight text-foreground">
                    {c.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
                </div>
              </div>
              <Badge variant="outline" className="self-start shrink-0 font-normal sm:self-auto">
                {c.date}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
