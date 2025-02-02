import { gapi } from "gapi-script";
import {
  Announcement,
  Course,
  CourseWork,
  CourseWorkMaterial,
  StudentSubmissions,
  Teacher,
} from "../types/classroom";

export const fetchCourses = async (pageSize: number): Promise<Course[]> => {
  const response = await gapi.client.classroom.courses.list({
    pageSize,
  });
  const { courses } = response.result;
  return courses;
};

export const fetchTeachersByCourseId = async (
  courseId: string
): Promise<Teacher[]> => {
  const response = await gapi.client.classroom.courses.teachers.list({
    courseId,
  });
  const { teachers } = response.result;
  return teachers;
};

export const fetchAnnouncementsByCourseId = async (
  courseId: string
): Promise<Announcement[] | undefined> => {
  const response = await gapi.client.classroom.courses.announcements.list({
    courseId,
  });
  const { announcements } = response.result;
  return announcements;
};

export const fetchCourseWorkMaterialsByCourseId = async (
  courseId: string
): Promise<CourseWorkMaterial[] | undefined> => {
  const response = await gapi.client.classroom.courses.courseWorkMaterials.list(
    {
      courseId,
    }
  );
  const { courseWorkMaterial } = response.result;
  return courseWorkMaterial;
};

export const fetchCourseWorksByCourseId = async (
  courseId: string
): Promise<CourseWork[] | undefined> => {
  const response = await gapi.client.classroom.courses.courseWork.list({
    courseId,
  });
  const { courseWork } = response.result;
  return courseWork;
};

export const fetchStudentsSubmissionsMe = async (
  courseId: string,
  courseWorkId: string,
  userId: string = 'me'
): Promise<StudentSubmissions[] | undefined> => {
  const response =
    await gapi.client.classroom.courses.courseWork.studentSubmissions.list({
      courseId,
      courseWorkId,
      userId,
    });
  const { studentSubmissions } = response.result;
  return studentSubmissions;
};
