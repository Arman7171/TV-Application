import { useEffect, useRef, useState, useMemo } from "react";
import type { IFeatured } from "../utils/types";
import { motion, AnimatePresence } from "framer-motion";
import { useMovieContext } from "../context/movieContext";
import FeaturedInfo from "../components/FeaturedInfo";
import TrendingNow from "../components/TrendingNow";
import data from "../../public/data.json";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Home = () => {
  const { id } = useMovieContext();
  const [featuredData, setFeaturedData] = useState<IFeatured>(data.Featured);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [mediaSrc, setMediaSrc] = useState(
    `/assets/${data.Featured.CoverImage}`
  );
  const [mediaKey, setMediaKey] = useState("initial");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMounted = useRef(false);
  const skipVideoOnce = useRef(false);

  const sortedTrendingData = useMemo(() => {
    return [...data.TendingNow]
      .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
      .slice(0, 50);
  }, []);

  const initialTrendingNowData = useMemo(() => {
    if (id) {
      const activeItem = sortedTrendingData.find((item) => item.Id === id);
      const rest = sortedTrendingData.filter((item) => item.Id !== id);
      return activeItem ? [activeItem, ...rest] : sortedTrendingData;
    }
    return sortedTrendingData;
    // ✅ No [id] dependency here — this runs only on first render
  }, []);

  const handlePlay = () => {
    const matchedItem = id
      ? data.TendingNow.find((item) => item.Id === id)
      : null;
    if (matchedItem?.VideoUrl) {
      setMediaType("video");
      setMediaSrc(matchedItem.VideoUrl);
      setMediaKey(`video-${featuredData.Id}-manual`);
    }
  };

  useEffect(() => {
    if (!hasMounted.current) {
      skipVideoOnce.current = Boolean(id);
      hasMounted.current = true;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    const matchedItem = id
      ? data.TendingNow.find((item) => item.Id === id)
      : null;

    if (matchedItem) {
      setFeaturedData(matchedItem);
      const coverImage = `/assets/${matchedItem.CoverImage}`;
      setMediaType("image");
      setMediaSrc(coverImage);
      setMediaKey(`image-${matchedItem.Id}`);

      if (!skipVideoOnce.current && matchedItem.VideoUrl) {
        timerRef.current = setTimeout(() => {
          setMediaType("video");
          setMediaSrc(matchedItem.VideoUrl);
          setMediaKey(`video-${matchedItem.Id}`);
        }, 2000);
      }

      skipVideoOnce.current = false;
    } else {
      setFeaturedData(data.Featured);
      setMediaType("image");
      setMediaSrc(`/assets/${data.Featured.CoverImage}`);
      setMediaKey("featured");
    }
  }, [id]);

  return (
    <div className="text-white relative h-[100vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {mediaType === "image" ? (
          <motion.img
            key={mediaKey}
            src={mediaSrc}
            alt="Cover"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="absolute right-0 top-0 min-h-[600px] object-contain w-full h-[75%]"
          />
        ) : mediaSrc.includes("youtube.com") ||
          mediaSrc.includes("youtu.be") ? (
          <motion.iframe
            key={mediaKey}
            src={
              mediaSrc.replace("watch?v=", "embed/") +
              "?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="absolute top-0 min-h-[600px] w-full h-full max-h-[100px]"
          />
        ) : (
          <motion.video
            key={mediaKey}
            src={mediaSrc}
            autoPlay
            muted
            loop
            playsInline
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="absolute top-0 min-h-[600px] object-cover w-full h-full"
          />
        )}
      </AnimatePresence>
      <FeaturedInfo data={featuredData} handlePlay={handlePlay} />
      <div className="absolute bottom-[10px]">
        <TrendingNow data={initialTrendingNowData} />
      </div>
    </div>
  );
};

export default Home;
