import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { maintenanceMode } = useSelector((state) => state.token);

  // Define or generate metaTags directly in PrivateRoute
  const [metaTags, setMetaTags] = useState(["defaultTag1", "defaultTag2"]);

  useEffect(() => {
    // Example: Logic to update or add metaTags
    const additionalTags = ["page-specific-tag"];
    setMetaTags((prevTags) => [...prevTags, ...additionalTags]);

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        tags: metaTags.join(", "),
      });
      console.log("Pushed metaTags to dataLayer: ", metaTags);
    }
  }, [metaTags]);

  if (maintenanceMode) {
    return <Navigate to="/maintenance-mode" />;
  }

  return (
    <>
      <head>
        <meta
          name="tags"
          content={metaTags.length > 0 ? metaTags.join(", ") : ""}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              dataLayer.push({
                'tags': "${metaTags.length > 0 ? metaTags.join(", ") : ""}"
              });
            `,
          }}
        />
      </head>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K22XJ4XP"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {children}
    </>
  );
};

export default PrivateRoute;
