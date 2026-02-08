import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { transactionAPI } from '../services/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { LoadingCard } from '../components/ui/spinner'
import AnimatedLogo from '../components/ui/animated-logo'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [summary, setSummary] = useState(null)
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [summaryRes, transactionsRes] = await Promise.all([
        transactionAPI.getSummary(),
        transactionAPI.getAll(),
      ])

      setSummary(summaryRes.data.data)
      setRecentTransactions(transactionsRes.data.data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching data:', error)
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

  const handleDownloadPdf = async () => {
    setDownloading(true)
    try {
      const response = await api.get('/api/transactions/download/pdf', {
        responseType: 'blob'
      })
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      const today = new Date().toISOString().split('T')[0]
      link.setAttribute('download', `expense-tracker-report-${today}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Error downloading PDF report. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return <LoadingCard message="Loading your dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <AnimatedLogo size="md" showText={true} />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="outline" onClick={() => navigate('/categories')}>
              📂 Categories
            </Button>
            <Button variant="outline" onClick={() => navigate('/settings')}>
              ⚙️ Settings
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              🚪 Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <div className="flex gap-2">
            <Button 
              onClick={handleDownloadPdf} 
              disabled={downloading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {downloading ? '⏳ Generating...' : '📄 Download PDF Report'}
            </Button>
          <Button onClick={() => navigate('/transactions')}>
            View All Transactions
          </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ₹{summary?.totalIncome?.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                ₹{summary?.totalExpense?.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${
                (summary?.balance || 0) >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}>
                ₹{summary?.balance?.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No transactions yet. Start by adding one!
              </p>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{transaction.description || 'No description'}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'INCOME' ? '+' : '-'}₹
                      {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {summary?.categoryBreakdown && Object.keys(summary.categoryBreakdown).length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>Spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(summary.categoryBreakdown).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm font-bold">₹{amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

export default Dashboard
