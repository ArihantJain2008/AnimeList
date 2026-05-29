import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import AnimeCard from "../components/anime/AnimeCard";
import { getUpcomingAnime } from "../api/anilist";

function Upcoming() {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUpcomingAnime() {
      try {
        setIsLoading(true);
        const data = await getUpcomingAnime();
        setAnimeList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load upcoming anime:", err);
        setError("Unable to load upcoming anime right now.");
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

      <h1>Upcoming Anime</h1>

      {isLoading && <p>Loading upcoming anime...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && animeList.length === 0 && <p>No upcoming anime found.</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </>
  );
}

export default Upcoming;
