import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import { router } from "./navigation/navigation";
import { Navigate, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getToken, getWebsiteMode } from "./redux/slices/token.slice";
import { v4 as uuidv4 } from "uuid";
import AnimatedLoader from "./commonComponents/animatedLoader/AnimatedLoader";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // const [location, setLocation] = useState({ city: "", country: "" });

  // Detect if the platform is iOS
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // useEffect(() => {
  //   fetch("https://ipinfo.io/json?token=613e0ef6b6bbf7")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       mixpanel.track("Page View", {
  //         page: window.location.pathname,
  //         city: data.city,
  //         region: data.region,
  //         country: data.country,
  //       });
  //     });
  // }, []);

  useEffect(() => {
    dispatch(getWebsiteMode());
    localStorage.setItem("sessionId", uuidv4());
    if (!localStorage.getItem("u-enypt-token")) {
      dispatch(
        getToken({
          payload: {},
          callback: (data) => {
            // if (data) {
            //   setLoading(false);
            // }
          },
        })
      );
    }
  }, []);

  const sessonId = localStorage.getItem("sessionId");
  return (
    <div>
      {/* <SEO /> */}
      {!isIOS && (loading || !sessonId) ? ( // Conditionally render the loader if not on iOS
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedLoader setLoading={setLoading} />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
