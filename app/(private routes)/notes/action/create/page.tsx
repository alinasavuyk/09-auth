  
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";
import css from '@/components/CreateNote/CreateNote.module.css'
export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create new note in NoteHub',
   openGraph: {
      title: `Create Note`,
      description: 'Create new note in NoteHub',
      url: `https://note-hub.com/notes/action/create`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub banner`,
        },
      ],
      type: 'article',
    },
};


export default function CreateNote () {
   return <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	 <NoteForm/> 
  </div>
</main>

  
};
   
   