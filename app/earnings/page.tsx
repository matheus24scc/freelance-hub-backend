import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';

export default function EarningsPage() {
  const { user } = useAuthStore();
  const [earnings, setEarnings] = useState({
    total: 0,
    pending: 0,
    cleared: 0,
    thisMonth: 0,
    lastMonth: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // In a real app, this would fetch from the API
    // For demo, we'll use mock data
    const mockEarnings = {
      total: 1250,
      pending: 250,
      cleared: 1000,
      thisMonth: 450,
      lastMonth: 300
    };
    
    const mockTransactions = [
      {
        id: 1,
        date: '2024-01-20',
        description: 'Logo Design for Startup',
        amount: 500,
        status: 'cleared' as const,
        client: 'TechStartup Inc.'
      },
      {
        id: 2,
        date: '2024-01-18',
        description: 'Website Redesign - Milestone 1',
        amount: 750,
        status: 'pending' as const,
        client: 'WebSolutions LLC'
      },
      {
        id: 3,
        date: '2024-01-15',
        description: 'Social Media Campaign Setup',
        amount: 200,
        status: 'cleared' as const,
        client: 'MarketingPros Agency'
      },
      {
        id: 4,
        date: '2024-01-10',
        description: 'Logo Design - Revision',
        amount: 100,
        status: 'cleared' as const,
        client: 'DesignCo'
      },
      {
        id: 5,
        date: '2024-01-05',
        description: 'Business Card Design',
        amount: 150,
        status: 'cleared' as const,
        client: 'LocalBiz'
      }
    ];
    
    setEarnings(mockEarnings);
    setRecentTransactions(mockTransactions);
    setLoading(false);
  }, [user]);

  if (!user) {
    return <div className="flex h-[70vh] items-center justify-center">Please log in to view your earnings</div>;
  }

  if (user.role !== 'FREELANCER') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
            <Link href="/" className="text-xl font-bold text-gray-800">
              FreelanceHub
            </Link>
            <Link href="/dashboard" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Back to Dashboard
            </Link>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-gray-500 py-12">This page is only available for freelancers</p>
        </div>
      </div>
    );
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
              href="/earnings" 
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Earnings</h1>
            <p className="text-gray-600">
              Track your income from completed projects
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Earnings */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Total Earnings</h3>
                    <p className="text-sm text-gray-500">All time</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${earnings.total}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cleared Funds */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Available to Withdraw</h3>
                    <p className="text-sm text-gray-500">Cleared funds</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${earnings.cleared}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pending Payments */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Pending</h3>
                    <p className="text-sm text-gray-500">Awaiting clearance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">${earnings.pending}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* This Month */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">This Month</h3>
                    <p className="text-sm text-gray-500">Monthly earnings</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${earnings.thisMonth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                Recent Transactions
                <span className="ml-2 px-2 py-1 bg-gray-100 text-xs rounded-full">
                  {recentTransactions.length} transactions
                </span>
              </h2>
            </div>
            <div className="space-y-4 px-6 py-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full border-4 border-b-blue-600 w-8 h-8"></div>
                  <p className="mt-2 text-gray-600">Loading transactions...</p>
                </div>
              ) : recentTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transactions yet</p>
                </div>
              ) : (
                <>
                  {recentTransactions.map(tx => (
                    <div key={tx.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200">
                          {/* Icon based on status */}
                          {tx.status === 'cleared' ? (
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h6a2 2 0 012 2v11a2 2 0 01-2 2h-5m-5 4H6a2 2 0 01-2-2V9a2 2 0 012-2h5"></path>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-gray-900">{tx.description}</h3>
                            <p className="text-sm text-gray-500">{tx.date}</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {tx.client} • {tx.status === 'cleared' ? 'Completed' : 'Pending'}
                          </p>
                        </div>
                        <div className="text-right space-x-2">
                          <span className={`font-medium text-lg ${
                            tx.status === 'cleared' ? 'text-green-600' : 'text-yellow-600'
                          }`}
                          >
                            ${tx.amount}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            tx.status === 'cleared' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                          >
                            {tx.status === 'cleared' ? 'Cleared' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
