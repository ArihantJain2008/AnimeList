    import { useEffect, useState } from "react";

    import Navbar from "../components/layout/Navbar";
    import AnimeCard from "../components/anime/AnimeCard";

    import Loader from "../components/common/Loader";
    import ErrorMessage from "../components/common/ErrorMessage";

    import { getTrendingAnime } from "../api/anilist";

    function Home() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    async function fetchAnime() {
        try {
        setLoading(true);

        const data = await getTrendingAnime();

        setAnimeList(data);
        } catch (err) {
        setError("Failed to load anime.");
        } finally {
        setLoading(false);
        }
    }

    fetchAnime();
    }, []);

    if (loading) return <Loader />;

    if (error)
    return (
        <ErrorMessage message={error} />
    );


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