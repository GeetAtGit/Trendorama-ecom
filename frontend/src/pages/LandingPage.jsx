export default function LandingPage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Trendorama</h1>
        <p className="text-lg md:text-2xl mb-6">Your one-stop shop for trendy fashion and accessories.</p>
        <a
          href="/shop"
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p>Get your products delivered in record time.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p>Your transactions are safe with our trusted gateways.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Top Quality</h3>
            <p>Only the best and latest trends curated for you.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-indigo-600 text-white py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
        <p className="mb-6">Sign up now and get 10% off on your first order.</p>
        <a
          href="/auth"
          className="bg-white text-indigo-700 px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          Register Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Trendora. All rights reserved.</p>
      </footer>
    </div>
  );
}
