import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import { getAnimeDetails } from "../api/anilist";

function AnimeDetails() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);

  useEffect(() => {
    async function fetchAnime() {
      const data = await getAnimeDetails(id);

      setAnime(data);
    }

    fetchAnime();
  }, [id]);

  if (!anime) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <img
        src={anime.bannerImage}
        alt={anime.title.romaji}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "20px" }}>
        <h1>{anime.title.romaji}</h1>

        <img
          src={anime.coverImage.extraLarge}
          alt={anime.title.romaji}
          width="250"
        />

        <p>
          Episodes: {anime.episodes}
        </p>

        <p>
          Score: {anime.averageScore}
        </p>

        <p>
          Status: {anime.status}
        </p>

        <p>
          Genres: {anime.genres.join(", ")}
        </p>
      </div>
    </>
  );
}

export default AnimeDetails;