import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/ui/SectionTitle";
import ReleaseCard from "../components/releases/ReleaseCard";
import { getReleaseCalendar } from "../api/anilist";
import {
  formatDateChip,
  formatMonthYear,
  generateCurrentMonthDates,
  getDateKey,
  getMonthKey,
  groupByDate,
} from "../utils/dateHelpers";

function formatLongDate(input) {
  return new Intl.DateTimeFormat(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  ).format(input);
}

function getMillisecondsUntilNextDay(
  referenceDate = new Date()
) {
  const nextDay = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate() + 1
  );

  return Math.max(
    nextDay.getTime() - referenceDate.getTime(),
    1000
  );
}

function ReleaseCalendar() {
  const [currentDate, setCurrentDate] =
    useState(() => new Date());
  const [calendarData, setCalendarData] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");
  const [selectedDateKey, setSelectedDateKey] =
    useState(() => getDateKey(new Date()));
  const activeDateChipRef = useRef(null);
  const currentMonthKey = getMonthKey(
    currentDate
  );
  const calendarMonthLabel = formatMonthYear(
    currentDate
  );

  const dateChips = useMemo(
    () => {
      const [year, month] =
        currentMonthKey
          .split("-")
          .map((value) => Number(value));

      return generateCurrentMonthDates(
        new Date(year, month - 1, 1)
      ).map((date) => ({
        key: getDateKey(date),
        date,
        label: formatDateChip(date),
        fullLabel: formatLongDate(date),
      }));
    },
    [currentMonthKey]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => {
        setCurrentDate(new Date());
      },
      getMillisecondsUntilNextDay(new Date())
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentDate]);

  useEffect(() => {
    setSelectedDateKey(getDateKey(currentDate));
  }, [currentMonthKey]);

  useEffect(() => {
    if (
      dateChips.some(
        (chip) => chip.key === selectedDateKey
      )
    ) {
      return;
    }

    setSelectedDateKey(getDateKey(currentDate));
  }, [currentDate, dateChips, selectedDateKey]);

  useEffect(() => {
    let isMounted = true;

    async function fetchReleaseCalendar() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getReleaseCalendar(
            currentDate
          );

        if (!isMounted) {
          return;
        }

        setCalendarData(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Failed to load release calendar:",
          err
        );

        if (!isMounted) {
          return;
        }

        setError(
          "Unable to load release calendar right now."
        );
        setCalendarData([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReleaseCalendar();

    return () => {
      isMounted = false;
    };
  }, [currentMonthKey]);

  useEffect(() => {
    const activeChip = activeDateChipRef.current;

    if (!activeChip) {
      return;
    }

    activeChip.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [dateChips, selectedDateKey]);

  const releasesByDate = useMemo(
    () => groupByDate(calendarData),
    [calendarData]
  );

  const selectedDateReleases = useMemo(
    () =>
      releasesByDate[selectedDateKey] || [],
    [releasesByDate, selectedDateKey]
  );

  const selectedDateMeta =
    dateChips.find(
      (chip) => chip.key === selectedDateKey
    ) ||
    dateChips.find(
      (chip) =>
        chip.key === getDateKey(currentDate)
    ) ||
    dateChips[0] ||
    null;

  return (
    <>
      <Navbar />

      <main className="pb-16 pt-8">
        <PageContainer>
          <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-[var(--shadow)] dark:border-slate-700/70 dark:bg-slate-900/75">
            <SectionTitle
              title="Release Calendar"
              subtitle="Pick a date and instantly see exactly what anime episodes and premieres are releasing."
            />
          </section>

          <section className="sticky top-16 z-40 mt-5">
            <div className="rounded-2xl border border-slate-200/75 bg-white/78 p-2 shadow-[var(--shadow)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70">
              <div className="px-2 pb-2">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {calendarMonthLabel}
                </p>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="flex min-w-max gap-2">
                  {dateChips.map((chip) => {
                    const isActive =
                      selectedDateKey ===
                      chip.key;

                    return (
                      <button
                        key={chip.key}
                        ref={
                          isActive
                            ? activeDateChipRef
                            : null
                        }
                        type="button"
                        onClick={() =>
                          setSelectedDateKey(
                            chip.key
                          )
                        }
                        aria-label={chip.fullLabel}
                        aria-pressed={isActive}
                        className={`min-w-[72px] rounded-xl px-4 py-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                          isActive
                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white/65 text-slate-700 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        }`}
                      >
                        <span
                          className={`block text-[11px] font-semibold uppercase tracking-[0.1em] ${
                            isActive
                              ? "text-indigo-100"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {chip.label.weekday}
                        </span>
                        <span className="mt-0.5 block text-lg font-semibold leading-none">
                          {chip.label.day}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Releases for{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {selectedDateMeta?.fullLabel}
                </span>
              </p>

              <p className="rounded-full border border-slate-300/75 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {selectedDateReleases.length} releases
              </p>
            </div>

            {loading && (
              <Loader message="Loading release calendar..." />
            )}

            {!loading && error && (
              <ErrorMessage message={error} />
            )}

            {!loading &&
              !error &&
              selectedDateReleases.length ===
                0 && (
                <div className="rounded-2xl border border-slate-300/70 bg-white/80 px-4 py-5 text-sm font-medium text-slate-700 shadow-[var(--shadow)] dark:border-slate-700/75 dark:bg-slate-900/70 dark:text-slate-200">
                  No anime releases scheduled for this date.
                </div>
              )}

            {!loading &&
              !error &&
              selectedDateReleases.length >
                0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedDateReleases.map(
                    (release) => (
                      <ReleaseCard
                        key={`${release.media.id}-${release.episode}-${release.airingAt}`}
                        release={release}
                      />
                    )
                  )}
                </div>
              )}
          </section>
        </PageContainer>
      </main>
    </>
  );
}

export default ReleaseCalendar;
