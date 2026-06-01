import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";

function Notifications() {
  const notifications =
    JSON.parse(
      localStorage.getItem(
        "notifications"
      )
    ) || [];

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="py-10">
          <h1 className="mb-8 text-4xl font-black">
            Notifications
          </h1>

          {notifications.length === 0 ? (
            <p>
              No notifications yet.
            </p>
          ) : (
            <div className="space-y-4">
              {notifications.map(
                (notification) => (
                  <div
                    key={notification.id}
                    className="rounded-xl border border-slate-700 p-4"
                  >
                    <p>
                      {
                        notification.message
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}

export default Notifications;