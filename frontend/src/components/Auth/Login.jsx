import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Spinner } from '../ui/spinner'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (isLogin) {
        await signIn(email, password)
        setMessage('Login successful!')
        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate('/dashboard')
        }, 500)
      } else {
        await signUp(email, password)
        setMessage('Sign up successful! Please check your email to confirm your account.')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-shift"></div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4 animate-bounce-slow">
            <span className="text-4xl">💰</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Expense Tracker
          </h1>
          <p className="text-white/90 text-lg drop-shadow">
            Manage your finances with ease
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/95 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-scale-in">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isLogin ? '👋 Welcome Back' : '🚀 Get Started'}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
            {isLogin
                ? 'Login to continue tracking your expenses'
                : 'Create your account and start managing finances'}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 animate-slide-in-left">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  📧 Email Address
                </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                  className="h-12 border-2 border-gray-200 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
              />
            </div>
              <div className="space-y-2 animate-slide-in-right">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  🔒 Password
                </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                  className="h-12 border-2 border-gray-200 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
              />
            </div>

            {error && (
                <div className="text-sm text-red-700 bg-red-100 border-l-4 border-red-500 p-4 rounded-lg animate-shake shadow-sm">
                  <span className="font-medium">❌ Error:</span> {error}
              </div>
            )}

            {message && (
                <div className="text-sm text-green-700 bg-green-100 border-l-4 border-green-500 p-4 rounded-lg animate-fade-in shadow-sm">
                  <span className="font-medium">✅ Success:</span> {message}
              </div>
            )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner size="sm" className="border-white border-t-transparent" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {isLogin ? '🔓 Login Now' : '✨ Create Account'}
                  </span>
                )}
            </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setMessage('')
                }}
                  className="text-base font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-300 hover:underline underline-offset-4 decoration-2"
              >
                {isLogin
                    ? "Don't have an account? 🎯 Sign up now"
                    : 'Already have an account? 🔑 Login here'}
                </button>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/otp-login')}
                  className="text-base font-medium text-blue-600 hover:text-purple-600 transition-colors duration-300 hover:underline underline-offset-4 decoration-2 flex items-center justify-center gap-2"
                >
                  🔐 Login with OTP (Passwordless)
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

        <div className="mt-8 text-center text-white/80 text-sm drop-shadow">
          <p>Secure • Fast • Reliable</p>
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out 0.1s both;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Login
