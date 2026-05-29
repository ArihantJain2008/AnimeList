function SectionTitle({
  title,
  subtitle,
  align = "left",
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
