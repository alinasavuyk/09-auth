'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import  {fetchNoteById }  from '@/lib/api/clientApi';
import Loading from '@/app/loading';
import Error from '@/app/(private routes)/notes/[id]/error';
import css from '@/components/NoteDetails/NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });
    
  if (isLoading) {
    return <Loading/>
  }

  if (isError || !note) {
    return <Error error={error as Error} />;
  }

  return (
    <main className={css.container}>
      <article className={css.item}>
        <header className={css.header}>
          <h2>{note.title}</h2>
        </header>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </article>
    </main>
  );
}
