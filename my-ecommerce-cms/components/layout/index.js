// Import necessary dependencies
import React from 'react'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '../../pages/context/AuthContext'
import Meta from './Meta'
import Sidebar from './Sidebar'
import Footer from './Footer'

// Define the combined component
const CombinedComponent = ({ meta, children, ...props }) => {
  const router = useRouter()
  return (
    <html lang="en">
      <head />
      <body>
        <AuthContextProvider>
          <div className="max-w-screen min-h-screen lg:flex">
            <Meta {...meta} />
            <Sidebar />
            <div className="mx-auto flex w-[100%] max-w-screen-xl flex-col">
              <main className="flex-1 px-2 py-2 md:px-6" {...props}>
                {children}
              </main>
              {router.pathname === '/' && <Footer />}
            </div>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}

export default CombinedComponent
