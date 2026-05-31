import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { skillGroups } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="container py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Skills
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Tools I work with
        </h2>
      </div>

      <Card>
        <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:p-10 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
              {group.secondary && (
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">
                    {group.secondaryLabel}:
                  </span>
                  {group.secondary.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-normal text-muted-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
