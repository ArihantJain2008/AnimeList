import api from "./api";

export async function submitFeedback(
  feedback
) {
  const response =
    await api.post(
      "/feedback",
      feedback
    );

  return response.data;
}

export async function getMyFeedback() {
  const response =
    await api.get(
      "/feedback/my"
    );

  return response.data;
}
