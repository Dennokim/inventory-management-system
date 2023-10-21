import React, { useState } from 'react';
import { Link } from '../common/Links';
import ProductDetailsDropdown from '../ProductDetailDropdown/ProductDetailsDropdown';// Import the ProductDetailsDropdown component

const ProductItem = ({ id, name, price, stock, description }) => {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage the visibility of the dropdown

  return (
    <div className="my-2 flex cursor-pointer rounded-md border px-3 py-4 shadow-sm hover:shadow lg:px-6">
      <p className="flex-1 truncate font-medium">{name}</p>
      <p className="flex-1 text-right lg:text-left">$ {price}</p>
      <p className="flex-1 text-right lg:text-left">{stock}</p>
      <div className="flex-1 text-right text-sm lg:text-left">
        <button
          onClick={() => setShowDropdown(true)} // Display the dropdown on click
          className="text-blue-500"
        >
          <span className="hidden text-sm lg:inline-block">View Details</span>
          <span className="inline-block text-sm lg:hidden">Details</span>
        </button>
      </div>
      {showDropdown && ( // Display the dropdown when showDropdown is true
        <ProductDetailsDropdown
          product={{ id, name, price, stock, description }} // Pass the necessary product details to the dropdown
          onClose={() => setShowDropdown(false)} // Close the dropdown on click
        />
      )}
    </div>
  );
};

export default ProductItem;
