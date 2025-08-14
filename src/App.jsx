import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Profile from "./pages/Profile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<SignUp />} />
        <Route path="/detail" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
