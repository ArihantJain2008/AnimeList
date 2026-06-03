import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import { getAnimeDetails } from "../api/anilist";
import { sanitizeDescriptionToText } from "../utils/descriptionHelpers";
import useMyListApi from "../hooks/useMyListApi";

function AnimeDetails() {
  const { id } = useParams();
  const { addAnime } = useMyListApi();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnime() {
      try {
        setLoading(true);
        setError("");
        const data = await getAnimeDetails(id);
        setAnime(data || null);
      } catch (err) {
        console.error("Failed to fetch anime details:", err);
        setError("Could not load anime details.");
        setAnime(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [id]);

  const cleanDescription = anime?.description
    ? sanitizeDescriptionToText(anime.description)
    : "No description available.";

  return (
    <>
      <Navbar />

      <main className="pb-16 pt-8">
        <PageContainer>
          {loading && <Loader message="Loading anime details..." />}

          {!loading && error && <ErrorMessage message={error} />}

          {!loading && !error && anime && (
            <>
              <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 shadow-[var(--shadow)] dark:border-slate-700/70">
                {anime.bannerImage ? (
                  <img
                    src={anime.bannerImage}
                    alt={anime.title.romaji}
                    className="h-[34vh] w-full object-cover sm:h-[40vh] lg:h-[46vh]"
                  />
                ) : (
                  <div className="h-[34vh] w-full bg-gradient-to-r from-indigo-500 to-blue-500 sm:h-[40vh] lg:h-[46vh]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                    Anime Details
                  </p>
                  <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                    {anime.title.romaji}
                  </h1>
                  {anime.title.english &&
                    anime.title.english !== anime.title.romaji && (
                      <p className="mt-2 text-sm text-slate-200">
                        {anime.title.english}
                      </p>
                    )}
                </div>
              </section>

              <section className="mt-8 grid gap-6">
                {/* <Card className="overflow-hidden p-3">
                  <img
                    src={anime.coverImage.extraLarge}
                    alt={anime.title.romaji}
                    className="h-ful w-full rounded-xl object-cover"
                  />
                </Card> */}

                <div className="space-y-6">
                  <Card className="p-5 sm:p-6">
                    <SectionTitle
                      title="Overview"
                      subtitle="Core metadata pulled from AniList."
                    />

                    <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200/70 bg-slate-100/70 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Episodes
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                          {anime.episodes || "N/A"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200/70 bg-slate-100/70 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Score
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                          {anime.averageScore
                            ? `${anime.averageScore}%`
                            : "N/A"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200/70 bg-slate-100/70 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          Status
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                          {anime.status || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        Genres
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(anime.genres) &&
                        anime.genres.length > 0 ? (
                          anime.genres.map((genre) => (
                            <Badge key={genre} variant="default">
                              {genre}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="muted">No genres listed</Badge>
                        )}
                      </div>

                      <div className="mt-6">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                          Studio
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {anime?.studios?.nodes?.map((studio) => (
                            <Badge key={studio.id} variant="default">
                              {studio.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="mb-2 block text-sm font-medium">
                          Add To My List
                        </label>
                        <div className="relative inline-block min-w-[250px]">
                          <select
                            className="
                            appearance-none
                            rounded-lg
                            border
                          border-slate-600
                          bg-slate-800
                            px-4
                            py-2
                            pr-10
                          text-white
                          focus:border-indigo-500
                            focus:outline-none
                                              "
                            onChange={(e) => {
                              if (e.target.value) {
                                addAnime(anime, e.target.value);
                              }
                            }}
                          >
                            <option value="">Select Status</option>
                            <option value="Watching">Watching</option>
                            <option value="Completed">Completed</option>
                            <option value="Plan To Watch">Plan To Watch</option>
                            <option value="Dropped">Dropped</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Synopsis
                    </h3>
                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
                      {cleanDescription}
                    </p>
                  </Card>

                  <Card className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Characters & Voice Actors
                    </h3>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {anime?.characters?.edges?.map((character) => (
                        <div
                          key={character.node.id}
                          className="flex items-center gap-4 rounded-xl border border-slate-200/70 p-3 dark:border-slate-700"
                        >
                          <img
                            src={character.node.image.large}
                            alt={character.node.name.full}
                            className="h-16 w-16 rounded-lg object-cover"
                          />

                          <div className="min-w-0">
                            <h4 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                              {character.node.name.full}
                            </h4>

                            <p className="text-xs text-indigo-500">
                              {character.role}
                            </p>

                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              VA:{" "}
                              {character.voiceActors?.[0]?.name?.full ||
                                "Unknown"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Related Anime
                    </h3>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {anime?.relations?.edges
                        ?.slice(0, 12)
                        ?.map((relation) => (
                          <Link
                            key={relation.node.id}
                            to={`/anime/${relation.node.id}`}
                            className="overflow-hidden rounded-xl border border-slate-200/70 transition hover:scale-[1.02] hover:shadow-lg dark:border-slate-700"
                          >
                            <img
                              src={relation.node.coverImage.large}
                              alt={relation.node.title.romaji}
                              className="h-52 w-full object-cover"
                            />

                            <div className="p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                                {relation.relationType}
                              </p>

                              <h4 className="mt-2 line-clamp-2 font-semibold text-slate-900 dark:text-slate-100">
                                {relation.node.title.romaji}
                              </h4>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </Card>

                  <div className="rounded-xl border border-slate-200/70 bg-slate-100/70 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Studio
                    </p>

                    <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                      {anime?.studios?.nodes?.[0]?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </PageContainer>
      </main>
    </>
  );
}

export default AnimeDetails;
