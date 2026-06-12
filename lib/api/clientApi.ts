import type  { Note, NoteTag }  from "@/types/note";
import nextServer from "./api";
import { User,  UpdateUserRequest, RegisterRequest, LoginRequest } from '@/types/user';

export interface NotesHttpResponseProps {
  notes: Note[];
  totalPages:number,
}
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

type CheckSessionRequest = {
  success: boolean;
};
export const fetchNotes = async (page: number, search: string, tag?: NoteTag) => {
  const { data } = await nextServer.get('/notes', { params: { page, perPage: 12, search, tag } });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  console.log(res)
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => await nextServer.post('/auth/logout');

export const createNote = async (newNote: any) => (await nextServer.post<Note>('/notes', newNote)).data;

export const deleteNote = async (id: string) => (await nextServer.delete<Note>(`/notes/${id}`)).data;

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};
export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};
export const updateMe = async (username: User['username']): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', { username });
  return data;
};