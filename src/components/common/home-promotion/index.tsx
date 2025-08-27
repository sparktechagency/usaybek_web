"use client";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCard } from "@/components/reuseable/video-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { usePromoVideosSliderQuery } from "@/redux/api/landing/promotionApi";

export default function HomePromotion() {
  const { data: promoVideos, isLoading: proLoading } =
    usePromoVideosSliderQuery({});
  return (
    <div>
      {proLoading ? (
        <div className="home gap-6">
          <SkeletonCount count={4}>
            <VideoCardSkeleton />
          </SkeletonCount>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {promoVideos?.map((testimonial: any) => (
              <CarouselItem
                key={testimonial.id}
                className="md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <VideoCard key={testimonial.id} item={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
