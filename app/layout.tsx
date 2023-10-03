import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Monitorando Academia',
  description: 'App para monitorar sua evolução na academia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body className={inter.className + ' min-h-full grid grid-rows-[auto,1fr,auto]'}>
          <ReactQueryProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
