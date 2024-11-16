import { ReactNode, useState } from "react";
import { Context } from "./Context";
import { Post, Subject } from "../types/model";

interface ProviderProperties {
  children: ReactNode;
}

export function Provider({ children }: ProviderProperties) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  return (
    <Context.Provider
      value={{
        subjects,
        setSubjects,
        posts,
        setPosts,
        selectedFilter,
        setSelectedFilter,
        selectedOrder,
        setSelectedOrder,
      }}
    >
      {children}
    </Context.Provider>
  );
}
