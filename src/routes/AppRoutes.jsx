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
import Notifications from "../pages/Notifications";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Feedback from "../pages/Feedback";
import ProtectedRoute from "../components/protectedRoutes";
// import TestBackend from "../pages/TestBackend";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/anime" element={<Navigate to="/" replace />} />
      <Route path="/anime/:id" element={<AnimeDetails />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/seasonal" element={<Seasonal />} />
      <Route
        path="/my-list"
        element={
          <ProtectedRoute>
            <MyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stats"
        element={
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route path="/releases" element={ <Navigate to="/calendar" replace /> } />
      <Route path="/calendar" element={<ReleaseCalendar />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/feedback" element={<Feedback />} />
      {/* <Route path="/test-backend" element={<TestBackend />} /> */}
    </Routes>
  );
}

export default AppRoutes;
