import React from 'react'

const Page = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
      <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>
        Слишком быстро! Пожалуйста, подождите
      </h1>
      <p className='mt-3 max-w-xl text-center text-light-400'>
        Похоже, вы немного переусердствовали. Мы заметили подозрительную активность. 
        🚦 Успокойтесь немного и попробуйте ещё раз позже.
      </p>
    </main>
  )
}

export default Page;