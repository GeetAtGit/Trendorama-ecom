import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // ✅ Vite-compatible Swiper modules
import { FiGift, FiTruck, FiRefreshCw, FiHeadphones } from "react-icons/fi";


import 'swiper/css';
import { TagIcon, TruckIcon, ShieldCheckIcon, ZapIcon, ClockIcon } from 'lucide-react';

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Flash sale ends in 6 hours
    const saleEnd = new Date();
    saleEnd.setHours(saleEnd.getHours() + 6);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = saleEnd - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sample flash sale products (replace with real data)
  const flashProducts = [
  { id: 1, name: 'Sunscreen SPF 50', image: '/images/sunscreen.jpg', price: 649 },
  { id: 2, name: 'Nail Polish Set', image: '/images/nail-polish.jpg', price: 399 },
  { id: 3, name: 'Herbal Shampoo', image: '/images/shampoo.jpg', price: 549 },
  { id: 4, name: 'Matte Lipstick', image: '/images/lipstick.jpg', price: 499 },
  { id: 5, name: 'Face Wash Gel', image: '/images/facewash.jpg', price: 299 },
  { id: 6, name: 'Hair Serum', image: '/images/hairserum.jpg', price: 599 },
  { id: 7, name: 'Compact Powder', image: '/images/compact.jpg', price: 349 },
  { id: 8, name: 'Eyeliner Pencil', image: '/images/eyeliner.jpg', price: 199 },
  { id: 9, name: 'Rose Water Toner', image: '/images/toner.jpg', price: 279 },
  { id: 10, name: 'Lip Balm', image: '/images/lipbalm.jpg', price: 149 },
  { id: 11, name: 'Perfume Mist', image: '/images/perfume.jpg', price: 899 },
  { id: 12, name: 'Aloe Vera Gel', image: '/images/aloevera.jpg', price: 359 },
];


  return (
    <div className="font-sans">
     {/* Hero Section */}
<section className="relative overflow-hidden  pt-12 pb-20 px-6 text-center text-gray-900 bg-[radial-gradient(circle_at_center,_#fef9c3_0%,_#f0fdf4_50%,_#ffffff_100%)]">
      
      {/* Floating Circles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-40 h-40 bg-pink-200 rounded-full absolute top-10 left-10 animate-bounce-slow opacity-30"></div>
        <div className="w-32 h-32 bg-green-200 rounded-full absolute bottom-20 right-16 animate-bounce-slower opacity-30"></div>
        <div className="w-24 h-24 bg-yellow-200 rounded-full absolute top-1/3 right-1/3 animate-bounce-slowest opacity-30"></div>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Shopping That Feels <span className="text-pink-500">Joyful</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-700 mb-8"
        >
          Trendy finds, happy vibes & a dash of sparkle. 
          <span className="font-semibold text-gray-900"> Your favorite fashion destination is here.</span>
        </motion.p>

        <motion.a
          href="/shop"
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-pink-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-pink-600 transition"
        >
          <FiGift className="text-xl" /> Shop & Smile
        </motion.a>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-gray-700">
          <div className="flex flex-col items-center">
            <FiTruck className="text-green-600 text-3xl mb-2" />
            <p className="text-sm font-medium">Free Shipping over ₹999</p>
          </div>
          <div className="flex flex-col items-center">
            <FiRefreshCw className="text-blue-600 text-3xl mb-2" />
            <p className="text-sm font-medium">7-Day Easy Returns</p>
          </div>
          <div className="flex flex-col items-center">
            <FiHeadphones className="text-purple-600 text-3xl mb-2" />
            <p className="text-sm font-medium">24/7 Customer Support</p>
          </div>
        </div>
      </motion.div>

      
    </section>


      {/* Flash Sale Section */}
<section className="py-20 px-6 text-center bg-[radial-gradient(circle_at_center,_#fef9c3_0%,_#f0fdf4_60%,_#ffffff_100%)] relative overflow-hidden">
  {/* Floating pastel shapes */}
  <div className="absolute w-32 h-32 bg-pink-200 rounded-full top-10 left-12 opacity-30 animate-bounce-slow"></div>
  <div className="absolute w-24 h-24 bg-green-200 rounded-full bottom-8 right-10 opacity-30 animate-bounce-slowest"></div>

  <div className="max-w-3xl mx-auto relative z-10">
    <div className="flex items-center justify-center space-x-2 mb-6">
      <ZapIcon className="w-10 h-10 text-yellow-500 animate-pulse" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Flash Sale</h2>
      <ClockIcon className="w-8 h-8 text-gray-700 animate-pulse" />
    </div>

    {/* Countdown Timer */}
    <div className="flex justify-center space-x-3 mb-6 text-3xl font-mono text-gray-800">
      <span className="bg-white px-3 py-1 rounded-lg shadow">{String(timeLeft.hours).padStart(2, '0')}</span>:
      <span className="bg-white px-3 py-1 rounded-lg shadow">{String(timeLeft.minutes).padStart(2, '0')}</span>:
      <span className="bg-white px-3 py-1 rounded-lg shadow">{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>

    {/* Products Slider */}
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{ 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 } }}
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
      loop={true}
    >
      {flashProducts.map((p) => (
        <SwiperSlide key={p.id}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-32 w-full object-cover rounded-xl mb-2"
            />
            <h3 className="font-semibold text-gray-800">{p.name}</h3>
            <p className="text-lg font-bold text-pink-600">₹{p.price}</p>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

</section>


      {/* Hot Offers Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 1500 }}
        modules={[Autoplay]} // ✅ Add this
      >
        {[1, 2, 3, 4, ].map((n) => (
          <SwiperSlide key={n}>
            <img
              src={`/images/sale${n}.jpg`}
              alt={`Sale Offer ${n}`}
              className="left-20 max-w-120 rounded-2xl shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Features Section */}
<section className="py-20 bg-[radial-gradient(circle_at_center,_#f0fdf4_0%,_#fef9c3_60%,_#ffffff_100%)] text-center">
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800"
  >
    Why <span className="text-pink-500">Shop With Us?</span>
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
    >
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 10 }}
        className="flex justify-center"
      >
        <TruckIcon className="w-14 h-14 text-green-500 mb-4" />
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Delivery</h3>
      <p className="text-gray-600">Lightning-speed shipping that brings your trends home sooner.</p>
    </motion.div>

    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
    >
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: -10 }}
        className="flex justify-center"
      >
        <ShieldCheckIcon className="w-14 h-14 text-purple-500 mb-4" />
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">Secure Payment</h3>
      <p className="text-gray-600">Your transactions are protected with industry-leading security.</p>
    </motion.div>

    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
    >
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 8 }}
        className="flex justify-center"
      >
        <TagIcon className="w-14 h-14 text-pink-500 mb-4" />
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">Top Quality</h3>
      <p className="text-gray-600">Handpicked trends and premium products curated just for you.</p>
    </motion.div>
  </div>
