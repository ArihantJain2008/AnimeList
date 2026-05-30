const SECONDS_TO_MS = 1000;

function toDate(input) {
  if (input instanceof Date) {
    return new Date(input.getTime());
  }

  if (typeof input === "number") {
    const asMilliseconds =
      input > 1_000_000_000_000
        ? input
        : input * SECONDS_TO_MS;
    return new Date(asMilliseconds);
  }

  return new Date(input);
}

function startOfDay(input) {
  const date = toDate(input);
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfMonth(input) {
  const date = toDate(input);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );
}

export function getDateKey(input) {
  const date = startOfDay(input);
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getMonthKey(input) {
  const date = toDate(input);
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  return `${year}-${month}`;
}

export function generateCurrentMonthDates(
  referenceDate = new Date()
) {
  const reference = startOfMonth(referenceDate);
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const totalDaysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const dates = [];

  for (
    let dayNumber = 1;
    dayNumber <= totalDaysInMonth;
    dayNumber += 1
  ) {
    dates.push(new Date(year, month, dayNumber));
  }

  return dates;
}

export function generateNext30Days(
  fromDate = new Date()
) {
  return generateCurrentMonthDates(
    fromDate
  );
}

export function formatDateChip(input) {
  const date = toDate(input);
  const weekday = new Intl.DateTimeFormat(
    undefined,
    {
      weekday: "short",
    }
  ).format(date);
  const day = new Intl.DateTimeFormat(
    undefined,
    {
      day: "numeric",
    }
  ).format(date);

  return {
    weekday,
    day,
  };
}

export function isSameDay(
  firstDate,
  secondDate
) {
  return (
    getDateKey(firstDate) ===
    getDateKey(secondDate)
  );
}

export function formatReleaseTime(input) {
  const date = toDate(input);

  if (Number.isNaN(date.getTime())) {
    return "Time TBA";
  }

  const time = new Intl.DateTimeFormat(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  ).format(date);

  const zonePart =
    new Intl.DateTimeFormat(undefined, {
      timeZoneName: "short",
    })
      .formatToParts(date)
      .find(
        (part) =>
          part.type === "timeZoneName"
      )?.value || "";

  return `${time} ${zonePart}`.trim();
}

export function formatMonthYear(input) {
  const date = toDate(input);
  return new Intl.DateTimeFormat(
    undefined,
    {
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

export const formatTime = formatReleaseTime;

export function groupByDate(releases) {
  const safeReleases = Array.isArray(releases)
    ? releases
    : [];

  return safeReleases.reduce(
    (accumulator, release) => {
      if (
        !release ||
        typeof release.airingAt !== "number"
      ) {
        return accumulator;
      }

      const key = getDateKey(release.airingAt);

      if (!accumulator[key]) {
        accumulator[key] = [];
      }

      accumulator[key].push(release);
      accumulator[key].sort(
        (first, second) =>
          first.airingAt - second.airingAt
      );

      return accumulator;
    },
    {}
  );
}
