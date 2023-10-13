import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config' // Import your Firebase Firestore configuration

const getProducts = async () => {
  const products = []

  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default getProducts
