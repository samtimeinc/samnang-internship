import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronPrevious from "./ChevronPrevious.jsx";
import ChevronNext from "./ChevronNext.jsx";


function SimpleSlider({itemsArray, renderFunction}) {
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
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
        {itemsArray?.length > 0 && renderFunction}
      </Slider>

      <ChevronNext onClick={() => sliderRef.current?.slickNext()} />
    </div>
  );
}

export default SimpleSlider;
