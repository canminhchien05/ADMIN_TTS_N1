import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Sidebar from './sibar'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 24, marginLeft: 200 }}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
