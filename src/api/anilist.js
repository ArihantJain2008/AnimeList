const API_URL = "https://graphql.anilist.co";

export async function getTrendingAnime() {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(
          sort: TRENDING_DESC
          type: ANIME
        ) {
          id

          title {
            romaji
          }

          coverImage {
            large
          }
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
    }),
  });

  const data = await response.json();

  return data.data.Page.media;
}

export async function getAnimeDetails(id) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id

        title {
          romaji
          english
        }

        description

        episodes

        averageScore

        status

        genres

        bannerImage

        coverImage {
          extraLarge
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables: {
        id: Number(id),
      },
    }),
  });

  const data = await response.json();

  return data.data.Media;
}

export async function searchAnime(search) {
  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 20) {
        media(
          search: $search
          type: ANIME
        ) {
          id

          title {
            romaji
          }

          coverImage {
            large
          }
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables: {
        search,
      },
    }),
  });

  const data = await response.json();

  return data.data.Page.media;
}

export async function getUpcomingAnime() {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(
          type: ANIME
          sort: START_DATE
          status: NOT_YET_RELEASED
        ) {
          id

          title {
            romaji
          }

          coverImage {
            large
          }

          nextAiringEpisode {
            airingAt
          }
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  return data.data.Page.media;
}