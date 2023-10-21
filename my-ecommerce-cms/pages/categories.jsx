import Layout from '../components/layout'
import CategoryItems from '../components/Categories/CategoryItems' // assuming you have this component
import { useState, useEffect } from 'react'
import CategoryItemsSkeleton from '../components/Categories/CategoryItemsSkeleton' // assuming you have this component
 import CategoryHeader from '../components/Categories/CategoryHeaders'
import AddCategory from '../components/category/AddCategory' // assuming you have this component
import { getFirestore, collection, getDocs } from 'firebase/firestore'

function Categories() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function getCategories() {
      const db = getFirestore()
      const collectionRef = collection(db, 'categories') // update to 'categories'
      const docs = await getDocs(collectionRef)
      return docs.docs.map((doc) => doc.data())
    }

    setLoading(true)
    getCategories()
      .then((categories) => {
        setCategories(categories)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <header className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Categories</h1>{' '}
        {/* Update the header */}
        <div className="flex items-center space-x-2">
          <AddCategory />
        </div>
      </header>
      <CategoryHeader /> {/* Update the component name */}
      {loading ? (
        <CategoryItemsSkeleton />
      ) : (
        <CategoryItems categories={categories} />
      )}
    </div>
  )
}

export default Categories

Categories.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Categories' }}>{page}</Layout>
}
