import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import AnimeCard from "../components/anime/AnimeCard";

import { getTrendingAnime } from "../api/anilist";

function Home() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data = await getTrendingAnime();
        setAnimeList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load trending anime:", error);
        setAnimeList([]);
      }
    }

    fetchAnime();
  }, []);

  return (
    <>
      <Navbar />

      <h1>Trending Anime</h1>
      <p>Total Anime: {animeList.length}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {animeList.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
