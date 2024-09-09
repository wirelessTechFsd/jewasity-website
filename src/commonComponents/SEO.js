import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  image,
  redirectLink,
  createdAt,
  authorName,
}) {
  console.log("🚀 ~ title:", title);
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <meta name="title" content={ "jawwwwww"} />
      <meta
        name="description"
        content={
          description ||
          "From heartwarming stories and recent music releases to current events and breaking news."
        }
      />

      {/* Open Graph / Facebook / WhatsApp / Telegram */}
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`https://jewasity.com/blog/${redirectLink}`}
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={
          description ||
          "From heartwarming stories and recent music releases to current events and breaking news."
        }
      />
      <meta
        property="og:image"
        content={
          image ||
          "https://jewasity-prod.s3.amazonaws.com/668db575-34fe-494f-b8f8-b335ec012e0c.png"
        }
      />
      <meta
        property="og:image:secure_url"
        content={
          image ||
          "https://jewasity-prod.s3.amazonaws.com/668db575-34fe-494f-b8f8-b335ec012e0c.png"
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Jewasity-alt" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="Jewasity" />
      <meta property="og:locale" content="en_US" />

      {/* Article Meta Tags for LinkedIn */}
      <meta property="article:published_time" content={createdAt} />
      <meta
        property="article:author"
        content={authorName || "Jewasity Staff"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`https://jewasity.com/blog/${redirectLink}`}
      />
      <meta
        property="blog-title"
        name="twitter:title"
        content={title || "Jewasity"}
      />
      <meta
        property="blog-description"
        name="twitter:description"
        content={
          description ||
          "From heartwarming stories and recent music releases to current events and breaking news."
        }
      />
      <meta
        name="twitter:image"
        property="blog-image"
        content={
          image ||
          "https://jewasity-prod.s3.amazonaws.com/668db575-34fe-494f-b8f8-b335ec012e0c.png"
        }
      />
      <title>{title || "Jewasity"}</title>
    </Helmet>
  );
}
