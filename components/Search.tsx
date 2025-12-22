import React from 'react'
import Image from 'next/image'

interface SearchProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Search : React.FC<SearchProps> = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <Image src="/icons/search.svg" alt="search" height={28} width={28}/>

            <input 
            type="text"
            className='search-input'
            placeholder='Найдётся всё'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search