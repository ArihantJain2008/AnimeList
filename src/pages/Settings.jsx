import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";

import {
  getTheme,
  setTheme,
} from "../utils/theme";

function Settings() {
  const [theme, setCurrentTheme] =
    useState(getTheme());

  function handleThemeToggle() {
    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);
    setCurrentTheme(newTheme);
  }

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">
            Settings
          </h1>

          <div className="rounded-xl border border-slate-700 p-6">
            <h2 className="mb-4 text-xl font-bold">
              Appearance
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  Theme
                </p>

                <p className="text-sm text-slate-400">
                  Current Theme:{" "}
                  {theme === "dark"
                    ? "Dark"
                    : "Light"}
                </p>
              </div>

              <button
                onClick={handleThemeToggle}
                className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500"
              >
                Switch To{" "}
                {theme === "dark"
                  ? "Light"
                  : "Dark"}
                Mode
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default Settings; 