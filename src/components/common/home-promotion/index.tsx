"use client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { useSidebar } from "@/context/useSideber";
import { usePromoVideosSliderQuery } from "@/redux/api/landing/promotionApi";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCardSkeleton } from "@/components/reuseable";
import { VideoCard } from "@/components/reuseable/video-card";

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  // rtl: true,
  responsive: [
    {
      breakpoint: 1536, // xl
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1280, // lg
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024, // md
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 640, // sm
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
  ],
};

export default function HomePromotion() {
  const { isExpanded } = useSidebar();
  const { data: promoVideos, isLoading: proLoading } =
    usePromoVideosSliderQuery({ per_page: 20 });
  return (
    <div
      className={`${
        isExpanded ? "w-[calc(100vw-325px)] " : "w-[calc(100vw-150px)]"
      }`}
    >
      {proLoading ? (
        <div className="home gap-6">
          <SkeletonCount count={4}>
            <VideoCardSkeleton />
          </SkeletonCount>
        </div>
      ) : (
        <Slider {...settings}>
          {promoVideos?.map((video: any) => (
            <VideoCard className="lg:mx-2" key={video.id} item={video} />
          ))}
        </Slider>
      )}
      <style jsx global>{`
        .slick-prev,
        .slick-next {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