</section>


      {/* CTA Banner */}
<section className="relative py-20 px-6 text-center bg-[radial-gradient(circle_at_center,_#fef9c3_0%,_#f0fdf4_50%,_#ffffff_100%)] overflow-hidden">
  {/* Decorative floating shapes */}
  <div className="absolute w-32 h-32 bg-pink-200 rounded-full top-10 left-12 opacity-30 animate-bounce-slow"></div>
  <div className="absolute w-24 h-24 bg-green-200 rounded-full bottom-8 right-10 opacity-30 animate-bounce-slowest"></div>

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 max-w-2xl mx-auto"
  >
    <h2 className="text-4xl font-extrabold mb-3 text-gray-800">
      Don’t Miss The <span className="text-pink-500">Exclusive Deal!</span>
    </h2>
    <p className="text-lg text-gray-700 mb-6">
      Sign up today and get <span className="font-semibold">10% off</span> on your first order.
    </p>
    <motion.a
      href="/auth"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pink-600 transition"
    >
      Register Now
    </motion.a>
  </motion.div>

 
</section>


      {/* Footer */}
<footer className="bg-gray-900 text-gray-300 py-10">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} <span className="font-semibold">Trendorama</span>. All rights reserved.
    </p>
    <div className="flex gap-6 text-lg">
      <a href="/shop" className="hover:text-white transition">Shop</a>
      <a href="/about" className="hover:text-white transition">About</a>
      <a href="/support" className="hover:text-white transition">Support</a>
    </div>
  </div>
</footer>

    </div>
  );
}
