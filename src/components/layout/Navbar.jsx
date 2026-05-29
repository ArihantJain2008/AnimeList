import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav 
        style={{
            display:"flex",
            justifyContent:"space-between",
            padding:"1rem 2rem",
            background:"#111827"
        }}
        >
            <Link 
            to="/"
            style={{
                color:"white",
                textDecoration:"none",
                fontWeight:"bold"
            }}
            >
                AniTrack
            </Link>

            <div style={{ display: "flex", gap:"1rem"}}>
                <Link 
                to="/"
                style={{color:"white",textDecoration:"none"}}
                >
                    Home
                </Link>

                <Link 
                to="/search"
                style={{color:"white", textDecoration:"none"}}
                >
                    Search
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
