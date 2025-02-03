import React from 'react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome, {user.fullName}</h1>
      <p className="text-xl text-gray-700">Email: {user.email}</p>
    </div>
  );
}
