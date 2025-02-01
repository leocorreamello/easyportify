import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Rocket, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">EasyPortify</div>
        <div className="space-x-4">
          <Link to="/auth" className="text-gray-600 hover:text-gray-900">Login</Link>
          <Link 
            to="/auth?signup=true" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Professional Portfolio in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Stand out from the crowd with a beautiful, customizable portfolio that showcases your work effectively.
          </p>
          <Link
            to="/auth?signup=true"
            className="inline-block bg-indigo-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Create Your Portfolio for Free
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Palette className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Beautiful Design</h3>
            <p className="text-gray-600">
              Choose from professionally designed templates that make your work shine.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
            <p className="text-gray-600">
              Our intuitive editor makes creating your portfolio a breeze.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Professional Network</h3>
            <p className="text-gray-600">
              Connect with other professionals and showcase your work to the world.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}