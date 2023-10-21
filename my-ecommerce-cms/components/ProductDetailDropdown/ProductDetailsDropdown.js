import React from 'react'

const ProductDetailsDropdown = ({ product, onClose }) => {
  return (
    <div className="dropdown-container">
      <div className="dropdown-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        {/* Include other details here */}
      </div>
    </div>
  )
}

export default ProductDetailsDropdown
