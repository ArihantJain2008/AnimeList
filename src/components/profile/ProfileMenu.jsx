import { useState } from "react";
import { Link } from "react-router-dom";

function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Profile ▼
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