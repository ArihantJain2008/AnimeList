import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authServices";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data =
        await login(
          email,
          password
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  }

  return (
    <div className="mx-auto max-w-md py-20">
      <h1 className="mb-8 text-4xl font-black">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 p-3 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;