import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { messagesAPI } from '@/lib/api';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  const loadMessages = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // In a real app, this would fetch conversations
      // For demo, we'll use mock data
      const mockConversations = [
        {
          id: 1,
          user: {
            id: 2,
            name: 'Alex Johnson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          },
          lastMessage: {
            content: 'Hey! I love your portfolio. Do you have availability for a new project next month?',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            read: true,
          },
          unreadCount: 0,
        },
        {
          id: 2,
          user: {
            id: 3,
            name: 'Samira Chen',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          },
          lastMessage: {
            content': 'Thanks for the great work on the logo! The client loved it.',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            read: false,
          },
          unreadCount: 3,
        },
        {
          id: 3,
          user: {
            id: 4,
            name: 'Marcus Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a48e?w=100&h=100&fit=crop&crop=face',
          },
          lastMessage: {
            content': 'Can we schedule a call to discuss the project timeline?',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            read: true,
          },
          unreadCount: 0,
        },
      ];
      
      setConversations(mockConversations);
    } catch (err) {
      console.error('Failed to load conversations:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send via API
    console.log('Sending message:', newMessage);
    setNewMessage('');
    
    // Optimistically update the conversation
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: {
                content: newMessage,
                createdAt: new Date(),
                read: false,
              },
            }
          : conv
      )
    );
  };

  // Initialize
  React.useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user]);

  if (!user) {
    return <div className="flex h-[70vh] items-center justify-center">Please log in to view messages</div>;
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
          <div className="hidden md:block">
            <Link 
              href="/messages/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              New Message
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedConversation ? (
            <div className="flex h-full">
              {/* Conversation List */}
              <div className="w-64 border-r border-gray-200">
                <div className="px-4 pt-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Messages</h2>
                  <div className="space-y-2">
                    {conversations.map(conv => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          selectedConversation?.id === conv.id
                            ? 'bg-blue-50 text-blue-900 border-l-4 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={conv.user.avatar}
                              alt={conv.user.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{conv.user.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {conv.lastMessage.content}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <div className="flex-shrink-0 mt-0.5">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Conversation View */}
              <div className="flex-1 flex flex-col border-l border-gray-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={selectedConversation.user.avatar}
                        alt={selectedConversation.user.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedConversation.user.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.user.id === user.id ? 'You' : 'Freelancer'}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Active now
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Messages would go here - for demo, showing static messages */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={selectedConversation.user.avatar}
                        alt={selectedConversation.user.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                      <p className="text-sm text-gray-800">
                        Hi there! I saw your profile and was wondering if you're available for a new project.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-end space-x-3">
                    <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                      <p className="text-sm">
                        I'm available! What kind of project are you looking for?
                      </p>
                      <p className="text-xs mt-1 text-blue-100">Just now</p>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src="/default-avatar.png"
alt="Current user"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={selectedConversation.user.avatar}
                        alt={selectedConversation.user.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                      <p className="text-sm text-gray-800">
                        I need a logo design for my new startup. Do you have experience with modern, minimalist logos?
                      </p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-end space-x-4">
        <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
          <p className="text-sm">
            Yes, I specialize in modern, minimalist logo design. I've worked with several startups in the tech space.
          </p>
          <p className="text-xs mt-1 text-blue-100">45 minutes ago</p>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="/default-avatar.png"
            alt="Current user"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={selectedConversation.user.avatar}
            alt={selectedConversation.user.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
          <p className="text-sm text-gray-800">
            Great! I'll send over a brief. What's your typical timeline and pricing for a logo project?
          </p>
          <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
        </div>
      </div>
                </div>
                
                <div className="pt-4 pb-8">
                  <div className="border-t border-gray-200 pt-4">
                    <form onSubmit={e => {
                      e.preventDefault();
                      sendMessage();
                    }} className="flex space-x-3">
                      <textarea
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 min-h-[60px] resize-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                <p className="text-gray-600 mb-6">
                  Stay connected with clients and freelancers. Send messages to discuss projects, share files, and collaborate.
                </p>
              </div>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full border-4 border-b-blue-600 w-12 h-12"></div>
                  <p className="mt-4 text-gray-600">Loading messages...</p>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No messages yet</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Start a conversation by sending a message to a client or freelancer.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {conversations.map(conv => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`cursor-pointer p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200 ${
                        selectedConversation?.id === conv.id
                          ? 'bg-blue-50 text-blue-900 border-l-4 border-blue-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                          <img
                            src={conv.user.avatar}
                            alt={conv.user.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{conv.user.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {conv.lastMessage.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                            {conv.unreadCount > 0 && (
                              <span className="ml-3 px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
