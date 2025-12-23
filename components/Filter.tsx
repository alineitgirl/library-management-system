'use client';

import React, { useState } from 'react';

interface FilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  genres,
  selectedGenre,
  onGenreChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGenreChange(e.target.value);
  };

  return (
    <div className="flex justify-end m-4 items-center px-4">
      <select
        className="bg-gray-800 text-white px-3 py-2 rounded mx-2 font-medium text-light-100"
        value={selectedGenre}
        onChange={handleChange}
      >
        <option value="">Все жанры</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;