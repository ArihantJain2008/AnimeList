import {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import AnimeCard from "../components/anime/AnimeCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";

import {
  getSeasonalAnime,
  getTrendingAnime,
  getUpcomingAnime,
} from "../api/anilist";

const FEATURE_ROTATION_MS = 6000;

function truncateText(text, maxLength = 200) {
  if (!text) {
    return "No synopsis available for this title yet.";
  }

  const normalized = text
    .replace(/\s+/g, " ")
    .trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trim()}...`;
}

function getCurrentSeason() {
  const month = new Date().getMonth();

  if (month <= 2) {
    return "WINTER";
  }

  if (month <= 5) {
    return "SPRING";
  }

  if (month <= 8) {
    return "SUMMER";
  }

  return "FALL";
}

function Home() {
  const [trendingAnime, setTrendingAnime] =
    useState([]);
  const [seasonalAnime, setSeasonalAnime] =
    useState([]);
  const [upcomingAnime, setUpcomingAnime] =
    useState([]);
  const [loadingTrending, setLoadingTrending] =
    useState(true);
  const [loadingSeasonal, setLoadingSeasonal] =
    useState(true);
  const [loadingUpcoming, setLoadingUpcoming] =
    useState(true);
  const [errorTrending, setErrorTrending] =
    useState("");
  const [errorSeasonal, setErrorSeasonal] =
    useState("");
  const [errorUpcoming, setErrorUpcoming] =
    useState("");
  const [featuredIndex, setFeaturedIndex] =
    useState(0);

  useEffect(() => {
    async function fetchHomeData() {
      const currentYear =
        new Date().getFullYear();
      const currentSeason =
        getCurrentSeason();

      setLoadingTrending(true);
      setLoadingSeasonal(true);
      setLoadingUpcoming(true);
      setErrorTrending("");
      setErrorSeasonal("");
      setErrorUpcoming("");

      const [
        trendingResult,
        seasonalResult,
        upcomingResult,
      ] = await Promise.allSettled([
        getTrendingAnime(),
        getSeasonalAnime(
          currentSeason,
          currentYear,
          ""
        ),
        getUpcomingAnime(),
      ]);

      if (trendingResult.status === "fulfilled") {
        setTrendingAnime(
          Array.isArray(
            trendingResult.value
          )
            ? trendingResult.value
            : []
        );
      } else {
        console.error(
          "Failed to load trending anime:",
          trendingResult.reason
        );
        setErrorTrending(
          "Failed to load trending anime."
        );
        setTrendingAnime([]);
      }

      if (seasonalResult.status === "fulfilled") {
        setSeasonalAnime(
          Array.isArray(
            seasonalResult.value
          )
            ? seasonalResult.value.slice(0, 5)
            : []
        );
      } else {
        console.error(
          "Failed to load seasonal anime:",
          seasonalResult.reason
        );
        setErrorSeasonal(
          "Failed to load seasonal anime."
        );
        setSeasonalAnime([]);
      }

      if (upcomingResult.status === "fulfilled") {
        setUpcomingAnime(
          Array.isArray(
            upcomingResult.value
          )
            ? upcomingResult.value.slice(0, 5)
            : []
        );
      } else {
        console.error(
          "Failed to load upcoming anime:",
          upcomingResult.reason
        );
        setErrorUpcoming(
          "Failed to load upcoming anime."
        );
        setUpcomingAnime([]);
      }

      setLoadingTrending(false);
      setLoadingSeasonal(false);
      setLoadingUpcoming(false);
    }

    fetchHomeData();
  }, []);

  const featuredAnimeList =
    trendingAnime.slice(0, 5);

  useEffect(() => {
    if (featuredAnimeList.length <= 1) {
      return undefined;
    }

    const rotationTimer = window.setInterval(
      () => {
        setFeaturedIndex((current) =>
          (current + 1) %
          featuredAnimeList.length
        );
      },
      FEATURE_ROTATION_MS
    );

    return () =>
      window.clearInterval(rotationTimer);
  }, [featuredAnimeList.length]);

  const featuredAnime =
    featuredAnimeList.length > 0
      ? featuredAnimeList[
          featuredIndex %
            featuredAnimeList.length
        ]
      : null;

  const featuredTitle =
    featuredAnime?.title?.romaji ||
    featuredAnime?.title?.english ||
    "Featured Anime";

  const featuredImage =
    featuredAnime?.bannerImage ||
    featuredAnime?.coverImage?.large ||
    featuredAnime?.coverImage?.medium;

  const featuredDescription = truncateText(
    featuredAnime?.description
  );

  return (
    <>
      <Navbar />

      <main className="pb-16">
        <section className="relative w-full overflow-hidden border-b border-slate-200/60 bg-slate-950 shadow-[var(--shadow)] dark:border-slate-800/70">
          {loadingTrending && (
            <PageContainer>
              <div className="py-10">
                <Loader message="Preparing featured anime..." />
              </div>
            </PageContainer>
          )}

          {!loadingTrending &&
            errorTrending && (
              <PageContainer>
                <div className="py-10">
                  <ErrorMessage
                    message={errorTrending}
                  />
                </div>
              </PageContainer>
            )}

          {!loadingTrending &&
            !errorTrending &&
            featuredAnime && (
              <article className="relative min-h-[60vh] sm:min-h-[68vh]">
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt={featuredTitle}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500" />
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/72 to-slate-950/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

                <PageContainer>
                  <div className="relative flex min-h-[60vh] items-end py-10 sm:min-h-[68vh] sm:py-14">
                    <div className="max-w-3xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-200">
                        Featured Showcase
                      </p>

                      <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                        {featuredTitle}
                      </h1>

                      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                        {featuredDescription}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {featuredAnime.averageScore ? (
                          <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-sm font-semibold text-white">
                            Score{" "}
                            {
                              featuredAnime.averageScore
                            }
                            %
                          </span>
                        ) : null}

                        <Link
                          to={`/anime/${featuredAnime.id}`}
                        >
                          <Button className="px-5 py-2.5 text-base">
                            Watch Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </PageContainer>

                {featuredAnimeList.length >
                  1 && (
                  <div className="absolute bottom-5 left-0 right-0">
                    <PageContainer>
                      <div className="flex items-center gap-2">
                        {featuredAnimeList.map(
                          (
                            anime,
                            index
                          ) => {
                            const isActive =
                              featuredAnime.id ===
                              anime.id;

                            return (
                              <button
                                key={anime.id}
                                type="button"
                                onClick={() =>
                                  setFeaturedIndex(
                                    index
                                  )
                                }
                                aria-label={`Show featured anime ${index + 1}`}
                                className={`h-2.5 rounded-full transition ${
                                  isActive
                                    ? "w-8 bg-indigo-500"
                                    : "w-2.5 bg-slate-300/80 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                                }`}
                              />
                            );
                          }
                        )}
                      </div>
                    </PageContainer>
                  </div>
                )}
              </article>
            )}
        </section>

        <PageContainer>
          <section className="mt-12">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <SectionTitle
                title="Trending Anime"
                subtitle="Hand-picked from AniList trending rankings."
              />
              <p className="rounded-full border border-slate-300/70 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {trendingAnime.length} titles
              </p>
            </div>

            {loadingTrending && (
              <Loader message="Fetching trending anime..." />
            )}

            {!loadingTrending &&
              errorTrending && (
                <ErrorMessage
                  message={errorTrending}
                />
              )}

            {!loadingTrending &&
              !errorTrending &&
              trendingAnime.length === 0 && (
                <ErrorMessage message="No trending anime found right now." />
              )}

            {!loadingTrending &&
              !errorTrending &&
              trendingAnime.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {trendingAnime.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                    />
                  ))}
                </div>
              )}
          </section>

          <section className="mt-14">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <SectionTitle
                title="Seasonal Anime"
                subtitle="A quick look at the current season lineup."
              />
              <Link to="/seasonal">
                <Button variant="ghost">
                  View Full Season
                </Button>
              </Link>
            </div>

            {loadingSeasonal && (
              <Loader message="Loading seasonal preview..." />
            )}

            {!loadingSeasonal &&
              errorSeasonal && (
                <ErrorMessage
                  message={errorSeasonal}
                />
              )}

            {!loadingSeasonal &&
              !errorSeasonal &&
              seasonalAnime.length === 0 && (
                <ErrorMessage message="No seasonal anime available right now." />
              )}

            {!loadingSeasonal &&
              !errorSeasonal &&
              seasonalAnime.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {seasonalAnime.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                    />
                  ))}
                </div>
              )}
          </section>

          <section className="mt-14">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <SectionTitle
                title="Upcoming Anime"
                subtitle="Upcoming releases you can track early."
              />
              <Link to="/upcoming">
                <Button variant="ghost">
                  View Upcoming
                </Button>
              </Link>
            </div>

            {loadingUpcoming && (
              <Loader message="Loading upcoming preview..." />
            )}

            {!loadingUpcoming &&
              errorUpcoming && (
                <ErrorMessage
                  message={errorUpcoming}
                />
              )}

            {!loadingUpcoming &&
              !errorUpcoming &&
              upcomingAnime.length === 0 && (
                <ErrorMessage message="No upcoming anime available right now." />
              )}

            {!loadingUpcoming &&
              !errorUpcoming &&
              upcomingAnime.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {upcomingAnime.map((anime) => (
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

export default Home;
