import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Editor() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const { templateId } = useParams();

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
      <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portfolio Editor</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#skills" className="hover:underline">Skills</a></li>
              <li><a href="#projects" className="hover:underline">Projects</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <textarea
            className="w-full h-32 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write a brief introduction about yourself..."
          ></textarea>
        </section>

        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <textarea
            className="w-full h-32 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="List your skills..."
          ></textarea>
        </section>

        <section id="projects" className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <textarea
            className="w-full h-32 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your projects..."
          ></textarea>
        </section>
      </main>
    </div>
  );
}