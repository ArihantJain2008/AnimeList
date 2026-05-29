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