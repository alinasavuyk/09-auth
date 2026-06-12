
import { cookies } from 'next/headers';
import nextServer from "./api";
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';
import type  { Note }  from "@/types/note";
const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async (page: number, search: string, tag?: string): Promise<Note[]> => {
  const { data } = await nextServer.get('/notes', { 
    params: { page, perPage: 12, search, tag },
    headers: await getAuthHeaders() 
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get(`/notes/${id}`, { headers: await getAuthHeaders() });
  return data;
};

export const getServerMe = async (): Promise<User> => {
 const { data } = await nextServer.get("/users/me", {
   headers: await getAuthHeaders(),
  });
  return data;
};
export const checkServerSession = async (): Promise<AxiosResponse<User>> => {
  const res = await nextServer.get("/auth/session", {
   headers: await getAuthHeaders(),
  });

  return res; 
};