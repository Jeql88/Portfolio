import { useInView } from '@/lib/use-in-view';

const stats = [
  { value: '3', label: 'Production apps shipped' },
  { value: '80+', label: 'Workstations under management' },
  { value: '8', label: 'Certifications' },
];

function Stat({ value, label, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-2 py-4 transition-all duration-700 ease-out md:px-6 md:py-2 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {value}
      </span>
      <span className="text-center text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto grid max-w-4xl divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((s, i) => (
          <Stat key={s.label} value={s.value} label={s.label} index={i} />
        ))}
      </div>
    </section>
  );
}
