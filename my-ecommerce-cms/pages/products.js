import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useState, useEffect } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddProduct from '../components/Product/AddProduct'
import { useRouter } from 'next/router'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

function Products() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setLoading(true)

    getProducts().then((products) => {
      setProducts(products)
      setLoading(false)
    })
  }, [])

  async function getProducts() {
    const db = getFirestore()
    const collectionRef = collection(db, 'products')
    const docs = await getDocs(collectionRef)

    return docs.docs.map((doc) => doc.data())
  }
  
  return (
    <div>
      <header className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Products</h1>
        <div className="flex items-center space-x-2">
          <AddProduct />
        </div>
      </header>
      <ProductHeader />
      {loading ? (
        <ProductItemsSkeleton />
      ) : (
        <ProductItems products={products} />
      )}
    </div>
  )
}

export default Products

Products.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Products' }}>{page}</Layout>
}