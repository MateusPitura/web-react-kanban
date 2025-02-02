import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Context } from "../context/Context";
import Column from "./Column";
import { Status } from "../types/model";
import { fetchAllPosts, updatePostStatus } from "../utils/queries";

const filterStatus = (status?: string) => {
  return Object.entries(Status).filter(([, value]) => value !== status);
};

export default function Board() {
  const { posts, selectedFilter, setPosts } = useContext(Context);
  const [currentFakePost, setCurrentFakePost] = useState<string>();
  const currentPostId = useRef<string | null>(null);

  const postsBacklog = [];
  const postsToDo = [];
  const postsInProgress = [];
  const postsDone = [];

  const filteredPosts = useMemo(() => {
    if (selectedFilter) {
      return posts.filter((post) => post.subjectId === selectedFilter);
    }
    return posts;
  }, [selectedFilter, posts]);

  for (const post of filteredPosts) {
    if (post.status === Status.BACKLOG) postsBacklog.push(post);
    else if (post.status === Status.TO_DO) postsToDo.push(post);
    else if (post.status === Status.IN_PROGRESS) postsInProgress.push(post);
    else if (post.status === Status.DONE) postsDone.push(post);
  }

  const handleCleanDrop = () => {
    const statusFiltered = filterStatus();
    for (const [, value] of statusFiltered) {
      const pointerEventNoneArea = document.getElementById(
        `pointerEventNoneArea-${value}`
      );
      if (pointerEventNoneArea) {
        pointerEventNoneArea.style.pointerEvents = "auto";
      }
      const columnToDrop = document.getElementById(value);
      columnToDrop?.removeEventListener("drop", handleDrop);
      columnToDrop?.removeEventListener("dragenter", handleDragenter);
      columnToDrop?.removeEventListener("dragover", handleDragover);
    }
    setCurrentFakePost(undefined);
  };

  const handleDragover = async (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDragenter = async (event: DragEvent) => {
    event.preventDefault();
    if (event.target) {
      setCurrentFakePost((event.target as HTMLDivElement).id);
    }
  };

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    if (!event.target) return;
    const columnTargetDrop = (event.target as HTMLDivElement).id;
    if (columnTargetDrop && currentPostId.current) {
      await updatePostStatus(currentPostId.current, columnTargetDrop as Status);
      const posts = await fetchAllPosts();
      setPosts(posts);
    }

    handleCleanDrop();
  };

  useEffect(() => {
    const board = document.getElementById("board");
    board?.addEventListener("dragstart", (event) => {
      if (!event.target) return;

      const [status, id] = (event.target as HTMLDivElement).id.split("-");
      currentPostId.current = id;

      const statusFiltered = filterStatus(status);
      for (const [, value] of statusFiltered) {
        const pointerEventNoneArea = document.getElementById(
          `pointerEventNoneArea-${value}`
        );
        if (pointerEventNoneArea) {
          pointerEventNoneArea.style.pointerEvents = "none";
        }
        const columnToDrop = document.getElementById(value);
        columnToDrop?.addEventListener("drop", handleDrop);
        columnToDrop?.addEventListener("dragenter", handleDragenter);
        columnToDrop?.addEventListener("dragover", handleDragover);
      }
    });
    board?.addEventListener("dragend", handleCleanDrop);
  }, []);

  return (
    <div className="w-full px-4 grid grid-cols-4 gap-x-4" id="board">
      <Column
        headerText="BACKLOG"
        posts={postsBacklog}
        id={Status.BACKLOG}
        shouldRenderFakePost={currentFakePost === Status.BACKLOG}
      />
      <Column
        headerText="TO-DO"
        posts={postsToDo}
        id={Status.TO_DO}
        shouldRenderFakePost={currentFakePost === Status.TO_DO}
      />
      <Column
        headerText="IN PROGRESS"
        posts={postsInProgress}
        id={Status.IN_PROGRESS}
        shouldRenderFakePost={currentFakePost === Status.IN_PROGRESS}
      />
      <Column
        headerText="DONE"
        posts={postsDone}
        id={Status.DONE}
        shouldRenderFakePost={currentFakePost === Status.DONE}
      />
    </div>
  );
}
