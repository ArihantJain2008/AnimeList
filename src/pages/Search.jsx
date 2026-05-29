import {
  useState,
  useEffect,
} from "react";
import useDebounce from "../hooks/useDebounce";

import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import AnimeCard from "../components/anime/AnimeCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/ui/SectionTitle";

import { searchAnime } from "../api/anilist";

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(
    query,
    500
  );
  const [results, setResults] =
    useState([]);
  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSearchResults() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await searchAnime(
          debouncedQuery
        );
        setResults(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Failed to search anime:",
          err
        );
        setError("Failed to search anime.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [debouncedQuery]);

  return (
    <>
      <Navbar />

      <main className="pb-16 pt-8">
        <PageContainer>
          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-[var(--shadow)] dark:border-slate-700/70 dark:bg-slate-900/75">
            <SectionTitle
              title="Search Anime"
              subtitle="Type any anime title and get fast AniList-powered results."
            />

            <div className="mt-5">
              <label
                htmlFor="anime-search"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                Anime title
              </label>

              <div className="relative">
                <input
                  id="anime-search"
                  type="text"
                  value={query}
                  placeholder="Try: Jujutsu Kaisen, One Piece, Vinland Saga..."
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-300/80 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-[var(--ring)] dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>
          </section>

          <section className="mt-8">
            {loading && (
              <Loader message="Searching titles..." />
            )}

            {!loading && error && (
              <ErrorMessage message={error} />
            )}

            {!loading &&
              !error &&
              query.trim() &&
              results.length === 0 && (
                <ErrorMessage message="No anime found for this search." />
              )}

            {!loading &&
              !error &&
              results.length > 0 && (
                <>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Showing results for{" "}
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {debouncedQuery}
                      </span>
                    </p>
                    <p className="rounded-full border border-slate-300/75 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {results.length} titles
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {results.map((anime) => (
                      <AnimeCard
                        key={anime.id}
                        anime={anime}
                      />
                    ))}
                  </div>
                </>
              )}
          </section>
        </PageContainer>
      </main>
    </>
  );
}

export default Search;
