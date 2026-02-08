import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Spinner } from '../components/ui/spinner'
import AnimatedLogo from '../components/ui/animated-logo'

const Settings = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match!')
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters!')
      setLoading(false)
      return
    }

    try {
      const { supabase } = await import('../lib/supabase')
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      })

      if (error) throw error

      setMessage('✅ Password updated successfully!')
      setPasswordData({ newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔐' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'about', name: 'About', icon: 'ℹ️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <AnimatedLogo size="md" showText={true} />
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              🏠 Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate('/transactions')}>
              💰 Transactions
            </Button>
            <Button variant="outline" onClick={() => navigate('/categories')}>
              📂 Categories
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              🚪 Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">⚙️ Settings</h2>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 md:col-span-9">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>👤 Profile Information</CardTitle>
                  <CardDescription>View and manage your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {user?.email?.split('@')[0] || 'User'}
                      </h3>
                      <p className="text-gray-600">{user?.email}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          ✅ Active
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          🎯 Premium User
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Account Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-600">Email Address</Label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">User ID</Label>
                        <p className="font-mono text-sm">{user?.id?.slice(0, 8)}...</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Account Created</Label>
                        <p className="font-medium">
                          {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Last Sign In</Label>
                        <p className="font-medium">
                          {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>🔐 Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordReset} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        required
                        className="h-12"
                      />
                      <p className="text-sm text-gray-500">Minimum 6 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        className="h-12"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                        <p className="font-medium">❌ {error}</p>
                      </div>
                    )}

                    {message && (
                      <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                        <p className="font-medium">{message}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Spinner size="sm" className="text-white" />
                          Updating...
                        </span>
                      ) : (
                        '🔐 Update Password'
                      )}
                    </Button>
                  </form>

                  <div className="mt-8 pt-8 border-t">
                    <h4 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account with OTP-based login.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/otp-login')}
                      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                      🔐 Try OTP Login
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>⚙️ Preferences</CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">Currency</h4>
                        <p className="text-sm text-gray-600">Display amounts in Indian Rupee</p>
                      </div>
                      <span className="text-2xl font-bold text-indigo-600">₹</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">Date Format</h4>
                        <p className="text-sm text-gray-600">MM/DD/YYYY</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates about your expenses</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">Expense Alerts</h4>
                        <p className="text-sm text-gray-600">Get notified when expenses exceed ₹10,000</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'about' && (
              <Card>
                <CardHeader>
                  <CardTitle>ℹ️ About Expense Tracker</CardTitle>
                  <CardDescription>Learn more about this application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center py-8">
                    <AnimatedLogo size="xl" showText={true} />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Expense Tracker v1.0
                    </h3>
                    <p className="text-gray-600">Smart Finance Manager</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6">
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-indigo-600">100+</div>
                      <div className="text-sm text-gray-600">Transactions Tracked</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">₹</div>
                      <div className="text-sm text-gray-600">Indian Currency</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-pink-600">📊</div>
                      <div className="text-sm text-gray-600">PDF Reports</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">🔐</div>
                      <div className="text-sm text-gray-600">OTP Auth</div>
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-3">
                    <h4 className="font-semibold text-gray-900">🚀 Features</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Track income and expenses
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Category management
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        PDF report generation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        OTP-based authentication
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Mustache-powered messages
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Indian Rupee support
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Beautiful animations
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-6 space-y-3">
                    <h4 className="font-semibold text-gray-900">💻 Technology Stack</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded text-center">
                        <div className="font-semibold text-blue-600">React</div>
                        <div className="text-xs text-gray-600">Frontend</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded text-center">
                        <div className="font-semibold text-green-600">Spring Boot</div>
                        <div className="text-xs text-gray-600">Backend</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded text-center">
                        <div className="font-semibold text-purple-600">Supabase</div>
                        <div className="text-xs text-gray-600">Database & Auth</div>
                      </div>
                      <div className="p-3 bg-pink-50 rounded text-center">
                        <div className="font-semibold text-pink-600">Mustache</div>
                        <div className="text-xs text-gray-600">Templating</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings
