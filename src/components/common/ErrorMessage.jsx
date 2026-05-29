function ErrorMessage({
  message,
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`rounded-2xl border border-rose-300/70 bg-rose-50/90 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200 ${className}`}
    >
      {message}
    </div>
  );
}

export default ErrorMessage;
