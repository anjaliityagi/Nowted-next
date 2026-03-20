import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log(token);
    config.headers.Authorization = `${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    if (res?.status === 200) {
      toast.success("Hahahahahaha");
    }
    return res;
  },
  (err) => {
    if (err.response?.status === 200) {
      toast.error("uuuuuuuuummmmmmmmm");
    }
  },
);
export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Notes {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  preview: string;
  folder: Folder;
}
export interface Note {
  folderId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  folder: Folder;
}
export interface RecentNotes {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  preview: string;
  folder: Folder;
}

export const fetchRecents = async (): Promise<RecentNotes[]> => {
  const res = await api.get<{ recentNotes: RecentNotes[] }>("/notes/recent");
  return res.data.recentNotes;
};

export const fetchFolders = async (): Promise<Folder[]> => {
  const res = await api.get<{ folders: Folder[] }>("/folders");
  return res.data.folders;
};

export const createFolders = async (name: string) => {
  try {
    const res = await api.post<{ folder: Folder }>("/folders", { name });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const editFolder = async (id: string, name: string) => {
  const res = await api.patch<{ folder: Folder }>(`/folders/${id}`, { name });
  console.log(res.data);
};
export const delFolder = async (id: string) => {
  const res = await api.delete<{ folder: Folder }>(`/folders/${id}`);
  console.log(res.data);
};

export const fetchNotes = async (
  id: string,
  page: number,
  limit: number,
): Promise<Notes[]> => {
  const res = await api.get<{ notes: Notes[] }>("/notes", {
    params: {
      folderId: id,
      page: page,
      limit: limit,
    },
  });

  return res.data.notes;
};

export const createNote = async (
  folderId: string,
  title: string,
  content: string,
  isArchived: false,
  isFavorite: false,
): Promise<Note> => {
  const res = await api.post<{ id: Note }>("/notes", {
    folderId,
    title,
    content,
    isArchived,
    isFavorite,
  });
  return res.data.id;
};

export const updateNote = async (
  id: string,
  data: {
    folderId?: string;
    title?: string;
    content?: string;
    isFavorite?: boolean;
    isArchived?: boolean;
  },
) => {
  try {
    const res = await api.patch(`/notes/${id}`, data);
    return res.data.note;
  } catch (error) {
    console.error("Failed to update note:", error);
    throw error;
  }
};

export const fetchNoteById = async (
  noteId: string,
  signal?: AbortSignal,
): Promise<Note> => {
  const res = await api.get<{ note: Note }>(`/notes/${noteId}`, {
    signal,
  });

  return res.data.note;
};

export const fetchFav = async (
  isFavorite: boolean,
  page: number,
  limit: number,
): Promise<Notes[]> => {
  const res = await api.get("/notes", {
    params: {
      favorite: isFavorite,
      page: page,
      limit: limit,
    },
  });

  return res.data.notes;
};

export const fetchArchive = async (
  isArchive: boolean,
  page: number,
  limit: number,
): Promise<Notes[]> => {
  const res = await api.get("/notes", {
    params: {
      archived: isArchive,
      page: page,
      limit: limit,
    },
  });

  return res.data.notes;
};

export const fetchDeleted = async (
  deleted: boolean,
  page: number,
  limit: number,
): Promise<Notes[]> => {
  const res = await api.get("/notes", {
    params: {
      deleted: deleted,
      page: page,
      limit: limit,
    },
  });

  return res.data.notes;
};
export const deleteNote = async (noteId: string) => {
  await api.delete(`notes/${encodeURIComponent(noteId)}`);
  // console.log(res.data);
};

export const restoreNote = async (noteId: string) => {
  await api.post(`/notes/${noteId}/restore`);
  return null;
};

export const searchNote = async (searchQuery: string): Promise<Notes[]> => {
  const res = await api.get<{ notes: Notes[] }>(
    `/notes?search=${encodeURIComponent(searchQuery)}`,
  );
  return res.data.notes;
};
