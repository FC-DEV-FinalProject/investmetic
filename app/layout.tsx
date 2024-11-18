import type { Metadata } from 'next'

import { MSWInitializer, QueryProvider } from '@/shared/providers'
import '@/shared/styles/global.scss'

import { pretendard } from './fonts'

export const metadata: Metadata = {
  title: 'InvestMetic',
  description: '',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <div id="modal-root"></div>
        <QueryProvider>
          <MSWInitializer />
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
