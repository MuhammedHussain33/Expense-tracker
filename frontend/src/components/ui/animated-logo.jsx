import { useState, useEffect } from 'react'

const AnimatedLogo = ({ size = 'md', showText = true, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-sm', icon: 'text-xl' },
    md: { container: 'w-12 h-12', text: 'text-lg', icon: 'text-3xl' },
    lg: { container: 'w-16 h-16', text: 'text-xl', icon: 'text-4xl' },
    xl: { container: 'w-24 h-24', text: 'text-2xl', icon: 'text-6xl' }
  }

  const currentSize = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${currentSize.container} relative flex items-center justify-center cursor-pointer group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl animate-pulse-slow group-hover:animate-spin-slow"></div>
        
        <div className="absolute inset-0.5 bg-white rounded-2xl"></div>
        
        <div className={`relative ${currentSize.icon} font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-bounce-subtle group-hover:scale-110 transition-transform duration-300`}>
          ₹
        </div>
        
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
            Expense Tracker
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Smart Finance Manager
          </span>
        </div>
      )}

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .group:hover .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default AnimatedLogo
