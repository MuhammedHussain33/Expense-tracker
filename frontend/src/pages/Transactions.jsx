import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { transactionAPI } from '../services/api'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import TransactionForm from '../components/TransactionForm'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import Toast from '../components/ui/toast'
import { LoadingCard } from '../components/ui/spinner'

const Transactions = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [message, setMessage] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [toastType, setToastType] = useState('info')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getAll()
      setTransactions(response.data.data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setMessage('Error loading transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTransaction = async (formData) => {
    try {
      const response = await transactionAPI.create(formData)
      setMessage(response.data.message)
      
      // Show advice toast if available
      if (response.data.data?.adviceMessage) {
        const isHighExpense = parseFloat(formData.amount) >= 10000
        setToastType(isHighExpense ? 'warning' : 'success')
        setToastMessage(response.data.data.adviceMessage)
      }
      
      setShowForm(false)
      fetchTransactions()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error creating transaction:', error)
      setMessage('Error creating transaction')
    }
  }

  const handleUpdateTransaction = async (formData) => {
    try {
      const response = await transactionAPI.update(editingTransaction.id, formData)
      setMessage(response.data.message)
      
      // Show advice toast if available
      if (response.data.data?.adviceMessage) {
        const isHighExpense = parseFloat(formData.amount) >= 10000
        setToastType(isHighExpense ? 'warning' : 'success')
        setToastMessage(response.data.data.adviceMessage)
      }
      
      setEditingTransaction(null)
      fetchTransactions()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error updating transaction:', error)
      setMessage('Error updating transaction')
    }
  }

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return
    }

    try {
      const response = await transactionAPI.delete(id)
      setMessage(response.data.message)
      fetchTransactions()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting transaction:', error)
      setMessage('Error deleting transaction')
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
      setMessage('✅ PDF downloaded successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      setMessage('❌ Error downloading PDF report')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return <LoadingCard message="Loading transactions..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate('/categories')}>
              Categories
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Transactions</h2>
          <div className="flex gap-2">
            <Button 
              onClick={handleDownloadPdf} 
              disabled={downloading}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              {downloading ? '⏳ Generating...' : '📄 Download PDF'}
            </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Transaction'}
          </Button>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
            {message}
          </div>
        )}

        {(showForm || editingTransaction) && (
          <div className="mb-6">
            <TransactionForm
              initialData={editingTransaction}
              onSubmit={editingTransaction ? handleUpdateTransaction : handleCreateTransaction}
              onCancel={() => {
                setShowForm(false)
                setEditingTransaction(null)
              }}
            />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No transactions found. Add your first transaction!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === 'INCOME'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.description || '-'}</TableCell>
                      <TableCell className={`font-bold ${
                        transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'INCOME' ? '+' : '-'}₹
                        {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingTransaction(transaction)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage(null)} 
        />
      )}
    </div>
  )
}

export default Transactions
