import { Link } from "react-router-dom";

function AnimeCard({ anime }) {
  return (
    <Link
      to={`/anime/${anime.id}`}
      style={{
        textDecoration: "none",
        color: "white",
      }}
    >
      <div
        style={{
          width: "220px",
          border: "1px solid gray",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src={anime.coverImage.large}
          alt={anime.title.romaji}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />

        <h3
          style={{
            padding: "10px",
          }}
        >
          {anime.title.romaji}
        </h3>
      </div>
    </Link>
  );
}

export default AnimeCard;