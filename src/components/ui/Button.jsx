function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const baseClass =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:bg-indigo-400",
    ghost:
      "border border-slate-300/70 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-200 dark:hover:bg-slate-800",
    subtle:
      "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/80",
  };

  return (
    <button
      type={type}
      className={`${baseClass} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
