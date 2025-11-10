import { ReactNode } from 'react'
import '@/styles/admin.css'
import Sidebar from '@/components/admin/Sidebar';
import { auth }  from '@/auth';
import Header from '@/components/admin/Header';
import { redirect } from 'next/navigation';


const Layout = async ({children} : {children: ReactNode}) => {

    const session  = await auth({});

    if (!session?.user?.id) {
        redirect("/sign-in");
    }

  return (
    <main className='flex min-h-screen w-full flex-row'>
        <Sidebar session={session}/>

        <div className='admin-container'>
            <Header/>
            {children}
        </div>

    </main>
  );
}

export default Layout;