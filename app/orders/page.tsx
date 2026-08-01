import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');

  // Mock orders data - in a real app, this would come from API
  const mockOrders = [
    {
      id: 1,
      title: 'Logo Design for Startup',
      description: 'Need a modern logo for my new tech startup',
      budget: 500,
      status: 'COMPLETED',
      client: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
      },
      freelancer: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'
      },
      createdAt: '2024-01-15',
      deliveredAt: '2024-01-22'
    },
    {
      id: 2,
      title: 'Website Redesign',
      description: 'Redesign company website with modern UI/UX',
      budget: 2000,
      status: 'IN_PROGRESS',
      client: {
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a48e?w=80&h=80&fit=crop&crop=face'
      },
      freelancer: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
      },
      createdAt: '2024-01-20',
      dueDate: '2024-02-05'
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      description: '3-month social media marketing campaign',
      budget: 1500,
      status: 'PENDING',
      client: {
        name: 'Sarah Williams',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face'
      },
      freelancer: null,
      createdAt: '2024-01-22'
    },
    {
      id: 4,
      title: 'Mobile App UI Design',
      description: 'Design UI for iOS and Android app',
      budget: 1200,
      status: 'CANCELLED',
      client: {
        name: 'Michael Brown',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face'
      },
      freelancer: {
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'
      },
      createdAt: '2024-01-10',
      cancelledAt: '2024-01-12'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, [tab]);

  const filteredOrders = orders.filter(order => {
    if (tab === 'all') return true;
    if (tab === 'active') return order.status === 'PENDING' || order.status === 'IN_PROGRESS';
    if (tab === 'completed') return order.status === 'COMPLETED';
    if (tab === 'cancelled') return order.status === 'CANCELLED';
    return true;
  });

  // Determine if user is client or freelancer for display purposes
  const isClient = user?.role === 'CLIENT';
  const isFreelancer = user?.role === 'FREELANCER';

  if (!user) {
    return <p className="text-center py-8">Please log in to view your orders</p>;
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
          <div className="flex items-center space-x-3">
            <Link 
              href="/orders" 
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              ← Back to Dashboard
            </Link>
            {isFreelancer && (
              <Link
                href="/orders/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                New Order Request
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {isClient ? 'My Orders' : 'Incoming Orders'}
            </h1>
            <p className="text-gray-600">
              {isClient ? 
                'Orders you have placed with freelancers' : 
                'Orders clients have sent to you'}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex space-x-2">
            <button
              onClick={() => setTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                tab === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTab('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                tab === 'active' 
                  : 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setTab('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                tab === 'completed' 
                  : 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setTab('cancelled')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                tab === 'cancelled' 
                  : 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full border-4 border-b-blue-600 w-12 h-12"></div>
                <p className="mt-4 text-gray-600">Loading orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No orders found</p>
                {tab !== 'all' && (
                  <button
                    onClick={() => setTab('all')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Show All Orders
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="block bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Status Indicator */}
                        <div className="flex-shrink-0 mt-0.5">
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              order.status === 'PENDING' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : order.status === 'IN_PROGRESS'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'COMPLETED'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{order.title}</h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {order.description}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">Budget:</span>
                              <span className="font-medium">$${order.budget}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">Posted:</span>
                              <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            {order.dueDate && (
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-500">Due:</span>
                                <span className="font-medium">{new Date(order.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* User Avatars */}
                        <div className="flex-shrink-0 flex space-x-2">
                          {isClient && order.freelancer ? (
                            <>
                              <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                                <img
                                  src={order.freelancer.avatar}
                                  alt={order.freelancer.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                                <img
                                  src={order.client.avatar}
                                  alt={order.client.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </>
                          ) : isFreelancer && order.client ? (
                            <>
                              <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                                <img
                                  src={order.client.avatar}
                                  alt={order.client.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                                <img
                                  src={order.freelancer?.avatar || '/default-avatar.png'}
                                  alt={order.freelancer?.name || 'Freelancer'}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                              <img
                                src={order.client.avatar}
                                alt={order.client.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
