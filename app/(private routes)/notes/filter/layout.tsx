import css from "@/app/(private routes)/notes/filter/LayoutNotes.module.css";
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
   <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </section>
  );
};

export default NotesLayout;
