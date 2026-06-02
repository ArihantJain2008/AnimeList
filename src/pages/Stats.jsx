import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import useMyListApi from "../hooks/useMyListApi";

function Stats() {
  const { myList } = useMyListApi();

  const total = myList.length;

  const watching = myList.filter(
    anime => anime.status === "Watching"
  ).length;

  const completed = myList.filter(
    anime => anime.status === "Completed"
  ).length;

  const planToWatch = myList.filter(
    anime => anime.status === "Plan To Watch"
  ).length;

  const dropped = myList.filter(
    anime => anime.status === "Dropped"
  ).length;

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">
            Statistics
          </h1>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border p-6">
              <h3>Total Anime</h3>
              <p className="text-3xl font-bold">
                {total}
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3>Watching</h3>
              <p className="text-3xl font-bold">
                {watching}
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3>Completed</h3>
              <p className="text-3xl font-bold">
                {completed}
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3>Dropped</h3>
              <p className="text-3xl font-bold">
                {dropped}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default Stats;