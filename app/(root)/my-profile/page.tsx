import React from 'react'
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/actions/auth";

const Page = () => {

  return (
    <>
    <form 
    action={handleLogout}
    className='mb-10'>
        <Button>Выход</Button>
    </form>
    
    </>
  )
}

export default Page;