import ColumnItem from "./ColumnItem";
import { Post } from "../types/model";
import { useContext, useMemo } from "react";
import { Context } from "../context/Context";
import { orderOptions } from "../types/filter";

interface ColumnProperties {
  headerText: string;
  posts: Post[];
  id: string;
  shouldRenderFakePost: boolean;
}

export default function Column({
  headerText,
  posts,
  id,
  shouldRenderFakePost,
}: ColumnProperties) {
  const { selectedOrder } = useContext(Context);

  const orderedPosts = useMemo(() => {
    if (selectedOrder === orderOptions.DUE_DATE) {
      const postsWithoutDueDate = posts.filter((post) => !post.dueDate);
      const postsWithDueDate = posts.filter((post) => post.dueDate);
      const postsInOrder = postsWithDueDate.sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return 0;
      });
      return [...postsInOrder, ...postsWithoutDueDate];
    }
    if (selectedOrder === orderOptions.CREATION_DATE) {
      return posts.sort((a, b) => {
        return (
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime()
        );
      });
    }
    return posts;
  }, [posts, selectedOrder]);

  return (
    <div className="bg-surface p-4 rounded-lg shadow-lg" id={id}>
      <div className="text-onSurface pb-4 font-bold">{headerText}</div>
      <div
        className="gap-4 grid grid-cols-1 content-start overflow-auto h-[70vh]"
        id={`pointerEventNoneArea-${id}`}
      >
        {shouldRenderFakePost && (
          <div className="bg-surfaceBright p-4 rounded-lg shadow-lg h-40" />
        )}
        {orderedPosts.map((post) => (
          <ColumnItem
            key={post.id}
            id={post.id}
            course={post.subject.name}
            teacher={post.subject.teacherName}
            dueDate={post.dueDate}
            text={post.title}
            createdAt={post.creationTime}
            attachments={post.materials}
            link={post.alternateLink}
            status={post.status}
          />
        ))}
      </div>
    </div>
  );
}
