import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import GlobalStateProvider from './context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NFT Place',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-black w-100vw'>
      <body className={inter.className} >
        <GlobalStateProvider>
        <Header/>
        {children}
        <Footer/>
        </GlobalStateProvider>
        </body>
    </html>
  )
}
