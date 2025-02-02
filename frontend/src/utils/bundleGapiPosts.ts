import { Post, Status, Subject, SubmissionState } from "../types/model";
import {
  fetchAnnouncementsByCourseId,
  fetchCourseWorkMaterialsByCourseId,
  fetchCourseWorksByCourseId,
} from "./gapiRequests";

export async function bundleGapiPosts(
  subjects: Subject[]
): Promise<Omit<Post, "subject">[]> {
  const announcementsPromise = [];
  for (const subject of subjects) {
    announcementsPromise.push(fetchAnnouncementsByCourseId(subject.id));
  }

  const courseWorkMaterialsPromise = [];
  for (const subject of subjects) {
    courseWorkMaterialsPromise.push(
      fetchCourseWorkMaterialsByCourseId(subject.id)
    );
  }

  const courseWorksPromise = [];
  for (const subject of subjects) {
    courseWorksPromise.push(fetchCourseWorksByCourseId(subject.id));
  }

  const announcements = await Promise.all(announcementsPromise);
  const courseWorkMaterials = await Promise.all(courseWorkMaterialsPromise);
  const courseWorks = await Promise.all(courseWorksPromise);

  const postsFormatted = [];
  for (const announcement of announcements) {
    if (announcement) {
      for (const announcementItem of announcement) {
        postsFormatted.push({
          subjectId: announcementItem.courseId,
          id: announcementItem.id,
          title: announcementItem.text,
          creationTime: new Date(announcementItem.creationTime),
          alternateLink: announcementItem.alternateLink,
          materials: null,
          dueDate: null,
          status: Status.BACKLOG,
          submissionState: null,
        });
      }
    }
  }

  for (const courseWorkMaterial of courseWorkMaterials) {
    if (courseWorkMaterial) {
      for (const courseWorkMaterialItem of courseWorkMaterial) {
        postsFormatted.push({
          subjectId: courseWorkMaterialItem.courseId,
          id: courseWorkMaterialItem.id,
          title: courseWorkMaterialItem.title,
          creationTime: new Date(courseWorkMaterialItem.creationTime),
          alternateLink: courseWorkMaterialItem.alternateLink,
          materials: courseWorkMaterialItem.materials?.length || null,
          dueDate: null,
          status: Status.BACKLOG,
          submissionState: null,
        });
      }
    }
  }

  for (const courseWork of courseWorks) {
    if (courseWork) {
      for (const courseWorkItem of courseWork) {
        let date = null;
        if (courseWorkItem.dueDate) {
          date = new Date(
            courseWorkItem.dueDate.year,
            courseWorkItem.dueDate.month - 1,
            courseWorkItem.dueDate.day
          );
          date.setDate(date.getDate() - 1);
        }

        postsFormatted.push({
          subjectId: courseWorkItem.courseId,
          id: courseWorkItem.id,
          title: courseWorkItem.title,
          creationTime: new Date(courseWorkItem.creationTime),
          alternateLink: courseWorkItem.alternateLink,
          materials: courseWorkItem.materials?.length || null,
          dueDate: date,
          status: Status.BACKLOG,
          submissionState: SubmissionState.PENDING,
        });
      }
    }
  }

  return postsFormatted;
}
