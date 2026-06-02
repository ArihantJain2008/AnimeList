/*
TEMPORARY BACKEND TEST PAGE

Used to verify:
- JWT authentication
- Axios connection
- GET /api/list
- PostgreSQL integration

Not used in production.

Can be re-enabled later if needed.
*/

import {
  useEffect,
  useState,
} from "react";

import {
  getMyList,
} from "../api/listService";

function TestBackend() {
  const [anime, setAnime] =
    useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getMyList();

        setAnime(data);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  return (
    <div className="p-10">
      <h1 className="mb-6 text-4xl font-black">
        Backend Test
      </h1>

      {anime.map((item) => (
        <div
          key={item.id}
          className="mb-4 rounded-xl border p-4"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default TestBackend;