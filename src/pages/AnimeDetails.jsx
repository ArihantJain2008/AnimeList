import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function AnimeDetails() {
    const { id } = useParams();
    return(
        <>
        <Navbar />
        <h1>Anime ID: {id}</h1>
        </>
    );
}

export default AnimeDetails;