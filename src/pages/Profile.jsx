import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import {
  updatePassword as savePassword,
  updateProfile as saveProfile,
} from "../api/userServices";

function Profile() {
  const {
    user,
    setUser,
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
    useState(
      user?.username?.trim() || ""
    );

  const [usernameMessage, setUsernameMessage] =
    useState(null);

  const [passwordMessage, setPasswordMessage] =
    useState(null);

  const [isSavingUsername, setIsSavingUsername] =
    useState(false);

  const [isSavingPassword, setIsSavingPassword] =
    useState(false);

  const [
    passwordForm,
    setPasswordForm,
  ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function getErrorMessage(
    error,
    fallbackMessage
  ) {
    return (
      error.response?.data
        ?.message ||
      fallbackMessage
    );
  }

  async function handleUsernameSave() {
    const trimmedUsername =
      newUsername.trim();

    if (!trimmedUsername) {
      setUsernameMessage({
        type: "error",
        text: "Username cannot be empty.",
      });
      return;
    }

    if (
      trimmedUsername ===
      (user?.username?.trim() || "")
    ) {
      setUsernameMessage({
        type: "success",
        text: "Username is already up to date.",
      });
      return;
    }

    setIsSavingUsername(true);
    setUsernameMessage(null);

    try {
      const updatedUser =
        await saveProfile(
          trimmedUsername
        );

      setUser(updatedUser);
      setNewUsername(
        updatedUser.username
      );
      setUsernameMessage({
        type: "success",
        text: "Username updated successfully.",
      });
    } catch (error) {
      setUsernameMessage({
        type: "error",
        text: getErrorMessage(
          error,
          "Unable to update username."
        ),
      });
    } finally {
      setIsSavingUsername(false);
    }
  }

  function handlePasswordInputChange(
    event
  ) {
    const {
      name,
      value,
    } = event.target;

    setPasswordForm(
      (currentPasswordForm) => ({
        ...currentPasswordForm,
        [name]: value,
      })
    );
  }

  async function handlePasswordSave() {
    setIsSavingPassword(true);
    setPasswordMessage(null);

    try {
      const response =
        await savePassword(
          passwordForm.currentPassword,
          passwordForm.newPassword,
          passwordForm.confirmPassword
        );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordMessage({
        type: "success",
        text:
          response.message ||
          "Password updated successfully.",
      });
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: getErrorMessage(
          error,
          "Unable to update password."
        ),
      });
    } finally {
      setIsSavingPassword(false);
    }
  }

  function getMessageClass(type) {
    return type === "error"
      ? "mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
      : "mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200";
  }

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
                  onClick={handleUsernameSave}
                  disabled={isSavingUsername}
                  className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingUsername
                    ? "Saving..."
                    : "Save Username"}
                </button>

                {usernameMessage && (
                  <p
                    className={getMessageClass(
                      usernameMessage.type
                    )}
                  >
                    {usernameMessage.text}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-slate-700 p-5">
                <h3 className="mb-4 text-lg font-bold">Change Password</h3>

                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordInputChange}
                  className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
                />

                <button
                  onClick={handlePasswordSave}
                  disabled={isSavingPassword}
                  className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingPassword
                    ? "Updating..."
                    : "Change Password"}
                </button>

                {passwordMessage && (
                  <p
                    className={getMessageClass(
                      passwordMessage.type
                    )}
                  >
                    {passwordMessage.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default Profile;
