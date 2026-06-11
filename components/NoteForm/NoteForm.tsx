"use client";
import css from './NoteForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createNote} from '@/lib/api/api'
import type {NewNote} from '@/types/note'
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from "next/navigation";

function NoteForm (){
 const queryClient = useQueryClient();
   const router = useRouter();
   const { draft, setDraft, clearDraft } = useNoteDraftStore();
   const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
    const onClose = () => {
     router.push('/notes/filter/all');
  };
const { mutate, isPending } = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      onClose();
    },
    onError: (error) => {
      console.error("Помилка при створенні:", error);
    }
  });
  
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutate(values); 
  };


    return(
     <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea defaultValue={draft?.content} onChange={handleChange}
              id="content" 
              name="content" 
              rows={8} 
              className={css.textarea} 
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select onChange={handleChange}
      defaultValue={draft.tag} id="tag" name="tag"  className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
          <div className={css.actions}>
            <button type="button" onClick={onClose} className={css.cancelButton}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={css.submitButton}>
              {isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
    </form>
  );
}

export default NoteForm;