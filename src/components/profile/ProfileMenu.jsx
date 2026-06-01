import { useState } from "react";
import { Link } from "react-router-dom";

function ProfileMenu() {
  const [open, setOpen] = useState(false);

  const username = "Arihant Jain";
  localStorage.getItem("username") ||
  "Arihant Jain";

  const initials = username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white transition hover:scale-105"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
          <Link
            to="/stats"
            className="block px-4 py-3 hover:bg-slate-800"
            onClick={() => setOpen(false)}
          >
            Stats
          </Link>

          <Link
            to="/settings"
            className="block px-4 py-3 hover:bg-slate-800"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
