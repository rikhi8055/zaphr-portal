export const Kpi: React.FC<{ label: string; value: string; delta?: string }> = ({ label, value, delta }) => (
  <div className="elevate-card p-4">
    <div className="text-sm text-black/60 dark:text-white/70">{label}</div>
    <div className="text-2xl font-semibold text-heading">{value}</div>
    {delta && <div className="text-xs mt-1">{delta}</div>}
  </div>
);
