import { Link } from "react-router-dom";

function AuthShell({
  badge,
  title,
  description,
  footerText,
  footerLinkLabel,
  footerTo,
  spotlightLabel,
  spotlightTitle,
  spotlightDescription,
  highlights,
  children,
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.24),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.22),transparent_24%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-[0_35px_120px_rgba(2,6,23,0.85)] backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <section className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent" />
              <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-indigo-500/15 blur-3xl" />

              <div className="relative">
                <Link to="/" className="inline-flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-sm font-black tracking-[0.26em] text-white shadow-[0_18px_45px_rgba(59,130,246,0.38)]">
                    AT
                  </span>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-200/80">
                      AniTrack
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      Anime tracking, refined for night mode.
                    </p>
                  </div>
                </Link>

                <div className="mt-10">
                  <span className="inline-flex items-center rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                    {badge}
                  </span>

                  <h1 className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {title}
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                    {description}
                  </p>
                </div>

                <div className="mt-8">{children}</div>

                <p className="mt-8 text-sm text-slate-400">
                  {footerText}{" "}
                  <Link
                    to={footerTo}
                    className="font-semibold text-indigo-300 transition hover:text-indigo-200"
                  >
                    {footerLinkLabel}
                  </Link>
                </p>
              </div>
            </section>

            <aside className="relative hidden overflow-hidden border-t border-white/10 bg-[linear-gradient(160deg,rgba(79,70,229,0.16),rgba(15,23,42,0.65),rgba(37,99,235,0.16))] lg:flex lg:flex-col lg:justify-between lg:border-l lg:border-t-0 lg:p-10">
              <div className="absolute -right-16 top-12 h-56 w-56 rounded-full bg-blue-400/18 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-500/18 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200/85">
                  {spotlightLabel}
                </p>

                <h2 className="mt-5 text-4xl font-black leading-tight text-white">
                  {spotlightTitle}
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-200/85">
                  {spotlightDescription}
                </p>
              </div>

              <div className="relative mt-10 grid gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur-md"
                  >
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuthShell;
