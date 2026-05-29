function Badge({
  children,
  variant = "default",
  className = "",
}) {
  const variants = {
    default:
      "border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300",
    muted:
      "border border-slate-300/75 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
    score:
      "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/25 dark:bg-emerald-500/10 dark:text-emerald-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant] ?? variants.default} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
