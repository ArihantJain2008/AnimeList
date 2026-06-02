import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authServices";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(
        username,
        email,
        password
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    }
  }

  return (
    <div className="mx-auto max-w-md py-20">
      <h1 className="mb-8 text-4xl font-black">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
        />

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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;