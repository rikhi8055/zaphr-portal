import './globals.css'
import { ThemeProvider } from 'next-themes'
import { ReactQueryProvider } from '../components/providers'
import { Sidebar } from '../components/sidebar'
import { Topbar } from '../components/topbar'
import { PageMotion } from '../components/ui'

export const metadata = { title: 'ZapHR Portal' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <div className="min-h-dvh grid grid-cols-[260px_1fr]">
              <Sidebar />
              <div className="grid grid-rows-[auto_1fr]">
                <Topbar />
                <PageMotion>
                  <div className="p-6 max-w-[1200px] mx-auto w-full">{children}</div>
                </PageMotion>
              </div>
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
