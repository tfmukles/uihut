"use client";

import Review from "@/partials/Review";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TReview } from "./Review";

const ReviewsSlider = ({ reviewsData }: { reviewsData: TReview }) => {
  return (
    <>
      {reviewsData.enable && (
        <section className="my-[72px] mt-[80px] lg:mt-32">
          <div className="container">
            <Swiper
              className="review-slider"
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              spaceBetween={20}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
            >
              {reviewsData.review_items.map((item: any, index: number) => (
                <SwiperSlide className="!h-auto" key={index}>
                  <Review review_items={item} isLineClamp={true} key={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
};

export default ReviewsSlider;
