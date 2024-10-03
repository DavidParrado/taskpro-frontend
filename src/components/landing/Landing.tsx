'use client';
import Image from 'next/image';
import Link from 'next/link';

export const LandingPage = () => {
  return (
    <div className="bg-gray-100 text-gray-700">
      {/* Hero Section */}
      <section className="bg-indigo-500 text-white py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Manage Your Projects Efficiently</h1>
          <p className="text-lg md:text-xl mb-8">
            Stay organized, track progress, and collaborate with your team in one place.
          </p>
          <button className="bg-white text-indigo-500 hover:bg-indigo-700 hover:text-white rounded-lg px-6 py-3 font-semibold transition">
            Comenzar
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us?</h2>
            <p className="text-gray-600">Our platform helps you stay on top of your tasks and projects with ease.</p>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Image src="/icons/easy-to-use.png" width={400} height={400} alt="Easy to use" />
                <h3 className="text-xl font-semibold mt-6">Easy to Use</h3>
                <p className="text-gray-600 mt-4">Our platform is intuitive and easy to navigate for all users.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Image src="/icons/collaboration.png" width={400} height={400} alt="Collaboration" />
                <h3 className="text-xl font-semibold mt-6">Seamless Collaboration</h3>
                <p className="text-gray-600 mt-4">Work together with your team in real-time.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Image src="/icons/analytics.png" width={400} height={400} alt="Analytics" />
                <h3 className="text-xl font-semibold mt-6">Advanced Analytics</h3>
                <p className="text-gray-600 mt-4">Gain insights and track progress with detailed analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-500 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-3xl font-bold">Ready to start managing your tasks?</h2>
          <p className="text-lg mt-4 mb-8">Join us today and experience the power of efficient project management.</p>
          <Link href={'/auth/register'} className="bg-white text-indigo-500 hover:bg-indigo-700 hover:text-white rounded-lg px-6 py-3 font-semibold transition">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};
