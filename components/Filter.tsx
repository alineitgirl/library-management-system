import React, { useState } from 'react'

const Filter = () => {
    const [filter, setFilter] = useState('');

  return (
    <div className="flex justify-end mb-6">
        <select
          className="bg-gray-700 text-white px-3 py-2 rounded mx-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className='text-light-100'>All Departments</option>
          <option>Thriller</option>
          <option>Psychological Thriller</option>
          <option>Horror</option>
        </select>
      </div>
  )
}

export default Filter;