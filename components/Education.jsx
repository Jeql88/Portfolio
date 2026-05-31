import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { education } from '@/data/education';

export default function Education() {
  return (
    <section id="education" className="container py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          Education
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Academic background
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        {education.map((e) => (
          <Card key={e.id}>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {e.school}
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
                  {e.gpa && <p className="mt-1 text-xs text-primary">{e.gpa}</p>}
                </div>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:flex-col sm:items-end sm:gap-x-0 sm:gap-y-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> {e.dates}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> {e.location}
                  </span>
                </div>
              </div>
            </CardHeader>
            {e.coursework && (
              <CardContent>
                <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                  Relevant coursework
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {e.coursework.map((c) => (
                    <Badge key={c} variant="secondary" className="font-normal">
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
