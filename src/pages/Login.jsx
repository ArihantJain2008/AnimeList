import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authServices";
import AuthShell from "../components/auth/AuthShell";
import { useUser } from "../hooks/useUser";

const INPUT_CLASS_NAME =
  "w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-400/80 focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-70";

const LOGIN_HIGHLIGHTS = [
  {
    title: "Seasonal radar",
    description:
      "Track the titles you are following and stay ahead of every release window.",
  },
  {
    title: "Queue continuity",
    description:
      "Jump right back into your watchlist without hunting through tabs or notes.",
  },
  {
    title: "Focused dashboard",
    description:
      "Keep favorites, progress, and upcoming episodes organized in one place.",
  },
];

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const data = await login(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data.user);

      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      badge="Return To Your Watchlist"
      title="Sign in and jump back into your next arc."
      description="Pick up where you left off, follow every seasonal release, and keep your anime queue moving from one episode to the next."
      footerText="Don't have an account?"
      footerLinkLabel="Register"
      footerTo="/register"
      spotlightLabel="Night Session"
      spotlightTitle="Every series, score, and schedule in one sleek command center."
      spotlightDescription="AniTrack keeps your watchlist close, your favorites organized, and your upcoming releases ready the moment you log back in."
      highlights={LOGIN_HIGHLIGHTS}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
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
            placeholder="Enter your password"
            value={password}
            autoComplete="current-password"
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
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;
