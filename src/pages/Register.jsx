import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authServices";
import AuthShell from "../components/auth/AuthShell";

const INPUT_CLASS_NAME =
  "w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/80 focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-70";

const REGISTER_HIGHLIGHTS = [
  {
    title: "Build your lineup",
    description:
      "Create a personal tracking space for favorites, new releases, and future picks.",
  },
  {
    title: "Stay release ready",
    description:
      "Keep a clean pulse on seasonal premieres and returning shows across the calendar.",
  },
  {
    title: "Start organized",
    description:
      "Set up your AniTrack profile once and keep your anime progress tidy from day one.",
  },
];

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  const [errorMessage, setErrorMessage] =
    useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await register(
        username,
        email,
        password
      );

      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      badge="Create Your Watch Hub"
      title="Create an account and build your anime HQ."
      description="Set up your profile, start tracking what you love, and keep every release, backlog pick, and upcoming favorite inside one polished dashboard."
      footerText="Already have an account?"
      footerLinkLabel="Login"
      footerTo="/login"
      spotlightLabel="Fresh Start"
      spotlightTitle="Shape a watchlist that keeps pace with every new season."
      spotlightDescription="From first-time discoveries to long-running series, AniTrack gives you a focused space to plan, track, and revisit your next obsession."
      highlights={REGISTER_HIGHLIGHTS}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Username
          </span>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            autoComplete="username"
            disabled={isSubmitting}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className={INPUT_CLASS_NAME}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Email
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            autoComplete="email"
            disabled={isSubmitting}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className={INPUT_CLASS_NAME}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Password
          </span>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            autoComplete="new-password"
            disabled={isSubmitting}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className={INPUT_CLASS_NAME}
          />
        </label>

        <div
          className="min-h-[3.5rem]"
          aria-live="polite"
        >
          {errorMessage ? (
            <div
              role="alert"
              className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100 backdrop-blur-sm"
            >
              {errorMessage}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(79,70,229,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Creating account...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </AuthShell>
  );
}

export default Register;
