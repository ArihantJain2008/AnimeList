import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import useMyList from "../hooks/useMyList";
import { useState } from "react";

function MyList() {
  const {
    myList,
    updateProgress,
    updateRating,
    toggleFavorite,
  } = useMyList();

  const [filter, setFilter] =
    useState("All");

  const filteredAnime =
    filter === "All"
      ? myList
      : filter === "Favorites"
      ? myList.filter(
          (anime) => anime.favorite
        )
      : myList.filter(
          (anime) =>
            anime.status === filter
        );

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">
            My List
          </h1>

          <div className="mb-8 flex flex-wrap gap-3">
            {[
              "All",
              "Watching",
              "Completed",
              "Plan To Watch",
              "Dropped",
              "Favorites",
            ].map((status) => (
              <button
                key={status}
                onClick={() =>
                  setFilter(status)
                }
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  filter === status
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {filteredAnime.length === 0 ? (
            <p>No anime added yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAnime.map((anime) => (
                <div
                  key={anime.id}
                  className="rounded-2xl border border-slate-700 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        {anime.title}
                      </h3>

                      <p className="mt-1 text-sm text-indigo-400">
                        {anime.status}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        toggleFavorite(
                          anime.id
                        )
                      }
                      className="text-2xl transition hover:scale-110"
                    >
                      {anime.favorite
                        ? "❤️"
                        : "🤍"}
                    </button>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-slate-400">
                      Progress
                    </p>

                    <p className="font-semibold">
                      {anime.progress} /{" "}
                      {anime.totalEpisodes ||
                        "?"}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateProgress(
                          anime.id,
                          Math.max(
                            anime.progress -
                              1,
                            0
                          )
                        )
                      }
                      className="rounded-lg bg-slate-700 px-3 py-1"
                    >
                      -
                    </button>

                    <span>
                      {anime.progress}
                    </span>

                    <button
                      onClick={() =>
                        updateProgress(
                          anime.id,
                          anime.progress +
                            1
                        )
                      }
                      className="rounded-lg bg-indigo-600 px-3 py-1"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-slate-400">
                      Rating
                    </p>

                    <select
                      value={
                        anime.rating
                      }
                      onChange={(e) =>
                        updateRating(
                          anime.id,
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="mt-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2"
                    >
                      <option value={0}>
                        Not Rated
                      </option>

                      {[
                        1, 2, 3, 4, 5,
                        6, 7, 8, 9, 10,
                      ].map(
                        (rating) => (
                          <option
                            key={rating}
                            value={
                              rating
                            }
                          >
                            {rating}/10
                          </option>
                        )
                      )}
                    </select>

                    {anime.rating >
                      0 && (
                      <p className="mt-2 text-yellow-400">
                        ★{" "}
                        {
                          anime.rating
                        }
                        /10
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}

export default MyList;