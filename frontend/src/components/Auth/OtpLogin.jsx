import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Spinner } from '../ui/spinner'

const OtpLogin = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const { signInWithOtp, verifyOtp } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await signInWithOtp(email)
      setOtpSent(true)
      setMessage('✅ OTP sent! Check your email inbox.')
      setResendCooldown(60) // 60 second cooldown
    } catch (err) {
      const errorMessage = err.message || 'Failed to send OTP'
      
      if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate limit')) {
        setError('⏰ Too many attempts! Please wait a few minutes and try again. This is a security measure to protect your account.')
      } else if (errorMessage.toLowerCase().includes('email')) {
        setError('❌ Invalid email address. Please check and try again.')
      } else {
        setError(`❌ ${errorMessage}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await verifyOtp(email, otp)
      setMessage('✅ Login successful!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } catch (err) {
      const errorMessage = err.message || 'Invalid OTP'
      
      if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate limit')) {
        setError('⏰ Too many verification attempts! Please wait a few minutes before trying again.')
      } else if (errorMessage.toLowerCase().includes('expired')) {
        setError('⏰ Code expired (60s limit). Click "Resend OTP" to get a new code.')
      } else if (errorMessage.toLowerCase().includes('invalid')) {
        setError('❌ Invalid code. Please check and try again, or click "Resend OTP".')
      } else {
        setError(`❌ ${errorMessage}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setOtp('')
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await signInWithOtp(email)
      setMessage('✅ New OTP sent to your email!')
      setResendCooldown(60) // 60 second cooldown
    } catch (err) {
      const errorMessage = err.message || 'Failed to resend OTP'
      
      if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate limit')) {
        setError('⏰ Rate limit reached! You\'ve requested too many codes. Please wait 5-10 minutes and try again.')
      } else {
        setError(`❌ ${errorMessage}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-shift">
      {/* Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4 animate-bounce-slow">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            OTP Login
          </h1>
          <p className="text-white/90 text-lg drop-shadow">
            Secure passwordless authentication
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/95 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-scale-in">
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {!otpSent ? '📧 Enter Your Email' : '🔢 Verify OTP'}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {!otpSent
                ? 'We will send you a 6-digit code to login'
                : 'Enter the code sent to your email'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
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
                      Sending OTP...
                    </span>
                  ) : (
                    '📨 Send OTP Code'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="space-y-2 animate-slide-in-left">
                  <Label htmlFor="email-display" className="text-gray-700 font-medium">
                    📧 Email
                  </Label>
                  <Input
                    id="email-display"
                    type="email"
                    value={email}
                    disabled
                    className="h-12 bg-gray-100 border-2 border-gray-200"
                  />
                </div>

                <div className="space-y-2 animate-slide-in-right">
                  <Label htmlFor="otp" className="text-gray-700 font-medium">
                    🔢 OTP Code (8 digits)
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="12345678"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    required
                    maxLength="8"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 text-center text-2xl tracking-widest font-bold"
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
                  disabled={loading || otp.length !== 8}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner size="sm" className="border-white border-t-transparent" />
                      Verifying...
                    </span>
                  ) : (
                    '✅ Verify & Login'
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResendOtp}
                    disabled={loading || resendCooldown > 0}
                    className="flex-1 h-10 text-sm"
                  >
                    {resendCooldown > 0 ? `🔄 Wait ${resendCooldown}s` : '🔄 Resend OTP'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOtpSent(false)
                      setOtp('')
                      setError('')
                      setMessage('')
                      setResendCooldown(0)
                    }}
                    className="flex-1 h-10 text-sm"
                  >
                    ← Change Email
                  </Button>
                </div>
              </form>
            )}

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
                onClick={() => navigate('/login')}
                className="text-base font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-300 hover:underline underline-offset-4 decoration-2"
              >
                🔑 Login with Password
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-white/80 text-sm drop-shadow">
          <p>🔐 Secure • No Password Required • Fast</p>
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
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

export default OtpLogin
