import api from "./api";

export async function updateProfile(
  username
) {
  const response =
    await api.patch(
      "/user/profile",
      { username }
    );

  return response.data.user;
}

export async function updatePassword(
  currentPassword,
  newPassword,
  confirmPassword
) {
  const response =
    await api.patch(
      "/user/password",
      {
        currentPassword,
        newPassword,
        confirmPassword,
      }
    );

  return response.data;
}
