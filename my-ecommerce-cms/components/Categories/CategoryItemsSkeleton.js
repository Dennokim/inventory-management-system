import React from 'react';

const CategoryItemSkeleton = () => {
  return (
    <div className="cursor-loading my-2 flex animate-pulse space-x-16 rounded-md border px-6 py-4 shadow-sm">
      <div className="h-3 flex-1 rounded bg-gray-200"></div>
      <div className="h-3 flex-1 rounded bg-gray-200"></div>
      <div className="h-3 flex-1 rounded bg-gray-200"></div>
      <div className="h-3 flex-1 rounded bg-gray-200"></div>
    </div>
  );
};

const CategoryItemsSkeleton = () => (
  <>
    {new Array(5).fill(0).map((_, idx) => (
      <CategoryItemSkeleton key={idx} />
    ))}
  </>
);

export default CategoryItemsSkeleton;
