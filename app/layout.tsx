import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'متجر أبو سلطان',
  description: 'وجهتك الموثوقة لحسابات وأكواد الإنترنت المجاني الفورية',
  openGraph: {
    title: 'متجر أبو سلطان',
    description: 'وجهتك الموثوقة لحسابات وأكواد الإنترنت المجاني الفورية',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'متجر أبو سلطان',
    description: 'وجهتك الموثوقة لحسابات وأكواد الإنترنت المجاني الفورية',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0B0B0E] text-gray-100 min-h-screen font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
