import Link from 'next/link';
import { useState } from 'react';

export default function GigsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('latest');

  // Mock gigs data - in a real app, this would come from an API
  const gigs = [
    {
      id: 1,
      title: 'Logo Design for Startups',
      description: 'Professional logo design services for startups and small businesses. I will create a unique, memorable logo that represents your brand identity.',
      price: 150,
      freelancer: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviews: 24
      },
      tags: ['Logo Design', 'Branding', 'Illustration'],
      deliveryTime: 7
    },
    {
      id: 2,
      title: 'Full Stack Web Application',
      description: 'I will build a full-stack web application using React, Node.js, and MongoDB. Includes responsive design, user authentication, and deployment.',
      price: 1500,
      freelancer: {
        name: 'Samira Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviews: 18
      },
      tags: ['Web Development', 'React', 'Node.js', 'MongoDB'],
      deliveryTime: 21
    },
    {
      id: 3,
      title: 'Social Media Marketing Campaign',
      description: 'Complete social media marketing strategy and execution for your brand. Includes content creation, scheduling, and analytics.',
      price: 800,
      freelancer: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a48e?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        reviews: 32
      },
      tags: ['Marketing', 'Social Media', 'Content Creation'],
      deliveryTime: 14
    },
    {
      id: 4,
      title: 'Mobile App UI/UX Design',
      description: 'Beautiful and intuitive user interface design for mobile applications. Includes wireframes, mockups, and prototyping.',
      price: 750,
      freelancer: {
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviews: 27
      },
      tags: ['UI/UX Design', 'Mobile App', 'Figma', 'Adobe XD'],
      deliveryTime: 14
    },
    {
      id: 5,
      title: 'SEO Optimization & Audit',
      description: 'Comprehensive SEO audit and optimization service to improve your website search rankings and organic traffic.',
      price: 300,
      freelancer: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        reviews: 19
      },
      tags: ['SEO', 'Marketing', 'Analytics'],
      deliveryTime: 10
    },
    {
      id: 6,
      title: 'Video Editing & Motion Graphics',
      description: 'Professional video editing services with motion graphics, color correction, and sound design for YouTube, social media, and presentations.',
      price: 200,
      freelancer: {
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviews: 22
      },
      tags: ['Video Editing', 'Motion Graphics', 'After Effects', 'Premiere Pro'],
      deliveryTime: 7
    }
  ];

  // Filter and sort gigs
  const filteredGigs = gigs
    .filter(gig => 
      search === '' || 
      gig.title.toLowerCase().includes(search.toLowerCase()) ||
      gig.description.toLowerCase().includes(search.toLowerCase()) ||
      gig.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )
    .filter(gig => 
      category === 'all' || 
      gig.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating') return b.freelancer.rating - a.freelancer.rating;
      // default: latest (already in order)
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              FreelanceHub
            </Link>
          </div>
          <div className="hidden md:block">
            <Link 
              href="/gigs/create" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sell a Service
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Find Services
            </h1>
            
            <div className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="writing">Writing & Translation</option>
                  <option value="video">Video & Animation</option>
                </select>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gids Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.length > 0 ? (
              filteredGigs.map(gig => (
                <Link
                  key={gig.id}
                  href={`/gigs/${gig.id}`}
                  className="group block bg-white rounded-lg shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                        <img
                          src={gig.freelancer.avatar}
                          alt={gig.freelancer.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-gray-800">
                          {gig.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                          By {gig.freelancer.name}
                        </p>
                        <div className="mt-2 flex items-center space-x-2 text-sm">
                          <span className="text-yellow-400">
                            {[...Array(5)].map((_, i) => 
                              i < gig.freelancer.rating ? '★' : '☆'
                            ).join('')}
                          </span>
                          <span className="ml-1 text-gray-500">
                            ({gig.freelancer.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-gray-600 line-clamp-3">
                      {gig.description}
                    </p>
                    
                    <div className="mb-4 flex flex-wrap gap-2">
                      {gig.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        ${gig.price}
                      </span>
                      <span className="text-gray-500">
                        {gig.deliveryTime} days delivery
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No gigs found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
