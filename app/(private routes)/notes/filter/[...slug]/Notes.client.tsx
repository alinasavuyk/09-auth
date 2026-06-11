"use client";

import css from './App.module.css'
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination'
import NoteList from '@/components/NoteList/NoteList';
import Loading from '@/components/Loading/Loading';
import {Error, SearchError} from '@/components/Error/Error';
import {fetchNotes} from '@/lib/api/clientApi'
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { NoteTag } from '@/types/note';
import Link from "next/link";

type Props = {
  tag?: NoteTag;
};

function NotesClient({ tag }: Props) {
  const [page, setPage]=useState(1)
  const [search, setSearch] = useState('');

  const { data, isLoading, isError }=useQuery({
  queryKey:[`notes`, page, search, tag],
  queryFn:() =>fetchNotes(page, search, tag),
  placeholderData: keepPreviousData,
  })
 
  const notes=data?.notes ?? []
  const totalPages = data?.totalPages ?? 0;


  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const updateSearch = useDebouncedCallback(
  (value:string) => { 
  setSearch(value)
  setPage(1)},
  300);

  const noResults = !isLoading && !isError && search && notes.length === 0;
  
  return (
    <div className={css.app}>
    <header className={css.toolbar}>
    <SearchBox onSearch={updateSearch} value={search} />
    {totalPages > 1 && (
    <Pagination page={page} onPageChange={handlePageClick}  totalPages={totalPages}/>
    )}
    <Link href={"/notes/action/create"} className={css.button}>Create note +</Link>
    </header>
    <main>
    {isLoading && <Loading/>}
    {isError && <Error/>}
    {noResults && <SearchError search={search}/>}
    {notes.length > 0 && <NoteList notes={notes} />}
    </main>
    </div>
    )}

export default NotesClient
