import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import { loader } from "./utils/loader";
import { Calendar } from "./pages/Calendar/Calendar";
import { Login } from "./pages/User/Login";
import { SignUpCustom } from "@/pages/User/SignUpCustom";
import { SignUp } from "@/pages/User/SignUp";
import { RandomDice } from "./pages/RandomDice/RandomDice";
import Mainpage from "./pages/Mainpage/Mainpage";
import ThemePage from "./pages/ThemePage/ThemePage";
import StarPage from "./pages/StarPage/StarPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import MyPage from "./pages/MyPage/MyPage";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import { SearchResultP } from "./pages/SearchPage/SearchResultP";
import { NotFound } from "./pages/NotFound/NotFount";
import { AgreePage } from "./pages/AgreePage/AgreePage";
import { Loading } from "./pages/Loading/Loading";
import SharePage from "@/pages/Share/Share";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/agree/:num",
        element: <AgreePage />,
      },
      {
        path: "/signup/custom",
        element: <SignUpCustom />,
      },
      {
        path: "",
        element: <Mainpage />,
        loader: loader,
      },
      {
        path: "/calendar",
        element: <Calendar />,
        loader: loader,
      },

      {
        path: "/theme/:theme_id",
        element: <ThemePage />,
        loader: loader,
      },
      {
        path: "/star/:id",
        element: <StarPage />,
        loader: loader,
      },
      {
        path: "/mypage",
        element: <MyPage />,
        loader: loader,
      },
      {
        path: "/randomDice",
        element: <RandomDice />,
        loader: loader,
      },
      {
        path: "/search",
        element: <SearchPage />,
        loader: loader,
      },
      {
        path: "/subcategory/:section/:subCategory",
        element: <SubCategoryPage />,
        loader: loader,
      },
      {
        path: "/share/:starid",
        element: <SharePage />,
        loader: loader,
      },
      {
        path: "/search/data/:data",
        element: <SearchResultP />,
      },
      {
        path: "/loading",
        element: <Loading />,
      },
      {
        path: "/error",
        element: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
