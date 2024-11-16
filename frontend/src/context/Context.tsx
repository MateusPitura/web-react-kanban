import { createContext } from "react";
import { Subject } from "../types/model";
import { Post } from "../types/model";

interface ContextProperties {
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  selectedFilter: string;
  setSelectedFilter: (selectedFilter: string) => void;
  selectedOrder: string;
  setSelectedOrder: (selectedOrder: string) => void;
}

export const Context = createContext<ContextProperties>({
  subjects: [],
  setSubjects: () => {},
  posts: [],
  setPosts: () => {},
  selectedFilter: "",
  setSelectedFilter: () => {},
  selectedOrder: "",
  setSelectedOrder: () => {},
});
