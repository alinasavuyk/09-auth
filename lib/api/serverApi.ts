
import { cookies } from 'next/headers';
import nextServer from "./api";
import { User } from '@/types/user';
const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async (page: number, search: string, tag?: string) => {
  const { data } = await nextServer.get('/notes', { 
    params: { page, perPage: 12, search, tag },
    headers: await getAuthHeaders() 
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await nextServer.get(`/notes/${id}`, { headers: await getAuthHeaders() });
  return data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res; 
};