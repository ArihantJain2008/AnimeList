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
            english
          }

          description(asHtml: false)

          bannerImage

          coverImage {
            large
            medium
          }

          averageScore

          genres
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
            english
          }

          coverImage {
            large
            medium
          }

          averageScore

          genres
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
            english
          }

          coverImage {
            large
            medium
          }

          nextAiringEpisode {
            airingAt
          }

          averageScore

          genres
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

export async function getSeasonalAnime(
  season,
  year,
  genre
) {
  const query = `
    query (
      $season: MediaSeason
      $seasonYear: Int
      $genreIn: [String]
    ) {
      Page(page: 1, perPage: 20) {
        media(
          type: ANIME
          season: $season
          seasonYear: $seasonYear
          genre_in: $genreIn
        ) {
          id

          title {
            romaji
            english
          }

          coverImage {
            large
            medium
          }

          averageScore

          genres
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
        season,
        seasonYear: year,
        genreIn:
          genre && genre.trim() !== ""
            ? [genre]
            : null,
      },
    }),
  });

  const data = await response.json();

  return data.data.Page.media;
}

export async function getReleaseSchedule() {
  const query = `
    query (
      $page: Int
      $perPage: Int
      $airingAtGreater: Int
      $airingAtLesser: Int
    ) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
        }

        airingSchedules(
          airingAt_greater: $airingAtGreater
          airingAt_lesser: $airingAtLesser
          sort: TIME
        ) {
          airingAt
          episode

          media {
            id

            title {
              romaji
            }

            coverImage {
              large
            }

            status
          }
        }
      }
    }
  `;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const nowInSeconds = Math.floor(
    todayStart.getTime() / 1000
  );
  const nextWeekInSeconds = Math.floor(
    (todayStart.getTime() +
      7 * 24 * 60 * 60 * 1000) /
      1000
  );

  const perPage = 50;
  const maxPages = 4;

  let page = 1;
  let hasNextPage = true;
  const releaseSchedule = [];

  while (hasNextPage && page <= maxPages) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          page,
          perPage,
          airingAtGreater: nowInSeconds,
          airingAtLesser: nextWeekInSeconds,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Unable to load release schedule."
      );
    }

    const data = await response.json();

    if (
      Array.isArray(data?.errors) &&
      data.errors.length > 0
    ) {
      throw new Error(
        data.errors[0]?.message ||
          "Unable to load release schedule."
      );
    }

    const pageData = data?.data?.Page;
    const schedules =
      pageData?.airingSchedules;

    if (Array.isArray(schedules)) {
      releaseSchedule.push(...schedules);
    }

    hasNextPage = Boolean(
      pageData?.pageInfo?.hasNextPage
    );
    page += 1;
  }

  return releaseSchedule;
}

export async function getReleaseCalendar(
  referenceDate = new Date()
) {
  const query = `
    query (
      $page: Int
      $perPage: Int
      $airingAtGreater: Int
      $airingAtLesser: Int
    ) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
        }

        airingSchedules(
          airingAt_greater: $airingAtGreater
          airingAt_lesser: $airingAtLesser
          sort: TIME
        ) {
          airingAt
          episode

          media {
            id

            title {
              romaji
            }

            coverImage {
              large
            }

            status
          }
        }
      }
    }
  `;

  const parsedReference = new Date(
    referenceDate
  );
  const monthStart = new Date(
    parsedReference.getFullYear(),
    parsedReference.getMonth(),
    1
  );
  const nextMonthStart = new Date(
    parsedReference.getFullYear(),
    parsedReference.getMonth() + 1,
    1
  );

  const rangeStart =
    Math.floor(monthStart.getTime() / 1000) -
    1;
  const rangeEnd = Math.floor(
    nextMonthStart.getTime() / 1000
  );

  const perPage = 50;
  const maxPages = 100;

  let page = 1;
  let hasNextPage = true;
  const releaseCalendar = [];

  while (hasNextPage && page <= maxPages) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          page,
          perPage,
          airingAtGreater: rangeStart,
          airingAtLesser: rangeEnd,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Unable to load release calendar."
      );
    }

    const data = await response.json();

    if (
      Array.isArray(data?.errors) &&
      data.errors.length > 0
    ) {
      throw new Error(
        data.errors[0]?.message ||
          "Unable to load release calendar."
      );
    }

    const pageData = data?.data?.Page;
    const schedules = Array.isArray(
      pageData?.airingSchedules
    )
      ? pageData.airingSchedules
      : [];

    if (schedules.length > 0) {
      releaseCalendar.push(...schedules);
    }

    hasNextPage = Boolean(
      pageData?.pageInfo?.hasNextPage
    );

    const reachedEndOfMonthResults =
      schedules.length < perPage;

    page += 1;

    if (
      !hasNextPage ||
      reachedEndOfMonthResults
    ) {
      break;
    }
  }

  return releaseCalendar;
}
