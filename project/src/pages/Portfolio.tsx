import React from 'react';
import { useParams } from 'react-router-dom';

export default function Portfolio() {
  const { username, slug } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {username}'s Portfolio
        </h1>
        
        {/* Portfolio view placeholder - will be implemented later */}
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">Portfolio: {slug}</p>
        </div>
      </div>
    </div>
  );
}