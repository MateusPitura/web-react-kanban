import { Subject } from "../types/model";
import { fetchCourses, fetchTeachersByCourseId } from "./gapiRequests";

export async function bundleGapiSubjects(): Promise<Subject[]> {
  const courses = await fetchCourses(10);

  const teachersPromise = [];
  for (const course of courses) {
    teachersPromise.push(fetchTeachersByCourseId(course.id));
  }

  const teachers = await Promise.all(teachersPromise);

  const subjectsFormatted = [];
  for (const course of courses) {
    const teacher = teachers.find(
      (teacher) => teacher[0].courseId === course.id
    );

    subjectsFormatted.push({
      id: course.id,
      name: course.name,
      alternateLink: course.alternateLink,
      teacherName: teacher ? teacher[0].profile.name.givenName : null,
      disabled: false,
    });
  }
  return subjectsFormatted;
}
