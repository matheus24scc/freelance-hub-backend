import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex space-x-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              FreelanceHub
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/gigs" className="text-gray-600 hover:text-gray-900">
                Gigs
              </Link>
              <Link href="/orders" className="text-gray-600 hover:text-gray-900">
                Orders
              </Link>
              <Link href="/messages" className="text-gray-600 hover:text-gray-900">
                Messages
              </Link>
            </nav>
          </div>
          <div className="flex space-x-4 items-center">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Login
                </Link>
                <Link href="/register" className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-2">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700">Hello, {user?.name}</span>
                <button onClick={logout} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          &copy; {new Date().getFullYear()} FreelanceHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
