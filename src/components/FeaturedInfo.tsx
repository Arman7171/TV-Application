import React from "react";
import type { IFeatured } from "../utils/types";
import { formatSecondsToHM } from "../utils/helpers";
import Button from "./Button";

interface PropsType {
  data: IFeatured;
  handlePlay: () => void;
}

const FeaturedInfo: React.FC<PropsType> = ({ data, handlePlay }) => {
  const {
    Category,
    TitleImage,
    ReleaseYear,
    MpaRating,
    Duration,
    Description,
  } = data;

  return (
    <div className="relative z-[9] bg-transparent 2xl:pt-[180px] pt-[100px]">
      <div className="text-[#858688] text-[24px] font-bold">{Category}</div>
      <img src={`/assets/${TitleImage}`} alt="TitleImage" />
      <div className="flex items-center gap-[26px] mt-[31px] text-[30px] font-normal">
        <div>{ReleaseYear}</div>
        <div>{MpaRating}</div>
        <div>{formatSecondsToHM(+Duration)}</div>
      </div>
      <div className="mt-[12px] text-[32px] font-normal">{Description}</div>
      <div className="flex items-center gap-[15px] mt-[25px]">
        <Button
          buttonText="Play"
          className="bg-white text-black"
          icon="/assets/icons/play.png"
          onClick={handlePlay}
        />
        <Button buttonText="More Info" className="bg-[#2727F5]" />
      </div>
    </div>
  );
};

export default FeaturedInfo;
