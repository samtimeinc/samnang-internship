import React from "react";
import "../../css/SimpleSlider.css";
import { ChevronRight } from "lucide-react";

const ChevronNext = ({ onClick }) => {
  return (
    <button className="slider-btn chevron-next" onClick={onClick}>
      <ChevronRight size={28} className="chevron" />
    </button>
  );
};

export default ChevronNext;
