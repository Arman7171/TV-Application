import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { ITendingNowItems } from "../utils/types";
import { useMovieContext } from "../context/movieContext";

interface PropsType {
  data: ITendingNowItems[];
}

const TrendingNow: React.FC<PropsType> = ({ data }) => {
  const { updateId } = useMovieContext();
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 8,
      spacing: 10,
    },
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider 2xl:max-w-[1900px] max-w-[1500px] mx-auto">
      {data.map((item, index) => (
        <div
          key={index}
          className="keen-slider__slide flex flex-col items-center justify-center rounded-lg 2xl:!min-w-[200px] !min-w-[150px] 2xl:!max-w-[200px] !max-w-[150px] 2xl:h-[296px] h-[200px] overflow-hidden">
          <img
            src={`/assets/${item.CoverImage}`}
            alt={item.Title || `Slide ${index}`}
            className="w-full h-full 2xl:max-w-[200px] max-w-[150px] object-cover rounded-lg cursor-pointer"
            onClick={() => updateId(item.Id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TrendingNow;
