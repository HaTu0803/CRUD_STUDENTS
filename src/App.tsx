import router from "./config/router";
import { RouterProvider } from "react-router-dom";
import { StudentProvider } from "./contexts/StudentContext";

function App() {
  return (
    <StudentProvider>
      <RouterProvider router={router} />
    </StudentProvider>
  );
}

export default App;
