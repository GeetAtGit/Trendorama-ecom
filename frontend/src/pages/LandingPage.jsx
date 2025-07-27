import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // ✅ Vite-compatible Swiper modules

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
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 px-6 text-center overflow-hidden">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Welcome to Trendorama
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-2xl mb-6"
        >
          Your one-stop shop for trendy fashion and accessories.
        </motion.p>
        <motion.a
          href="/shop"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100 transition"
        >
          Shop Now
        </motion.a>
      </section>

      
      {/* Flash Sale Section */}
      <section className="py-16 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <ZapIcon className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold">Flash Sale</h2>
            <ClockIcon className="w-6 h-6" />
          </div>
          <div className="flex justify-center space-x-4 mb-4 text-2xl font-mono">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{ 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 } }}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]} // ✅ This was missing
            loop={true} // optional
          >
            {flashProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg">
                  <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded-xl mb-2" />
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-lg font-bold">₹{p.price}</p>
                </div>
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
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg">
            <TruckIcon className="w-10 h-10 text-indigo-600 mb-2" />
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p>Get your products delivered in record time.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg">
            <ShieldCheckIcon className="w-10 h-10 text-indigo-600 mb-2" />
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p>Your transactions are safe with our trusted gateways.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg">
            <TagIcon className="w-10 h-10 text-indigo-600 mb-2" />
            <h3 className="text-xl font-bold mb-2">Top Quality</h3>
            <p>Only the best and latest trends curated for you.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-indigo-600 text-white py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
        <p className="mb-6">Sign up now and get 10% off on your first order.</p>
        <motion.a
          href="/auth"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition"
        >
          Register Now
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Trendorama. All rights reserved.</p>
      </footer>
    </div>
  );
}
