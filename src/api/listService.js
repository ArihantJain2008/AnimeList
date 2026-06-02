import api from "./api";

export async function getMyList() {
  const response =
    await api.get("/list");

  return response.data;
}

export async function addAnime(
  anime
) {
  const response =
    await api.post(
      "/list/add",
      anime
    );

  return response.data;
}

export async function updateAnime(
  id,
  updates
) {
  const response =
    await api.patch(
      `/list/${id}`,
      updates
    );

  return response.data;
}

export async function deleteAnime(
  id
) {
  const response =
    await api.delete(
      `/list/${id}`
    );

  return response.data;
}