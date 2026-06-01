export function addNotification(
  message
) {
  const existing =
    JSON.parse(
      localStorage.getItem(
        "notifications"
      )
    ) || [];

  existing.unshift({
    id: Date.now(),
    message,
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(existing)
  );
}