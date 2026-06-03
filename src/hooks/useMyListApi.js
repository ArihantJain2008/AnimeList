import { useEffect, useState } from "react";

import {
  getMyList,
  addAnime,
  updateAnime,
  deleteAnime,
} from "../api/listService";

function useMyListApi() {
  const [myList, setMyList] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function loadList() {
    try {
      const data =
        await getMyList();

      setMyList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  async function addAnimeToList(
  anime,
  status
) {
  try {
    await addAnime({
      anime_id: anime.id,
      title: anime.title.romaji,
      status,
      progress: 0,
      rating: 0,
      favorite: false,
    });

    loadList();
  } catch (error) {
    console.error(error);
  }
}

  async function updateProgress(
    id,
    progress
  ) {
    try {
      const anime =
        myList.find(
          (a) => a.id === id
        );

      await updateAnime(id, {
        status: anime.status,
        rating: anime.rating,
        favorite:
          anime.favorite,
        progress,
      });

      loadList();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateRating(
  id,
  rating
) {
  try {
    const anime =
      myList.find(
        (a) => a.id === id
      );

    await updateAnime(id, {
      status: anime.status,
      rating,
      favorite:
        anime.favorite,
      progress:
        anime.progress,
    });

    loadList();
  } catch (error) {
    console.error(error);
  }
}

async function toggleFavorite(
  id
) {
  try {
    const anime =
      myList.find(
        (a) => a.id === id
      );

    await updateAnime(id, {
      status: anime.status,
      rating: anime.rating,
      favorite:
        !anime.favorite,
      progress:
        anime.progress,
    });

    loadList();
  } catch (error) {
    console.error(error);
  }
}

async function removeAnime(
  id
) {
  try {
    await deleteAnime(id);

    loadList();
  } catch (error) {
    console.error(error);
  }
}

async function updateStatus(
  id,
  status
) {
  try {
    const anime =
      myList.find(
        (a) => a.id === id
      );

    await updateAnime(id, {
      status,
      rating: anime.rating,
      favorite:
        anime.favorite,
      progress:
        anime.progress,
    });

    loadList();
  } catch (error) {
    console.error(error);
  }
}

  return {
  myList,
  loading,
  addAnime: addAnimeToList,
  updateProgress,
  updateRating,
  toggleFavorite,
  removeAnime,
  updateStatus,
};
}

export default useMyListApi;