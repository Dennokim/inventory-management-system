import React from 'react'
import { Link } from '../common/Links'

const CategoryItem = ({ name }) => {
  return (
    <div className="my-2 flex cursor-pointer rounded-md border px-3 py-4 shadow-sm hover:shadow lg:px-6">
      <p className="flex-1 truncate font-medium">{name}</p>
    </div>
  )
}

export default CategoryItem
