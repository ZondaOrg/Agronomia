import { RouterProvider } from "react-router";
import { routes } from "./core/routes/create-routes";

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
