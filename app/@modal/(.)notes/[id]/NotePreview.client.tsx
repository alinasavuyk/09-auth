'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from '@/components/NotePreview/NotePreview.module.css'
interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
console.log(data)
  const handleBack = () => router.back();

  return (
    <Modal onClose={handleBack}>
      {isLoading && <p>Loading note details...</p>}
      {isError && <p>Failed to load note. Please try again later.</p>}
      {data && (
        <div className={css.container}>
          <h2 className={css.header}>{data.title}</h2>
          <p className={css.content}>{data.content}</p>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.data}>{data.createdAt}</p>
          <button className={css.backBtn} onClick={handleBack}>Close</button>
        </div>
      )}
    </Modal>
  );
}