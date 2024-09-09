// const { SitemapStream, streamToPromise } = require("sitemap");
// const { createWriteStream } = require("fs");
// const { Readable } = require("stream");

// // Define your routes here
// const links = [
//   { url: "/", changefreq: "daily", priority: 1.0 },
//   { url: "/home", changefreq: "daily", priority: 0.9 },
//   { url: "/music", changefreq: "daily", priority: 0.8 },
//   { url: "/blog/:blogId", changefreq: "daily", priority: 0.7 },
//   { url: "/blogs-list/:category", changefreq: "daily", priority: 0.6 },
//   { url: "/tag-blogs-list/:tags", changefreq: "daily", priority: 0.6 },
//   { url: "/permissions", changefreq: "weekly", priority: 0.5 },
//   { url: "/write-for-us", changefreq: "weekly", priority: 0.5 },
//   { url: "/terms-and-conditions", changefreq: "weekly", priority: 0.4 },
//   { url: "/privacy-policy", changefreq: "weekly", priority: 0.4 },
// ];

// // Create a stream to write the sitemap
// const stream = new SitemapStream({ hostname: "https://jewasity.com" });

// // Write the sitemap to a file
// streamToPromise(Readable.from(links).pipe(stream))
//   .then((data) => {
//     createWriteStream("./public/sitemap.xml").write(data);
//     console.log("Sitemap generated successfully.");
//   })
//   .catch((error) => {
//     console.error("Error generating sitemap:", error);
//   });

// const { SitemapStream, streamToPromise } = require("sitemap");
// const { createWriteStream } = require("fs");
// const { Readable } = require("stream");
// const axios = require("axios");

// // Base hostname
// const hostname = "https://jewasity.com";

// // Define your static routes here
// const staticLinks = [
//   { url: "/", changefreq: "daily", priority: 1.0 },
//   { url: "/home", changefreq: "daily", priority: 0.9 },
//   { url: "/music", changefreq: "daily", priority: 0.8 },
//   { url: "/permissions", changefreq: "weekly", priority: 0.5 },
//   { url: "/write-for-us", changefreq: "weekly", priority: 0.5 },
//   { url: "/terms-and-conditions", changefreq: "weekly", priority: 0.4 },
//   { url: "/privacy-policy", changefreq: "weekly", priority: 0.4 },
// ];

// // Function to fetch dynamic slugs
// const fetchDynamicLinks = async () => {
//   try {
//     const [blogResponse] = await Promise.all([
//       axios.get("https://jewasity-prod-server.jewasity.com/v1/blog/get-blogs", {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjhmZjBlNmUyNDY4MTk3ODNkMDIzNmEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjQ4NzY5ODMsImV4cCI6MTcyNTA0OTc4M30.C-yorsBF9EqBxRR2xwn8kCE61KCghwOCr6__A5JqPAQ`,
//         },
//       }), // Replace with actual API endpoint
//       // axios.get("https://api.yoursite.com/categories"), // Replace with actual API endpoint
//       // axios.get("https://api.yoursite.com/tags"), // Replace with actual API endpoint
//     ]);

//     const blogLinks = blogResponse.data.map((blog) => ({
//       url: `/blog/${blog.id}`,
//       changefreq: "daily",
//       priority: 0.7,
//     }));

//     return [...blogLinks];
//   } catch (error) {
//     console.error("Error fetching dynamic links:", error);
//     return [];
//   }
// };

// // Generate the sitemap
// const generateSitemap = async () => {
//   try {
//     const dynamicLinks = await fetchDynamicLinks();
//     const links = [...staticLinks, ...dynamicLinks];

//     const stream = new SitemapStream({ hostname });

//     const data = await streamToPromise(Readable.from(links).pipe(stream));
//     createWriteStream("./public/sitemap.xml").write(data);

//     console.log("Sitemap generated successfully.");
//   } catch (error) {
//     console.error("Error generating sitemap:", error);
//   }
// };

// // Run the sitemap generation
// generateSitemap();

const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { Readable } = require("stream");
const axios = require("axios");

// Base hostname
const hostname = "https://jewasity.com";

// Define your static routes here
const staticLinks = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/", changefreq: "daily", priority: 0.9 },
  { url: "/music", changefreq: "daily", priority: 0.8 },
  { url: "/permissions", changefreq: "weekly", priority: 0.5 },
  { url: "/write-for-us", changefreq: "weekly", priority: 0.5 },
  { url: "/terms-and-conditions", changefreq: "weekly", priority: 0.4 },
  { url: "/privacy-policy", changefreq: "weekly", priority: 0.4 },
];

// Function to fetch dynamic slugs
const fetchDynamicLinks = async () => {
  try {
    const blogResponse = await axios.get(
      "https://jewasity-prod-server.jewasity.com/v1/blog/get-blogs",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjhmZjBlNmUyNDY4MTk3ODNkMDIzNmEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjQ4NzY5ODMsImV4cCI6MTcyNTA0OTc4M30.C-yorsBF9EqBxRR2xwn8kCE61KCghwOCr6__A5JqPAQ`,
        },
      }
    );


    // Adjust the following line based on the actual response structure
    const blogLinks =
      blogResponse.data?.data?.map((blog) => ({
        url: `/blog/${blog.redirectLink}`,
        changefreq: "daily",
        priority: 0.7,
      })) || [];
    const blogCatregory =
      blogResponse.data?.data?.map((blog) => ({
        url: `/blog/${blog.category}`,
        changefreq: "daily",
        priority: 0.7,
      })) || [];

    return [...blogLinks, ...blogCatregory];
  } catch (error) {
    console.error("Error fetching dynamic links:", error);
    return [];
  }
};

// Generate the sitemap
const generateSitemap = async () => {
  try {
    const dynamicLinks = await fetchDynamicLinks();
    const links = [...staticLinks, ...dynamicLinks];

    const stream = new SitemapStream({ hostname });

    const data = await streamToPromise(Readable.from(links).pipe(stream));
    createWriteStream("./public/sitemap.xml").write(data);

    console.log("Sitemap generated successfully.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
};

// Run the sitemap generation
generateSitemap();
