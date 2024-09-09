import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../modules/Layout";
import Home from "../modules/Home";
import Details from "../modules/Blog";
import Music from "../modules/Music";
import Lock from "../modules/lock";
import BlogByCategory from "../modules/BlogByCategory";
import Permissions from "../modules/Permissions";
import WriteForUs from "../modules/WriteForUs";
import TermAndConditions from "../modules/TermAndConditions";
import PrivacyPolicy from "../modules/PrivacyPolicy";
import Peeks from "../modules/Peeks";
import MaintenanceMode from "../modules/MaintainanceMode";
import NotFound from "../modules/NotFound";
import AdvertiseWithUs from "../modules/AdvertiseWithUs";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Influasity from "../modules/Influasity";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Lock />,
  //   errorElement: <NotFound />,
  // },
  {
    path: "/",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/peeks",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <Peeks />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/music",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <Music />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/Influensity",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <Influasity />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/blog/:redirect",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <Details />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/blogs-list/:category",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <BlogByCategory />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/tag-blogs-list/:tags",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <BlogByCategory />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/location-blogs-list/:location",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <BlogByCategory />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/permissions",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <Permissions />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/write-for-us",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <WriteForUs />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/terms-and-conditions",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <TermAndConditions />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },

  {
    path: "/privacy",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <PrivacyPolicy />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/advertise-with-us",
    element: (
      <PrivateRoute metaTags={["tag1", "tag2", "tag3"]}>
        <Layout>
          <AdvertiseWithUs />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/maintenance-mode",
    element: (
      <PublicRoute>
        <MaintenanceMode />
      </PublicRoute>
    ),
    errorElement: <NotFound />,
  },
]);
