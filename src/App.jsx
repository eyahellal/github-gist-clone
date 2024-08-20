import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import Layout from "./screens/layout";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";
import AllGists from "./screens/all-gists";
import Starred from "./screens/starred";
import Forked from "./screens/forked";
import RequiresNotAuth from "./routes/require-not-auth";
import RequiresAuth from "./routes/require-auth";
import UserScreen, { userLoader } from "./screens/user-screen";
import Home from "./screens/home";
import AddGist from "./screens/addGist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // The layout component that wraps around the Home and its children
    children: [
      { path: "starred", element: <Starred /> },
      { path: "forked", element: <Forked /> },
      { path: "allGists", element: <AllGists /> },
    ],
  },
  {
    path: "/login",
    element: (
      <RequiresNotAuth>
        <LoginScreen />
      </RequiresNotAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <RequiresNotAuth>
        <RegisterScreen />
      </RequiresNotAuth>
    ),
  },
  {
    path: "/:userId",
    element: (
      <RequiresAuth>
        <UserScreen />
      </RequiresAuth>
    ),
    loader: userLoader,
  },
  {
    path: "/addGist",
    element: (
      <RequiresAuth>
        <AddGist />
      </RequiresAuth>
    ),
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
