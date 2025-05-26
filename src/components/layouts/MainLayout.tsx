import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Sidebar from '../common/Sidebar'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className='flex min-h-dvh w-[calc(100dvw-15px)] max-w-[100dvw] flex-col' >
      <Header />
      <div className='flex w-full' >
        <Sidebar />
        {/* <div className='flex-1 flex flex-col bg-red-500' >

        </div> */}
        <main className='flex-1 py-2' >
          {children}  
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout