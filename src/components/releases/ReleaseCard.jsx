import { Link } from "react-router-dom";
import { formatReleaseTime } from "../../utils/dateHelpers";

const BADGE_STYLES = {
  AIRING_EPISODE:
    "border border-violet-300/80 bg-violet-100 text-violet-700 dark:border-violet-400/40 dark:bg-violet-500/15 dark:text-violet-300",
  NEW_SERIES:
    "border border-blue-300/80 bg-blue-100 text-blue-700 dark:border-blue-400/40 dark:bg-blue-500/15 dark:text-blue-300",
  SEASON_PREMIERE:
    "border border-amber-300/80 bg-amber-100 text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/15 dark:text-amber-300",
  COMING_SOON:
    "border border-cyan-300/80 bg-cyan-100 text-cyan-700 dark:border-cyan-400/40 dark:bg-cyan-500/15 dark:text-cyan-300",
};

const BADGE_LABELS = {
  AIRING_EPISODE: "AIRING EPISODE",
  NEW_SERIES: "NEW SERIES",
  SEASON_PREMIERE: "SEASON PREMIERE",
  COMING_SOON: "COMING SOON",
};

function isSeasonTitleHint(title) {
  return /(?:\bseason\b|\bpart\b|\bcour\b|\bii\b|\biii\b|\biv\b|\bv\b|\b2nd\b|\b3rd\b|\b4th\b|\b5th\b)/i.test(
    title || ""
  );
}

function getBadgeType(release) {
  const mediaStatus = release?.media?.status;
  const episode = Number(release?.episode);
  const title = release?.media?.title?.romaji;

  if (mediaStatus === "NOT_YET_RELEASED") {
    return "COMING_SOON";
  }

  if (episode === 1 && isSeasonTitleHint(title)) {
    return "SEASON_PREMIERE";
  }

  if (episode === 1) {
    return "NEW_SERIES";
  }

  return "AIRING_EPISODE";
}

function ReleaseCard({ release }) {
  const anime = release?.media || {};
  const badgeType = getBadgeType(release);

  const title =
    anime?.title?.romaji || "Untitled Anime";
  const poster = anime?.coverImage?.large;
  const episodeText = Number.isFinite(
    Number(release?.episode)
  )
    ? `Episode ${release.episode}`
    : "Episode TBA";
  const timeText = formatReleaseTime(
    release?.airingAt
  );

  return (
    <Link
      to={`/anime/${anime?.id}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <article className="flex h-full overflow-hidden rounded-2xl border border-slate-200/75 bg-white/90 shadow-[0_14px_38px_rgba(15,23,42,0.12)] backdrop-blur-xl transition duration-300 will-change-transform group-hover:-translate-y-1 group-hover:shadow-[0_22px_45px_rgba(79,70,229,0.22)] group-focus-visible:-translate-y-1 dark:border-slate-700/70 dark:bg-slate-900/70 dark:shadow-[0_15px_36px_rgba(2,6,23,0.55)]">
        <div className="relative aspect-[2/3] w-28 shrink-0 overflow-hidden bg-slate-200 dark:bg-slate-800">
          {poster ? (
            <img
              src={poster}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-500 dark:text-slate-100 dark:group-hover:text-indigo-300 sm:text-base">
              {title}
            </h3>

            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${BADGE_STYLES[badgeType]}`}
            >
              {BADGE_LABELS[badgeType]}
            </span>
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
            {episodeText}
          </p>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {timeText}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ReleaseCard;
