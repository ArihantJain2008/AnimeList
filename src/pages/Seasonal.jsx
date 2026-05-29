import {
  useState,
  useEffect,
} from "react";

import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import AnimeCard from "../components/anime/AnimeCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/ui/SectionTitle";
import { getSeasonalAnime } from "../api/anilist";

const SEASON_OPTIONS = [
  {
    value: "WINTER",
    label: "Winter",
  },
  {
    value: "SPRING",
    label: "Spring",
  },
  {
    value: "SUMMER",
    label: "Summer",
  },
  {
    value: "FALL",
    label: "Fall",
  },
];

const GENRE_OPTIONS = [
  "",
  "Action",
  "Adventure",
  "Fantasy",
  "Romance",
  "Comedy",
  "Sports",
];

function Seasonal() {
  const [season, setSeason] =
    useState("SUMMER");
  const [animeList, setAnimeList] =
    useState([]);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnime() {
      try {
        setLoading(true);
        setError("");
        const data =
          await getSeasonalAnime(
            season,
            2025,
            genre
          );
        setAnimeList(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Failed to load seasonal anime:",
          err
        );
        setError(
          "Could not load seasonal anime."
        );
        setAnimeList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [season, genre]);

  const filteredAnime =
    genre === ""
      ? animeList
      : animeList.filter((anime) =>
          anime.genres?.includes(genre)
        );

  return (
    <>
      <Navbar />

      <main className="pb-16 pt-8">
        <PageContainer>
          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-[var(--shadow)] dark:border-slate-700/70 dark:bg-slate-900/75">
            <SectionTitle
              title="Seasonal Anime"
              subtitle="Filter by season and genre to discover what's trending in this cycle."
            />

            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Season
                </p>
                <div
                  role="tablist"
                  aria-label="Season filter"
                  className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-300/80 bg-slate-100/75 p-1.5 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  {SEASON_OPTIONS.map(
                    (option) => {
                      const isActive =
                        season ===
                        option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="tab"
                          aria-selected={
                            isActive
                          }
                          onClick={() =>
                            setSeason(
                              option.value
                            )
                          }
                          className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                            isActive
                              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                              : "text-slate-700 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Genre
                </p>

                <div className="flex flex-wrap gap-2">
                  {GENRE_OPTIONS.map(
                    (genreValue) => {
                      const isActive =
                        genre ===
                        genreValue;
                      const label =
                        genreValue === ""
                          ? "All Genres"
                          : genreValue;

                      return (
                        <button
                          key={
                            genreValue || "all"
                          }
                          type="button"
                          onClick={() =>
                            setGenre(
                              genreValue
                            )
                          }
                          aria-pressed={
                            isActive
                          }
                          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                            isActive
                              ? "border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                              : "border-slate-300/80 bg-white/80 text-slate-700 hover:border-indigo-300 hover:text-indigo-500 dark:border-slate-700 dark:bg-slate-900/65 dark:text-slate-300 dark:hover:border-indigo-400/60 dark:hover:text-indigo-300"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {genre
                  ? `${genre} titles in ${season.toLowerCase()}`
                  : `All genres in ${season.toLowerCase()}`}
              </p>

              <p className="rounded-full border border-slate-300/75 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Showing{" "}
                {filteredAnime.length} anime
              </p>
            </div>

            {loading && (
              <Loader message="Loading seasonal anime..." />
            )}

            {!loading && error && (
              <ErrorMessage message={error} />
            )}

            {!loading &&
              !error &&
              filteredAnime.length === 0 && (
                <ErrorMessage message="No anime found for this filter combination." />
              )}

            {!loading &&
              !error &&
              filteredAnime.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {filteredAnime.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                    />
                  ))}
                </div>
              )}
          </section>
        </PageContainer>
      </main>
    </>
  );
}

export default Seasonal;
