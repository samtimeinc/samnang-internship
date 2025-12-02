import { ChevronLeft } from "lucide-react";
import React from "react";
import "../../css/SimpleSlider.css";

const ChevronPrevious = ({ onClick }) => {
  return (
    <button className="slider-btn chevron-previous" onClick={onClick}>
      <ChevronLeft size={28} className="chevron" />
    </button>
  );
};

export default ChevronPrevious;
