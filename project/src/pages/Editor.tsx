import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Editor() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Portfolio Editor</h1>
        
        {/* Editor placeholder - will be implemented in next step */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">Editor interface coming soon...</p>
        </div>
      </div>
    </div>
  );
}