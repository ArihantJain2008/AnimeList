import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import AnimeDetails from "../pages/AnimeDetails";
import Upcoming from "../pages/Upcoming";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/anime" element={<Navigate to="/" replace />} />
      <Route path="/anime/:id" element={<AnimeDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/upcoming" element={<Upcoming />}/>
    </Routes>
  );
}

export default AppRoutes;
