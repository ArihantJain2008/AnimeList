import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useUser } from "../../hooks/useUser";

function ProfileMenu() {
  const navigate = useNavigate();
  const { user, clearUser } =
    useUser();
  const [open, setOpen] = useState(false);

  const username =
    user?.username?.trim() ||
    "Guest";

  const email =
    user?.email?.trim() ||
    "No email available";

  const initials = username
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuItemClass =
    "block px-4 py-3 transition hover:bg-slate-800";

  function closeMenu() {
    setOpen(false);
  }

  function logout() {
    localStorage.removeItem(
      "token"
    );

    clearUser();
    closeMenu();
    navigate("/login");
  }

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex items-center gap-3 rounded-full border border-slate-300 bg-white/85 px-2 py-1 text-slate-900 shadow-sm transition hover:scale-[1.02] dark:border-slate-700 dark:bg-slate-900/85 dark:text-white"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
          {initials || "?"}
        </span>

        <span className="hidden max-w-28 truncate text-sm font-semibold md:block">
          {username}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
          <div className="border-b border-slate-700 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Signed in as
            </p>
            <p className="mt-2 truncate text-sm font-semibold text-white">
              {username}
            </p>
            <p className="truncate text-sm text-slate-400">
              {email}
            </p>
          </div>
          <Link
            to="/profile"
            className={menuItemClass}
            onClick={closeMenu}
          >
            Profile
          </Link>

          <Link
            to="/feedback"
            className={menuItemClass}
            onClick={closeMenu}
          >
            Feedback
          </Link>

          <Link
            to="/stats"
            className={menuItemClass}
            onClick={closeMenu}
          >
            Stats
          </Link>

          <Link
            to="/settings"
            className={menuItemClass}
            onClick={closeMenu}
          >
            Settings
          </Link>

          <div className="border-t border-slate-700 p-3">
            <button
              onClick={logout}
              className="w-full rounded-xl bg-red-600 p-3 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
