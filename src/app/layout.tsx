import ClientProvider from '@/components/ClientProvider'
import Login from '@/components/Login'
import SessionProvider from '@/components/SessionProvider'
import Sidebar from '@/components/SideBar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import './globals.css'

export const metadata = {
  title: 'Valen Chat',
  description: 'A little toy based on ChatGPT'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                {/* sidebar */}
                <Sidebar />
              </div>

                {/* clientProvider - notification */}
                <ClientProvider />

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
