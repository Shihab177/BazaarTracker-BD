import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // v9+ style
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

// Sample testimonials
const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "User",
    avatar: "https://i.postimg.cc/hPqR4VnW/young-beautiful-girl-posing-black-leather-jacket-park-1153-8104-1.avif",
    review:
      "BazaarTracker BD helps me stay updated with daily prices. Very accurate and easy to use!",
  },
  {
    name: "Rafiq Ahmed",
    role: "Vendor",
    avatar: "https://i.postimg.cc/sXjDtGnJ/image-136442-1689402556.jpg",
    review:
      "Submitting daily prices and ads is super simple. Feedback from admin is very helpful!",
  },
  {
    name: "Sabbir Khan",
    role: "Admin",
    avatar: "https://i.postimg.cc/gcSG8H4j/man-5583035-960-720.jpg",
    review:
      "Managing users and products is so smooth. Love the responsive charts and dashboard features.",
  },
  {
    name: "Farhana Sultana",
    role: "user",
    avatar: "https://i.postimg.cc/4xr34Xzw/bangladesh-cfi-2.jpg",
    review:
      "The price trends charts are very useful. I can compare past prices easily before buying.",
  },
];

const Testimonials = () => {
  return (
    <section className="mt-12 md:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="md:text-[30px] text-[24px] lg:text-[36px] text-gray-800 font-semibold text-center mb-4 md:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What People Say About{" "}
          <span className="text-[#00B795]">BazaarTracker BD</span>
        </motion.h2>
        <p className="text-gray-700  mb-4 md:mb-6 lg:mb-8">
          Hear from our users, vendors, and admins about their experience.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]} // v9+ compatible
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="bg-white rounded-md border border-gray-200 shadow-md p-6 flex flex-col items-center text-center h-[250px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="h-16 w-16 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
              <span className="text-sm text-gray-500 mb-4">{t.role}</span>
              <p className="text-gray-600 text-sm">{t.review}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
