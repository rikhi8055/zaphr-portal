import './globals.css'
import { ThemeProvider } from 'next-themes'
import { ReactQueryProvider } from '@/components/providers'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { PageMotion } from '@/components/ui'

export const metadata = { title: 'ZapHR Portal' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <div className="min-h-dvh grid grid-cols-[260px_1fr] md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr]">
              <Sidebar />
              <div className="grid grid-rows-[auto_1fr]">
                <Topbar />
                <PageMotion>
                  <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">{children}</div>
                </PageMotion>
              </div>
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
