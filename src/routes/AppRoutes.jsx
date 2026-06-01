import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import AnimeDetails from "../pages/AnimeDetails";
import Upcoming from "../pages/Upcoming";
import Seasonal from "../pages/Seasonal";
import ReleaseCalendar from "../pages/ReleaseCalendar";
import MyList from "../pages/MyList";
import Stats from "../pages/Stats";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/anime" element={<Navigate to="/" replace />} />
      <Route path="/anime/:id" element={<AnimeDetails />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/seasonal" element={<Seasonal />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/releases"
        element={
          <Navigate to="/calendar" replace />
        }
      />
      <Route
        path="/calendar"
        element={<ReleaseCalendar />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
