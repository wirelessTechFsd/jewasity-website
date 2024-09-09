import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBlogsByLocations,
  getBlogsListByCategory,
  getBlogsListByTags,
} from "../redux/slices/blog.slice";
import Loader from "../commonComponents/loader/Loader";
import { Card } from "../commonComponents";
import Image from "../commonComponents/image/Image";
import SEO from "../commonComponents/SEO";

export default function BlogByCategory() {
  let { category, tags, location } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogsList, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update the page title based on category, tags, or location
    if (category) {
      document.title = `${category} - Blogs`; // Set the title
    } else if (tags) {
      document.title = `${tags} - Blogs`; // Set the title
    } else if (location) {
      document.title = `${location} - Blogs`; // Set the title
    } else {
      document.title = "Blogs"; // Default title
    }

    // Push meta tags to dataLayer
    const metaTags = [category, tags, location].filter(Boolean); // Collect non-null values

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        tags: metaTags.join(", "),
      });
      console.log("Pushed metaTags to dataLayer: ", metaTags);
    }

    // Set meta tag in the head dynamically
    const metaTag = document.createElement("meta");
    metaTag.name = "tags";
    metaTag.content = metaTags.length > 0 ? metaTags.join(", ") : "";
    document.head.appendChild(metaTag);

    // Fetch data based on category, tags, or location
    if (location) {
      dispatch(
        getBlogsByLocations({
          payload: {
            name: location,
          },
          callback: (data) => {
            console.log("location blogs", data);
          },
        })
      );
    } else if (category) {
      dispatch(
        getBlogsListByCategory({
          payload: category,
          callback: (data) => {
            if (data?.status === 200) {
              // Handle response
            }
          },
        })
      );
    } else {
      dispatch(
        getBlogsListByTags({
          payload: tags,
          callback: (data) => {
            if (data?.status === 200) {
              // Handle response
            }
          },
        })
      );
    }

    // Clean up the meta tag when component unmounts
    return () => {
      document.head.removeChild(metaTag);
    };
  }, [category, tags, location, dispatch]);

  const navigateToDetails = (redirectLink) => {
    navigate(`/blog/${redirectLink}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-12">
        <Loader color="#FF3C00" height={40} width={40} />
      </div>
    );
  }

  return (
    <div>
      {/* <SEO title={category || tags || location} /> */}
      <div className="mt-12">
        <div className="flex items-center gap-[14px] mb-[33px]">
          <Image
            src="/icons/orangeCircle.svg"
            height={20}
            width={20}
            alt="icon"
          />
          <p className="text-[35px] font-regular">
            {category || tags || location}
          </p>
        </div>

        {blogsList?.length ? (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-x-[24px]">
            {blogsList?.map((item, i) => (
              <Card
                title={item?.title}
                date={item?.createdAt}
                breaking={item?.breaking}
                imgSrc={item?.image}
                key={i}
                cardWidth={"w-[100%] min-h-[350px] relative cursor-pointer"}
                imgStyle={"h-[235px]"}
                onClick={() => navigateToDetails(item?.redirectLink)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[18px] w-full">No Blogs Found</p>
        )}
      </div>
    </div>
  );
}
