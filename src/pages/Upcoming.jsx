import {
  useEffect,
  useState,
} from "react";
import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import AnimeCard from "../components/anime/AnimeCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/ui/SectionTitle";
import { getUpcomingAnime } from "../api/anilist";

function Upcoming() {
  const [animeList, setAnimeList] =
    useState([]);
  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUpcomingAnime() {
      try {
        setIsLoading(true);
        setError("");
        const data =
          await getUpcomingAnime();
        setAnimeList(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Failed to load upcoming anime:",
          err
        );
        setError(
          "Unable to load upcoming anime right now."
        );
        setAnimeList([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUpcomingAnime();
  }, []);

  return (
    <>
      <Navbar />

      <main className="pb-16 pt-8">
        <PageContainer>
          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-[var(--shadow)] dark:border-slate-700/70 dark:bg-slate-900/75">
            <SectionTitle
              title="Upcoming Anime"
              subtitle="Future and not-yet-released titles from AniList."
            />
          </section>

          <section className="mt-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Releases worth tracking
              </p>
              <p className="rounded-full border border-slate-300/75 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {animeList.length} titles
              </p>
            </div>

            {isLoading && (
              <Loader message="Loading upcoming anime..." />
            )}

            {!isLoading && error && (
              <ErrorMessage message={error} />
            )}

            {!isLoading &&
              !error &&
              animeList.length === 0 && (
                <ErrorMessage message="No upcoming anime found." />
              )}

            {!isLoading &&
              !error &&
              animeList.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {animeList.map((anime) => (
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

export default Upcoming;
