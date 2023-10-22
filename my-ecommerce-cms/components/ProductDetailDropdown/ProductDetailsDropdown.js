import React from 'react'
import { getFirestore, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import UpdateProduct from '../Product/UpdateProduct'
import DeleteProduct from '../Product/DeleteProduct'

const ProductDetailsDropdown = ({ product, onClose }) => {
  const { id, name, description, imageUrl, price, stock } = product
  const db = getFirestore()

  const handleUpdate = async (data) => {
    try {
      const productRef = doc(db, 'products', id)
      await updateDoc(productRef, data)
      console.log('Document successfully updated!')
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'products', id))
      console.log('Document successfully deleted!')
      onClose() // Close the dropdown after deleting the product
    } catch (error) {
      console.error('Error removing document: ', error)
    }
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="flex items-center">
          {imageUrl && (
            <img src={imageUrl} alt={name} className="mr-4 h-32 w-32" />
          )}
          <div>
            <h2 className="text-xl font-semibold text-blue-500">{name}</h2>
            <p className="text-sm">{description}</p>
            <div className="mt-4 flex w-full items-center space-x-4">
              <UpdateProduct product={product} onFormSubmit={handleUpdate} />
              <DeleteProduct productId={id} onDelete={handleDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsDropdown
