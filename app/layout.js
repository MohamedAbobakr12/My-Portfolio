// app/layout.js
import './globals.css'
import { ThemeProvider } from '../components/layout/ThemeProvider'
import Navbar from '../components/layout/Navbar'
import CustomCursor from '../components/ui/CustomCursor'
import LoadingScreen from '../components/ui/LoadingScreen'
import ChatWidget from '../components/ui/ChatWidget'

export const metadata = {
  title: 'Mohamed Abobakr — MERN Stack Developer',
  description: 'Full-stack MERN developer building high-performance web applications. 30+ projects, 20+ satisfied clients.',
  keywords: ['MERN Stack', 'React Developer', 'Node.js', 'Full-stack Developer', 'Freelance Developer'],
  authors: [{ name: 'Mohamed Abobakr' }],
  openGraph: {
    title: 'Mohamed Abobakr — MERN Stack Developer',
    description: 'Full-stack MERN developer building high-performance web applications.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
