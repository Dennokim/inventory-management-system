import React from 'react';
import CategoryItem from './CategoryItem'; // Assuming you have a CategoryItem component

const CategoryItems = ({ categories }) => {
  return (
    <div className="block max-h-[75vh] overflow-y-auto rounded-lg border p-2 desktop:max-h-[80vh]">
      {categories.length ? (
        categories.map((category) => <CategoryItem key={category.id} {...category} />)
      ) : (
        <div className="h-[100px] w-full text-center font-bold text-gray-300">
          Add some categories to see the data.
        </div>
      )}
    </div>
  );
};

export default CategoryItems;
