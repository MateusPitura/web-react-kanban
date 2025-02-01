import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useGlobalStore = create(
  persist(
    combine(
      {
        blockedCourses: [] as string[],
      },
      (set) => ({
        add: (course: string) =>
          set((state) => ({
            blockedCourses: [...state.blockedCourses, course],
          })),
        remove: (course: string) =>
          set((state) => ({
            blockedCourses: state.blockedCourses.filter((c) => c !== course),
          })),
      })
    ),
    {
      name: "blocked-courses",
    }
  )
);
