import React, { useState, useEffect } from "react";
import { Navbar } from "../commonComponents";
import Sidebar from "../commonComponents/sidebar/Sidebar";
import Footer from "../commonComponents/footer/Footer";
import FormModal from "../commonComponents/formModal/FormModal";
import SubscribeModal from "../commonComponents/subscribeModal/SubscribeModal";
import { Toaster } from "react-hot-toast";
import ContactModal from "../commonComponents/contactModal/ContactModal";
import { useNavigate } from "react-router-dom";
import {
  getBlogBycategory,
  getBlogsLocations,
} from "../redux/slices/blog.slice";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isContactModal, setIsContactModalOpen] = useState(false);
  const [metaTags, setMetaTags] = useState(["defaultTag1", "defaultTag2"]); // Default meta tags
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSubscribeModal = () => setIsSubscribeModalOpen(true);
  const closeSubscribeModal = () => setIsSubscribeModalOpen(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const navigateToMusic = () => navigate("/music");
  const navigateToInfluasity = () => navigate("/Influensity");
  const navigateToPeeks = () => navigate("/peeks");
  const navigateToHome = () => navigate("/");
  const navigateToNews = (id) =>
    navigate(`/blogs-list/${id}`, { replace: true });

  const getBlogsByCategory = () => {
    dispatch(getBlogBycategory({ payload: "" }));
  };

  const getLocations = () => {
    dispatch(getBlogsLocations({ payload: "" }));
  };

  useEffect(() => {
    getLocations();
    getBlogsByCategory();
    // Example: Update metaTags based on some condition
    setMetaTags(["updatedTag1", "updatedTag2"]);
    console.log("meta", metaTags);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="tags" content={metaTags.join(", ")} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'tags': "${metaTags.join(", ")}"
              });
            `,
          }}
        />
      </Helmet>
      <div className="relative">
        <Toaster position="top-center" reverseOrder={false} />
        <FormModal isOpen={isModalOpen} onClose={closeModal} />
        <SubscribeModal
          isOpen={isSubscribeModalOpen}
          onClose={closeSubscribeModal}
        />
        <ContactModal isOpen={isContactModal} onClose={closeContactModal} />
        <div className="px-[51px] sm:px-[30px] xs:px-[20px]">
          <Navbar
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            openModal={openModal}
            openSubscribeModal={openSubscribeModal}
            openContactModal={openContactModal}
            navigateToMusic={navigateToMusic}
            navigateToInfluasity={navigateToInfluasity}
            navigateToHome={navigateToHome}
            navigateToPeeks={navigateToPeeks}
            navigateToNews={navigateToNews}
          />
        </div>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          openModal={openModal}
          openSubscribeModal={openSubscribeModal}
          openContactModal={openContactModal}
          navigateToMusic={navigateToMusic}
          navigateToInfluasity={navigateToInfluasity}
          navigateToHome={navigateToHome}
          navigateToNews={navigateToNews}
          navigateToPeeks={navigateToPeeks}
        />
        <div className="px-[51px] sm:px-[30px] xs:px-[20px]">{children}</div>
        <Footer />
      </div>
    </>
  );
}
