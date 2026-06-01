import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import useMyList from "../hooks/useMyList";
import { useState } from "react";

function MyList() {
  const { myList, updateProgress, updateRating } = useMyList();
  const [filter, setFilter] = useState("All");

  const filteredAnime =
    filter === "All"
      ? myList
      : myList.filter((anime) => anime.status === filter);

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">My List</h1>

          <div className="mb-8 flex flex-wrap gap-3">
            {["All", "Watching", "Completed", "Plan To Watch", "Dropped"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    filter === status
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {status}
                </button>
              ),
            )}
          </div>

          {filteredAnime.length === 0 ? (
            <p>No anime added yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredAnime.map((anime) => (
                <div
                  key={anime.id}
                  className="overflow-hidden rounded-2xl border border-slate-700"
                >
                  <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="h-80 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold">{anime.title}</h3>

                    <div className="mt-4">
                      <p className="text-sm text-slate-400">Progress</p>

                      <p className="font-semibold">
                        {anime.progress} /{anime.totalEpisodes || "?"}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateProgress(
                            anime.id,
                            Math.max(anime.progress - 1, 0),
                          )
                        }
                        className="rounded-lg bg-slate-700 px-3 py-1"
                      >
                        -
                      </button>

                      <span>{anime.progress}</span>

                      <button
                        onClick={() =>
                          updateProgress(anime.id, anime.progress + 1)
                        }
                        className="rounded-lg bg-indigo-600 px-3 py-1"
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-slate-400">Rating</p>

                      <select
                        value={anime.rating}
                        onChange={(e) =>
                          updateRating(anime.id, Number(e.target.value))
                        }
                        className="mt-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2"
                      >
                        <option value={0}>Not Rated</option>

                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating}/10
                          </option>
                        ))}
                      </select>
                      {anime.rating > 0 && (
                        <p className="mt-2 text-yellow-400">
                          ★ {anime.rating}/10
                        </p>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-indigo-400">
                      {anime.status}
                    </p>
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
