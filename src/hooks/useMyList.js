import { useState, useEffect } from "react";

import {
  addNotification,
} from "../utils/notifications";

const STORAGE_KEY = "anime-tracker-my-list";

function useMyList() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setMyList(JSON.parse(saved));
    }
  }, []);

  function saveList(updatedList) {
    setMyList(updatedList);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  }

  function addAnime(anime, status) {
    const exists = myList.find((item) => item.id === anime.id);

    addNotification(
  `${anime.title.romaji} added to ${status}`
);

    if (exists) {
      updateStatus(anime.id, status);
      return;
    }

    const updatedList = [
      ...myList,
      {
        id: anime.id,
        title: anime.title.romaji,
        coverImage: anime.coverImage.extraLarge || anime.coverImage.large,

        totalEpisodes: anime.episodes || 0,

        progress: 0,

        rating: 0,

        favourite: false,

        status,

        updatedAt: Date.now(),
      },
    ];

    saveList(updatedList);
  }

  function removeAnime(id) {
    const updatedList = myList.filter((anime) => anime.id !== id);

    saveList(updatedList);
  }

  function updateProgress(id, progress) {
    const updatedList = myList.map((anime) =>
      anime.id === id
        ? {
            ...anime,
            progress,
          }
        : anime,
    );

    saveList(updatedList);
  }

  function updateStatus(id, status) {
    const updatedList = myList.map((anime) =>
      anime.id === id
        ? {
            ...anime,
            status,
            progress: 0,
            updatedAt: Date.now(),
          }
        : anime,
    );

    saveList(updatedList);
  }

  function updateProgress(id, progress) {
    const updatedList = myList.map((anime) =>
      anime.id === id
        ? {
            ...anime,
            progress,
            updatedAt: Date.now(),
          }
        : anime,
    );

    saveList(updatedList);
  }

  function updateRating(id, rating) {
  const updatedList = myList.map(
    (anime) =>
      anime.id === id
        ? {
            ...anime,
            rating,
            updatedAt: Date.now(),
          }
        : anime
  );

  saveList(updatedList);

  addNotification(
  `${anime.title} added to Favorites`
);
}

  function toggleFavorite(id) {
  const updatedList = myList.map(
    (anime) =>
      anime.id === id
        ? {
            ...anime,
            favorite: !anime.favorite,
            updatedAt: Date.now(),
          }
        : anime
  );

  saveList(updatedList);

  addNotification(
  `${anime.title} added to Favorites`
);
}

  return {
  myList,
  addAnime,
  removeAnime,
  updateStatus,
  updateProgress,
  updateRating,
  toggleFavorite,
};
}

export default useMyList;
