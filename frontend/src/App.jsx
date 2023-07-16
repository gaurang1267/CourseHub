import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/Home";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import CoursesList from "./components/CoursesList";
import CourseDetail, {
  loader as CourseDetailLoader,
  action as DeleteEventAction,
} from "./pages/CourseDetail";
import { action as manipulateCourseAction } from "./components/CourseForm";
import NewCourse from "./pages/NewCourse";
import EditCourse from "./pages/EditCourse";
import NewVideo from "./pages/NewVideo";
import LoginPage, { action as LoginAction } from "./pages/LoginPage";
import SignupPage, { action as SignupAction } from "./pages/SignupPage";
import { action as logoutAction } from "./pages/Logout";
import {
  getAuthToken,
  checkAuthLoader,
  checkAdminLoader,
  checkArtistLoader,
} from "./Utils/Auth";
import ProfilePage, { loader as paidCoursesLoader } from "./pages/ProfilePage";
import Payment, { loader as paymentLoader } from "./pages/Payment";
import PlayVideo from "./pages/PlayVideo";
import ArtistPage, { action as ArtistRegisterAction } from "./pages/ArtistPage";
import ApprovalPage, { loader as ArtistLoader } from "./pages/ApprovalPage";
import TransactionsUser from "./components/TransactionsUser";
import TransactionsArtist from "./components/TransactionsArtist";
import TransactionsAdmin from "./components/TransactionsAdmin";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: getAuthToken,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "courses",
        element: <CoursesList />,
      },
      {
        path: "courses/new",
        element: <NewCourse />,
        action: manipulateCourseAction,
      },
      {
        path: "courses/:courseId",
        id: "course-detail",
        loader: CourseDetailLoader,

        children: [
          {
            index: true,
            element: <CourseDetail />,
            action: DeleteEventAction,
          },
          {
            path: "edit",
            element: <EditCourse />,
            action: manipulateCourseAction,
          },
          {
            path: "payment",
            element: <Payment />,
            loader: paymentLoader,
          },
          {
            path: "play-video/:videoId",
            element: <PlayVideo />,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "courses/:courseId/videos/new",
        element: <NewVideo />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: LoginAction,
      },
      {
        path: "signup",
        element: <SignupPage />,
        action: SignupAction,
      },
      {
        path: "artist-register",
        element: <ArtistPage />,
        action: ArtistRegisterAction,
      },
      {
        path: "admin-approval",
        element: <ApprovalPage />,
        loader: ArtistLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "/my-courses",
        element: <ProfilePage />,
        loader: paidCoursesLoader,
      },
      {
        path: "/user-transactions",
        element: <TransactionsUser />,
      },
      {
        path: "/artist-transactions",
        element: <TransactionsArtist />,
        loader: checkArtistLoader,
      },
      {
        path: "/admin-transactions",
        element: <TransactionsAdmin />,
        loader: checkAdminLoader,
      },
    ],
  },
]);

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
