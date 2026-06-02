import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

function Profile() {
  const {
    user,
    updateUser,
  } = useUser();

  const username =
    user?.username?.trim() ||
    "Guest";

  const email =
    user?.email?.trim() ||
    "No email available";

  const avatarLabel =
    username.charAt(0).toUpperCase();

  const [newUsername, setNewUsername] =
    useState(username);

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">Profile</h1>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold">
                {avatarLabel}
              </div>

              <div>
                <h2 className="text-2xl font-bold">{username}</h2>

                <p className="text-slate-400">{email}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-700 p-5">
                <h3 className="mb-4 text-lg font-bold">Change Username</h3>

                <input
                  type="text"
                  placeholder="New Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
                />

                <button
                  onClick={() => {
                    const trimmedUsername =
                      newUsername.trim();

                    if (!trimmedUsername) {
                      alert("Enter a username");
                      return;
                    }

                    updateUser({
                      username:
                        trimmedUsername,
                    });

                    setNewUsername(
                      trimmedUsername
                    );
                  }}
                  className="mt-4 rounded-lg bg-indigo-600 px-5 py-2"
                >
                  Save Username
                </button>
              </div>

              <div className="rounded-xl border border-slate-700 p-5">
                <h3 className="mb-4 text-lg font-bold">Change Password</h3>

                <input
                  type="password"
                  placeholder="Current Password"
                  className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
                />

                <button
                  onClick={() => alert("Password change backend coming soon")}
                  className="mt-4 rounded-lg bg-indigo-600 px-5 py-2"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default Profile;
