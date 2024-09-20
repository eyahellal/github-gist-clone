import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";
import AllGists from "./screens/all-gists";
import Starred from "./screens/starred";
import Forked from "./screens/forked";
import RequiresNotAuth from "./routes/require-not-auth";
import RequiresAuth from "./routes/require-auth";
import UserScreen from "./screens/user-screen";
import Home from "./screens/home";
import AddGist from "./screens/addGist";
import GistPage from "./screens/gist-page";
import Code, { loadGist } from "./screens/code";
import Stars from "./screens/stars";
import Forks from "./screens/forks";
import UserProfile from "./screens/user-profile";
import AllMyGists, { loadMyGists } from "./screens/all-my-gists";
import MyForked , {loadMyForks}from "./screens/myForked";
import EditGist from "./screens/edit-gist";
import AddCollaborator from "./components/collaborator-pop-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

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
  },
  {
    path: "/addGist",
    element: (
      <RequiresAuth>
        <AddGist />
      </RequiresAuth>
    ),
  },
  {
    path: "/gistPage/:userName/:gistName/:gistId",
    element: <GistPage />,
    children: [
      {
        path: "code",
        loader: loadGist,
        element: <Code />,
      },
      {
        path: ":stars/stars",
        element: <Stars />,
      },
      {
        path: ":forks/forks",
        element: <Forks />,
      },
    ],
  },
  {
    path: "/userProfile",
    element: (
      <RequiresAuth>
        <UserProfile />
      </RequiresAuth>
    ),
    children: [
      {
        loader: loadMyGists,
        path: "allmygists",
        element: <AllMyGists />,
      },
      {
        loader:loadMyForks,
        path: "myforked",
        element: <MyForked />,
      },
    ],
  },
  {
    path: "/editGist/:gistId",
    element: 
      
        <EditGist/>
    ,},


]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
