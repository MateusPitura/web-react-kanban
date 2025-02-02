import { Post, Status, Subject } from "../types/model";

export async function fetchAllSubjects(): Promise<Subject[]> {
  const result = await fetch("http://localhost:7592/subject");
  return await result.json();
}

export async function fetchAllPosts(): Promise<Post[]> {
  const result = await fetch("http://localhost:7592/post");
  return await result.json();
}

export async function saveSubjects(subjects: Subject[]): Promise<void> {
  await fetch("http://localhost:7592/subject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subjects),
  });
}

export async function savePosts(posts: Omit<Post, "subject">[]): Promise<void> {
  await fetch("http://localhost:7592/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posts),
  });
}

export async function updatePost(id: string, status: Status): Promise<void> {
  await fetch(`http://localhost:7592/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });
}

export async function disableSubject(
  id: string,
  disabled: boolean
): Promise<void> {
  await fetch(`http://localhost:7592/subject/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      disabled,
    }),
  });
}
