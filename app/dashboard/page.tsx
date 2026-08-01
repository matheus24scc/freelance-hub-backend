import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { usersAPI } from '@/lib/api';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    gigs: 0,
    orders: 0,
    messages: 0,
    earnings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats based on user role
    const fetchStats = async () => {
      try {
        if (user?.role === 'FREELANCER') {
          // Fetch freelancer stats
          const [gigsRes, ordersRes, messagesRes] = await Promise.all([
            usersAPI.getById(user.id),
            usersAPI.getById(user.id), // In a real app, these would be specific endpoints
            usersAPI.getById(user.id)
          ]);
          
          // Mock data for demo - in real app, these would come from specific endpoints
          setStats({
            gigs: 5,
            orders: 3,
            messages: 12,
            earnings: 1250
          });
        } else {
          // Fetch client stats
          setStats({
            gigs: 0,
            orders: 3,
            messages: 8,
            earnings: 0
          });
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        // Set default values on error
        setStats({
          gigs: user?.role === 'FREELANCER' ? 5 : 0,
          orders: 3,
          messages: user?.role === 'FREELANCER' ? 12 : 8,
          earnings: user?.role === 'FREELANCER' ? 1250 : 0
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (!user) {
    return <p className="text-center py-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              FreelanceHub
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-gray-600">
              Welcome back, {user.name}!
            </span>
            <button
              onClick={() => {
                // In a real app, we'd call logout from auth store
                // For now, just clear localStorage and redirect
                localStorage.removeItem('access_token');
                window.location.href = '/';
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="mt-2 text-gray-600">
              Here's your dashboard overview
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Gigs/Services */}
            <Link
              href={user.role === 'FREELANCER' ? '/gigs/my' : '#'}
              className="group block bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center p-6">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  {/* Icon would go here */}
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-5h.01M9 16h.01M9 11h.01M12 11h.01M12 16h.01M12 21h.01M16 16h.01M16 21h.01"></path>
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-800">
                    {user.role === 'FREELANCER' ? 'My Gigs' : 'Services'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
                    {user.role === 'FREELANCER' ? 'Services you offer' : 'Browse available services'}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">
                    {stats.gigs}
                  </span>
                </div>
              </div>
            </Link>

            {/* Orders/Projects */}
            <Link
              href={user.role === 'FREELANCER' ? '/orders/incoming' : '/orders/my'}
              className="group block bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center p-6">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  {/* Icon would go here */}
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a.5.5 0 000 1h1.5a.5.5 0 000-1H12zm3 3a.5.5 0 01-.5.5h-1a.5.5 0 010-1H15a.5.5 0 01.5.5zm-2-4a.5.5 0 00-.5.5v1a.5.5 0 001 0v-1zm0 2a.5.5 0 01-.5.5h-1a.5.5 0 010-1H11a.5.5 0 01.5.5zM4 11a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-800">
                    {user.role === 'FREELANCER' ? 'Incoming Orders' : 'My Orders'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
                    {user.role === 'FREELANCER' ? 'Orders from clients' : 'Orders you placed'}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">
                    {stats.orders}
                  </span>
                </div>
              </div>
            </Link>

            {/* Messages */}
            <Link
              href="/messages"
              className="group block bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center p-6">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  {/* Icon would go here */}
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-800">
                    Messages
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
                    {user.role === 'FREELANCER' ? 'Messages from clients' : 'Messages from freelancers'}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">
                    {stats.messages}
                  </span>
                </div>
              </div>
            </Link>

            {/* Earnings/Payments */}
            <Link
              href={user.role === 'FREELANCER' ? '/earnings' : '#'}
              className="group block bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center p-6">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  {/* Icon would go here */}
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2h-5a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-800">
                    {user.role === 'FREELANCER' ? 'Earnings' : 'Payments'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
                    {user.role === 'FREELANCER' ? 'Money you earned' : 'Payments made'}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">
                    ${stats.earnings}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                Recent Activity
                <span className="ml-2 px-2 py-1 bg-gray-100 text-xs rounded-full">
                  {user.role === 'FREELANCER' ? 'Freelancer' : 'Client'}
                </span>
              </h2>
            </div>
            <div className="space-y-4 px-6 py-4">
              {/* Activity items would go here - for demo, showing static items */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div className="flex-1 col-span-2">
                  <h3 className="font-medium text-gray-900">New message from John Doe</h3>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 100-4 2 2 0 000 4zm-9 3a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zm-5 5a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </div>
                <div className="flex-1 col-span-2">
                  <h3 className="font-medium text-gray-900">Order #1234 completed</h3>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="flex-1 col-span-2">
                  <h3 className="font-medium text-gray-900">New gig created: Logo Design</h3>
                  <p className="text-sm text-gray-500">Today at 9:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
