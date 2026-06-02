import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import {
  useEffect,
  useState,
} from "react";
import {
  getMyFeedback,
  submitFeedback,
} from "../api/feedbackServices";

const FEEDBACK_TYPES = [
  "Bug Report",
  "Feature Request",
  "Review",
  "Other",
];

const EMPTY_FEEDBACK_FORM = {
  type: "",
  subject: "",
  message: "",
  rating: "",
};

function Feedback() {
  const [form, setForm] =
    useState(
      EMPTY_FEEDBACK_FORM
    );
  const [myFeedback, setMyFeedback] =
    useState([]);
  const [formMessage, setFormMessage] =
    useState(null);
  const [feedbackError, setFeedbackError] =
    useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] =
    useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadFeedback() {
      try {
        const feedbackEntries =
          await getMyFeedback();

        if (isMounted) {
          setMyFeedback(
            feedbackEntries
          );
          setFeedbackError("");
        }
      } catch (error) {
        if (isMounted) {
          setFeedbackError(
            error.response?.data
              ?.message ||
              "Unable to load your feedback right now."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingFeedback(
            false
          );
        }
      }
    }

    loadFeedback();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (currentForm) => ({
        ...currentForm,
        [name]: value,
      })
    );
  }

  function formatCreatedAt(
    value
  ) {
    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "Unknown date";
    }

    return date.toLocaleString(
      "en-IN",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  function getMessageClass(type) {
    return type === "error"
      ? "mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
      : "mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200";
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const createdFeedback =
        await submitFeedback({
          type: form.type,
          subject: form.subject,
          message: form.message,
          rating:
            form.rating === ""
              ? null
              : Number(
                  form.rating
                ),
        });

      setMyFeedback(
        (
          currentFeedback
        ) => [
          createdFeedback,
          ...currentFeedback,
        ]
      );
      setForm(
        EMPTY_FEEDBACK_FORM
      );
      setFormMessage({
        type: "success",
        text: "Feedback submitted successfully.",
      });
      setFeedbackError("");
    } catch (error) {
      setFormMessage({
        type: "error",
        text:
          error.response?.data
            ?.message ||
          "Unable to submit feedback right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">
            Feedback
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            className="rounded-2xl border border-slate-700 bg-slate-900 p-8"
          >
            <div className="mb-4">
              <label className="mb-2 block">
                Type
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
              >
                <option value="">
                  Select feedback type
                </option>

                {FEEDBACK_TYPES.map(
                  (typeOption) => (
                    <option
                      key={typeOption}
                      value={typeOption}
                    >
                      {typeOption}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Short title"
                value={form.subject}
                onChange={handleChange}
                required
                maxLength="150"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block">
                Rating
              </label>

              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
              >
                <option value="">
                  No rating
                </option>
                {[1, 2, 3, 4, 5].map(
                  (
                    ratingOption
                  ) => (
                    <option
                      key={
                        ratingOption
                      }
                      value={
                        ratingOption
                      }
                    >
                      {ratingOption} / 5
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block">
                Message
              </label>

              <textarea
                rows="6"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your issue or suggestion..."
                required
                maxLength="5000"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Feedback"}
            </button>

            {formMessage && (
              <p
                className={getMessageClass(
                  formMessage.type
                )}
              >
                {formMessage.text}
              </p>
            )}
          </form>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  My Feedback
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Your previous submissions are listed here.
                </p>
              </div>
            </div>

            {feedbackError && (
              <p className={getMessageClass("error")}>
                {feedbackError}
              </p>
            )}

            {isLoadingFeedback ? (
              <p className="text-slate-400">
                Loading feedback...
              </p>
            ) : myFeedback.length ? (
              <div className="space-y-4">
                {myFeedback.map(
                  (
                    feedbackEntry
                  ) => (
                    <article
                      key={
                        feedbackEntry.id
                      }
                      className="rounded-xl border border-slate-700 bg-slate-950/60 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm uppercase tracking-[0.18em] text-indigo-300">
                            {feedbackEntry.type}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-white">
                            {feedbackEntry.subject}
                          </h3>
                        </div>

                        <span className="rounded-full border border-slate-600 px-3 py-1 text-sm text-slate-300">
                          {feedbackEntry.rating
                            ? `${feedbackEntry.rating}/5`
                            : "No rating"}
                        </span>
                      </div>

                      <p className="mt-4 text-sm text-slate-400">
                        Submitted on{" "}
                        {formatCreatedAt(
                          feedbackEntry.created_at
                        )}
                      </p>
                    </article>
                  )
                )}
              </div>
            ) : (
              <p className="text-slate-400">
                You have not submitted any feedback yet.
              </p>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default Feedback;
