import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

function AnimeCard({ anime }) {
  const title =
    anime?.title?.romaji ||
    anime?.title?.english ||
    "Untitled Anime";

  const coverImage =
    anime?.coverImage?.large ||
    anime?.coverImage?.medium;

  const genres = Array.isArray(anime?.genres)
    ? anime.genres.slice(0, 2)
    : [];

  const score =
    anime?.averageScore ?? anime?.meanScore;

  return (
    <Link
      to={`/anime/${anime.id}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/75 bg-white/90 shadow-[0_14px_38px_rgba(15,23,42,0.12)] transition duration-300 will-change-transform group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:shadow-[0_20px_45px_rgba(79,70,229,0.22)] group-focus-visible:-translate-y-1 group-focus-visible:shadow-[0_20px_45px_rgba(79,70,229,0.22)] dark:border-slate-700/70 dark:bg-slate-900/70 dark:shadow-[0_15px_36px_rgba(2,6,23,0.55)]">
        <div className="relative aspect-[2/3] overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.07]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-200 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              No image
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-65 transition-opacity duration-300 group-hover:opacity-85" />

          {score ? (
            <Badge
              variant="score"
              className="absolute right-3 top-3 border-0 bg-emerald-500/90 text-white dark:bg-emerald-500"
            >
              {score}%
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-500 dark:text-slate-100 dark:group-hover:text-indigo-300 sm:text-base">
            {title}
          </h3>

          <div className="mt-auto flex flex-wrap gap-2">
            {genres.length > 0 ? (
              genres.map((genre) => (
                <Badge
                  key={`${anime.id}-${genre}`}
                  variant="default"
                >
                  {genre}
                </Badge>
              ))
            ) : (
              <Badge variant="muted">
                Genre N/A
              </Badge>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default AnimeCard;
