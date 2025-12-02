import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ChevronPrevious from "./ChevronPrevious.jsx";
import ChevronNext from "./ChevronNext.jsx";
import Skeleton from "../UI/Skeleton.jsx";

function SimpleSlider({ hotCollections }) {
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function renderHotCollections() {
    return hotCollections.map((element) => (
      <div key={element.id} className="collection">
        <>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details/${element.nftId}`}>
                {hotCollections?.length > 0 ? (
                  <img
                    src={element.nftImage}
                    className="lazy img-fluid"
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="100%" />
                )}
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                {hotCollections?.length > 0 ? (
                  <img
                    className="lazy pp-coll"
                    src={element.authorImage}
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="60px" borderRadius="50%" />
                )}
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                {hotCollections?.length > 0 ? (
                  <h4>{element.title}</h4>
                ) : (
                  <Skeleton width="45%" height="24px" borderRadius="5px" />
                )}
              </Link>
              {hotCollections?.length > 0 ? (
                <span>ERC-{element.code}</span>
              ) : (
                <Skeleton width="25%" height="24px" borderRadius="5px" />
              )}
            </div>
          </div>
        </>
      </div>
    ));
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate slidesToShow based on window width
  const getSlidesToShow = () => {
    if (windowWidth <= 576) return 1;
    if (windowWidth <= 980) return 2;
    if (windowWidth <= 1200) return 3;
    return 4;
  };

  // Get breakpoint key for forcing re-render when crossing breakpoints
  const getBreakpointKey = () => {
    if (windowWidth <= 576) return "mobile";
    if (windowWidth <= 980) return "tablet";
    if (windowWidth <= 1200) return "tablet-lg";
    return "desktop";
  };

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: getSlidesToShow(),
      slidesToScroll: 1,
      adaptiveHeight: false,
    }),
    [windowWidth]
  );

  return (
    <div className="slider-container" style={{ position: "relative" }}>
      <ChevronPrevious onClick={() => sliderRef.current?.slickPrev()} />

      <Slider key={getBreakpointKey()} ref={sliderRef} {...settings}>
        {hotCollections?.length > 0 && renderHotCollections()}
      </Slider>

      <ChevronNext onClick={() => sliderRef.current?.slickNext()} />
    </div>
  );
}

export default SimpleSlider;
