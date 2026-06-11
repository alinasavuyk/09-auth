import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer'
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
  const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});


export const metadata: Metadata = {
  title: 'NoteHub',
  description: "Created by Goit",
   openGraph: {
      title: `NoteHub App`,
      description: 'NoteHub is a powerful note taking app and productivity tool that helps you create, organize, and manage notes with ease. Stay focused, boost productivity, and keep your ideas accessible anytime, anywhere.',
      url: `https://note-hub.com/`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub baner`,
        },
      ],
      type: 'article',
    },
};
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
   modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
     <body 
  className={roboto.variable} 
  suppressHydrationWarning={true}
>
       <TanStackProvider>
         <AuthProvider>
         <Header />
        {children}
        {modal}
        <Footer />
         </AuthProvider>
       </TanStackProvider> 
      </body>
    </html>
  );
};
