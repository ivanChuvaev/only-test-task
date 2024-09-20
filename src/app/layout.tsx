import type { Metadata } from "next";
import localFont from "next/font/local";
import 'normalize.css';
import '@/shared/assets/styles/globals.scss';

const ptSans = localFont({
  src: [
    {
      path: '../shared/assets/fonts/PTSans-Bold.ttf',
      weight: '700',
    },
    {
      path: '../shared/assets/fonts/PTSans-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-family-pt-sans'
});

const BebasNeue = localFont({
  src: "../shared/assets/fonts/BebasNeue-Regular.ttf",
  variable: "--font-family-bebas-neue",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Only test task",
  description: "Only test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${ptSans.variable} ${BebasNeue.variable}`}>
        {children}
      </body>
    </html>
  );
}
