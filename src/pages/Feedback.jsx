import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";

function Feedback() {
  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">
            Feedback
          </h1>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
            <div className="mb-4">
              <label className="mb-2 block">
                Type
              </label>

              <select className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3">
                <option>
                  Bug Report
                </option>

                <option>
                  Feature Request
                </option>

                <option>
                  Review
                </option>

                <option>
                  Other
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block">
                Subject
              </label>

              <input
                type="text"
                placeholder="Short title"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Description
              </label>

              <textarea
                rows="6"
                placeholder="Describe your issue or suggestion..."
                className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
              />
            </div>

            <button
              className="mt-6 rounded-lg bg-indigo-600 px-5 py-3"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default Feedback;