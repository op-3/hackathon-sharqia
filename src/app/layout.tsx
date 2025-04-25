import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'أكاديمي بلس - منصة تعليمية لطلاب جامعة التقنية والعلوم التطبيقية',
  description: 'منصة تعليمية متكاملة توفر ملخصات دراسية ودورات تدريبية لمساعدة طلاب جامعة التقنية والعلوم التطبيقية على التفوق الأكاديمي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script src="/js/share-modal.js" async></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
