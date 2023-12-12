import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import './globals.css'
import Header from './components/Header';
import Provider from './components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Promtopia',
  description: 'Discover & Share AI Powered Prompts',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="w-[80%] mx-auto">
            <Header />
            <main>
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
