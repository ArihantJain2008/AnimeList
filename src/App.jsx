import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
