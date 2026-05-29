import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import AnimeCard from "../components/anime/AnimeCard";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import { searchAnime } from "../api/anilist";

function Search() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchAnime(query);

      setResults(data);
    } catch (err) {
      setError("Failed to fetch anime.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Search anime..."
          onChange={(e) =>
            setQuery(e.target.value)
          }
          onKeyDown={handleKeyDown}
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={handleSearch}
        >
          Search
        </button>

        {loading && <Loader />}

        {error && (
          <ErrorMessage message={error} />
        )}

        {!loading &&
          !error &&
          query &&
          results.length === 0 && (
            <h2
              style={{
                marginTop: "20px",
              }}
            >
              No anime found.
            </h2>
          )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {results.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;