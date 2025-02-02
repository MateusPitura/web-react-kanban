import { useContext } from "react";
import { Context } from "../context/Context";
import { fetchAllPosts, fetchAllSubjects } from "../utils/queries";

interface UseRefreshProperties {
  setIsLoading?: (value: boolean) => void;
}

export default function useRefresh({ setIsLoading }: UseRefreshProperties) {
  const { setSubjects, setPosts } = useContext(Context);

  async function handleRefresh() {
    setIsLoading?.(true);
    const subjects = await fetchAllSubjects();
    setSubjects(subjects);
    const posts = await fetchAllPosts();
    setPosts(posts);
    setIsLoading?.(false);
  }

  return { handleRefresh };
}
