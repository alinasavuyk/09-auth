import { fetchNotes } from "@/lib/api/serverApi"; 
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from '@/app/(private routes)/notes/filter/[...slug]/Notes.client';
import { NoteTag } from "@/types/note";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
     const {slug} = await params;
  const rawTag = slug[0];
  const isAll = rawTag === "all" || !rawTag;
  const searchTag = isAll ? "all" : rawTag;
  return {
    title: `Note: ${searchTag ? searchTag : "all"} Notes`,
    description: `List of ${searchTag} notes`,
     openGraph: {
      title: `${searchTag} notes`,
      description: `Notes list filtered by ${searchTag}`,
       url: `https://note-hub.com/filter/${searchTag}`,
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
  }
}
const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0] as NoteTag;
   const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });
   return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}

export default NotesByCategory;