export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin ${className}`}></div>
  )
}

export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4">
        <Spinner size="xl" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  )
}

export const LoadingCard = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg p-12 shadow-xl flex flex-col items-center gap-6">
        <div className="relative">
          <Spinner size="xl" className="border-indigo-600 border-t-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-indigo-100 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 mb-2">{message}</p>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spinner
