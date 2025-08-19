import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const AdvertisementHighlights = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertisements = [], isLoading } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-ads");
      return res.data;
    },
  });
  console.log(advertisements);
  if (isLoading) return <p className="w-full mx-auto">Loading....</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-12 md:mt-16 lg:mt-20"
    >
      <h2 className="md:[30px] text-[24px] lg:text-[36px] text-gray-800 font-semibold text-center mb-4 md:mb-6 lg:mb-8">
        Featured Vendor Ads
      </h2>
      <hr className="border border-dashed"/>
      {advertisements.length === 0 ? (
        <p className="text-center text-xl text-gray-900 my-10">
          No approved advertisements found.
        </p>
      ) : (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {advertisements.map((ad) => (
            <SwiperSlide key={ad._id}>
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center px-4 py-2">
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    {ad.title}
                  </h3>
                  <p className="text-gray-900 mb-1 font-medium">
                    vendorName : {ad.vendorName}
                  </p>

                  <p className="text-gray-900 mb-2">{ad.description}</p>
                </div>
                {ad.image && (
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="h-[390px] w-full object-cover rounded-xl"
                  />
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </motion.section>
  );
};

export default AdvertisementHighlights;
