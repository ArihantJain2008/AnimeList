function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/70 bg-white/85 shadow-[var(--shadow)] backdrop-blur-xl dark:border-slate-700/65 dark:bg-slate-900/75 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
