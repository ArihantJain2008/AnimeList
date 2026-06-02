import {
  useEffect,
  useState,
} from "react";
import UserContext from "./userContext";

const USER_STORAGE_KEY = "user";

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser =
    window.localStorage.getItem(
      USER_STORAGE_KEY
    );

  if (!rawUser) {
    return null;
  }

  try {
    const parsedUser =
      JSON.parse(rawUser);

    return parsedUser &&
      typeof parsedUser === "object"
      ? parsedUser
      : null;
  } catch {
    window.localStorage.removeItem(
      USER_STORAGE_KEY
    );

    return null;
  }
}

function persistUser(nextUser) {
  if (typeof window === "undefined") {
    return;
  }

  if (nextUser) {
    window.localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(nextUser)
    );

    return;
  }

  window.localStorage.removeItem(
    USER_STORAGE_KEY
  );
}

function UserProvider({
  children,
}) {
  const [user, setCurrentUser] =
    useState(() =>
      readStoredUser()
    );

  useEffect(() => {
    function handleStorage(event) {
      if (
        event.key ===
        USER_STORAGE_KEY
      ) {
        setCurrentUser(
          readStoredUser()
        );
      }
    }

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  function setUser(nextUser) {
    setCurrentUser(nextUser);
    persistUser(nextUser);
  }

  function updateUser(updates) {
    const nextUser =
      typeof updates === "function"
        ? updates(user ?? {})
        : {
            ...(user ?? {}),
            ...updates,
          };

    setUser(nextUser);

    return nextUser;
  }

  function clearUser() {
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
