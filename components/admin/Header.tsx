import React from 'react'
import { Session } from 'next-auth';

const Header = ({ session } : { session : Session}) => {
  return (
   <header className='admin-header'>
    <div>
        <h2 className='text-2xl text-dark-400 font-semibold'>
            Добро пожаловать, {session?.user?.name}!
        </h2>
        <p className='text-slate-500 text-base'>Панель для контроля пользователей и книг в библиотеке</p>
    </div>

    <p>Поиск</p>
   </header>
  )
}

export default Header;