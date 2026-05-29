function Loader({
  message = "Loading anime...",
  className = "",
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3 text-sm text-slate-700 shadow-[var(--shadow)] dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200 ${className}`}
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500 dark:border-slate-600 dark:border-t-indigo-300" />
      <span>{message}</span>
    </div>
  );
}

export default Loader;
