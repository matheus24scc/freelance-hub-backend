import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

export default function GigDetail() {
  const { id } = useParams<{ id: string }>();
  const gigId = parseInt(id);
  const { user } = useAuthStore();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this would fetch from API
  // For demo, we'll use mock data similar to the gigs page
  const mockGigs = [
    {
      id: 1,
      title: 'Logo Design for Startups',
      description: 'Professional logo design services for startups and small businesses. I will create a unique, memorable logo that represents your brand identity. Includes 3 initial concepts, unlimited revisions, and final files in all formats (AI, EPS, PNG, JPG, SVG).',
      price: 150,
      freelancer: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        reviews: 24,
        level: 'Top Rated'
      },
      tags: ['Logo Design', 'Branding', 'Illustration'],
      deliveryTime: 7,
      images: [
        'https://images.unsplash.com/photo-1581091844435-4ebbb6ae5f5e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581091540558-eb6b7b4b2a0a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581091227529-1630f7d56ca8?w=400&h=300&fit=crop'
      ],
      packages: [
        {
          name: 'Basic',
          price: 150,
          description: 'Logo concept + 2 revisions',
          deliveryTime: 7,
          features: ['1 initial concept', '2 rounds of revisions', 'High-resolution files', 'Source files']
        },
        {
          name: 'Standard',
          price: 250,
          description: '3 concepts + unlimited revisions',
          deliveryTime: 10,
          features: ['3 initial concepts', 'Unlimited revisions', 'High-resolution files', 'Source files', 'Brand guidelines']
        },
        {
          name: 'Premium',
          price: 400,
          description: 'Full brand identity package',
          deliveryTime: 16,
          features: ['3 initial concepts', 'Unlimited revisions', 'Full brand identity', 'Business card design', 'Social media kit', 'Source files']
        }
      ]
    },
    {
      id: 2,
      title: 'Full Stack Web Application',
      description: 'I will build a full-stack web application using React, Node.js, and MongoDB. Includes responsive design, user authentication, and deployment.',
      price: 1500,
      freelancer: {
        name: 'Samira Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        reviews: 18,
        level: 'Top Rated'
      },
      tags: ['Web Development', 'React', 'Node.js', 'MongoDB'],
      deliveryTime: 21,
      images: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
      ],
      packages: [
        {
          name: 'Basic',
          price: 800,
          description: 'Basic website with 3 pages',
          deliveryTime: 21,
          features: ['Home page', 'About page', 'Contact page', 'Responsive design']
        },
        {
          name: 'Standard',
          price: 1500,
          description: 'Full stack application with auth',
          deliveryTime: 35,
          features: ['User authentication', 'Dashboard', 'Database integration', 'REST API', 'Deployment']
        },
        {
          name: 'Premium',
          price: 2500,
          description: 'Enterprise solution with advanced features',
          deliveryTime: 50,
          features: ['Everything in Standard', 'Payment integration', 'Admin panel', 'Real-time features', 'Testing']
        }
      ]
    }
    // Add more gigs as needed
  ];

  // Find the gig by ID
  const currentGig = mockGigs.find(g => g.id === gigId);

  // Simulate API call
  const fetchGig = async () => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (currentGig) {
        setGig(currentGig);
      } else {
        // Gig not found
        setGig(null);
      }
    } catch (error) {
      console.error('Failed to fetch gig:', error);
    } finally {
      setLoading(false);
    }
  };

  // In a real app, we'd call the API here
  // For now, we'll just set the gig directly if it exists
  if (currentGig) {
    setGig(currentGig);
    setLoading(false);
  }

  if (loading) {
    return <div className="flex h-[70vh] items-center justify-center">Loading...</div>;
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
            <Link href="/" className="text-xl font-bold text-gray-800">
              FreelanceHub
            </Link>
            <Link href="/gigs" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Back to Gigs
            </Link>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-gray-500 py-12">Gig not found</p>
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
              href="/gigs" 
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              ← Back to Gigs
            </Link>
            {user && (
              <button
                onClick={() => {
                  // In a real app, this would initiate an order/purchase flow
                  alert('Would initiate purchase flow for this gig');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Buy Service
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Gallery / Images */}
          <div className="mb-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {gig.images.map((img, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={img}
                      alt={`${gig.title} screenshot ${index + 1}`}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gig Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{gig.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                <img
                  src={gig.freelancer.avatar}
                  alt={gig.freelancer.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="font-medium text-gray-900">{gig.freelancer.name}</h2>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-yellow-400">
                    {[...Array(5)].map((_, i) => 
                      i < gig.freelancer.rating ? '★' : '☆'
                    ).join('')}
                  </span>
                  <span className="ml-1 text-gray-500">
                    ({gig.freelancer.reviews} reviews)
                  </span>
                  {gig.freelancer.level && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      {gig.freelancer.level}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {gig.description}
            </p>
          </div>

          {/* Packages Section */}
          {gig.packages && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gig.packages.map(pkg => (
                  <div
                    key={pkg.name}
                    className={`border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300 ${
                      pkg.name === 'Standard' ? 'border-blue-500 shadow-lg' : ''
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    
                    <div className="mb-4 space-y-2">
                      <p className="flex items-center justify-between text-sm">
                        <span>Delivery time:</span>
                        <span className="font-medium">{pkg.deliveryTime} days</span>
                      </p>
                      <p className="flex items-center justify-between text-sm">
                        <span>Price:</span>
                        <span className="font-medium text-lg">${pkg.price}</span>
                      </p>
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-800 mb-2">Includes:</h4>
                      <ul className="space-y-1 text-sm text-gray-600 pl-5">
                        {pkg.features.map(feature => (
                          <li key={feature} className="flex items-start">
                            <span className="flex-shrink-0">•</span>
                            <span className="ml-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => {
                        // In a real app, this would proceed to checkout with selected package
                        alert(`Selected ${pkg.name} package for $${pkg.price}`);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Select Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {gig.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-50 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* FAQ / Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Details</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-700"><strong>Delivery Time:</strong> {gig.deliveryTime} days</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-700"><strong>Revisions:</strong> Unlimited (based on package)</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-gray-700"><strong>File Formats:</strong> AI, EPS, PNG, JPG, SVG</p>
              </div>
            </div>
          </div>

          {/* Reviews Section (placeholder) */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews ({gig.freelancer.reviews})</h2>
            <div className="space-y-4">
              {/* In a real app, these would come from an API */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">Alex R.</h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <span className="text-yellow-400">★★★★★</span>
                        <span className="ml-1 text-gray-500">5.0</span>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      "Amazing work! Alex delivered exactly what I was looking for and went above and beyond with the revisions. Highly recommend!"
                    </p>
                    <p className="text-xs text-gray-400 mt-2">2 weeks ago</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">Samira K.</h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <span className="text-yellow-400">★★★★☆</span>
                        <span className="ml-1 text-gray-500">4.5</span>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      "Great communication and fast delivery. The logo perfectly captures our brand essence."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">1 month ago</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                See all reviews
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
