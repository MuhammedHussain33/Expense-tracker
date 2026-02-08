import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryAPI } from '../services/api'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../contexts/AuthContext'
import { LoadingCard } from '../components/ui/spinner'

const Categories = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', type: 'EXPENSE' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll()
      setCategories(response.data.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setMessage('Error loading categories')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDefaults = async () => {
    const defaultCategories = [
      { name: 'Food & Dining', type: 'EXPENSE' },
      { name: 'Transportation', type: 'EXPENSE' },
      { name: 'Shopping', type: 'EXPENSE' },
      { name: 'Bills & Utilities', type: 'EXPENSE' },
      { name: 'Entertainment', type: 'EXPENSE' },
      { name: 'Healthcare', type: 'EXPENSE' },
      { name: 'Education', type: 'EXPENSE' },
      { name: 'Other Expenses', type: 'EXPENSE' },
      { name: 'Salary', type: 'INCOME' },
      { name: 'Business', type: 'INCOME' },
      { name: 'Investments', type: 'INCOME' },
      { name: 'Gifts', type: 'INCOME' },
      { name: 'Other Income', type: 'INCOME' },
    ]

    setLoading(true)
    try {
      await Promise.all(defaultCategories.map(cat => categoryAPI.create(cat)))
      setMessage('✅ Default categories created successfully!')
      fetchCategories()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error creating default categories:', error)
      setMessage('❌ Error creating categories')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    try {
      await categoryAPI.create(formData)
      setMessage('✅ Category created successfully!')
      setShowForm(false)
      setFormData({ name: '', type: 'EXPENSE' })
      fetchCategories()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error creating category:', error)
      setMessage('❌ Error creating category')
    }
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return
    }

    try {
      await categoryAPI.delete(id)
      setMessage('✅ Category deleted successfully!')
      fetchCategories()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting category:', error)
      setMessage('❌ Error deleting category')
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

  if (loading) {
    return <LoadingCard message="Loading categories..." />
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
            <Button variant="outline" onClick={() => navigate('/transactions')}>
              Transactions
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
          <div className="flex gap-2">
            {categories.length === 0 && (
              <Button onClick={handleCreateDefaults} className="bg-green-600 hover:bg-green-700">
                Create Default Categories
              </Button>
            )}
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : 'Add Category'}
            </Button>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded-md ${
            message.includes('❌') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Groceries, Rent, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Create Category
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {categories.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold mb-2">No Categories Yet</h3>
              <p className="text-gray-600 mb-6">
                Create categories to organize your income and expenses
              </p>
              <Button onClick={handleCreateDefaults} className="bg-green-600 hover:bg-green-700">
                Create Default Categories
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">💸 Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.filter(cat => cat.type === 'EXPENSE').map((category) => (
                    <div key={category.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <span className="font-medium">{category.name}</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">💰 Income Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.filter(cat => cat.type === 'INCOME').map((category) => (
                    <div key={category.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <span className="font-medium">{category.name}</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default Categories
