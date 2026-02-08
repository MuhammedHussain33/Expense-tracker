import { useEffect } from 'react'

export const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000) // Auto-dismiss after 5s
    return () => clearTimeout(timer)
  }, [onClose])
  
  const bgColor = type === 'success' ? 'bg-green-100 border-green-500 text-green-800' 
                : type === 'warning' ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                : 'bg-blue-100 border-blue-500 text-blue-800'
  
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg border-l-4 ${bgColor} shadow-lg animate-slide-in-right z-50 max-w-md`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm whitespace-pre-line">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 font-bold text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast
