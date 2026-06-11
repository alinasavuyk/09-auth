import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent/NotFoundContent";

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'Page not found - NoteHub',
    description: 'Sorry, we could not find the page you are looking for.',
    url: 'https://note-hub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub banner',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}