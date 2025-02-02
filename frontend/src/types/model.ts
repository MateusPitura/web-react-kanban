export enum Status {
  BACKLOG = "BACKLOG",
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum SubmissionState {
  CREATED = "CREATED",
  TURNED_IN = "TURNED_IN",
  RETURNED = 'RETURNED'
}

export interface Subject {
  id: string;
  name: string;
  alternateLink: string;
  teacherName: string | null;
  disabled: boolean;
}

export interface Post {
  subjectId: string;
  id: string;
  title: string;
  creationTime: Date;
  alternateLink: string;
  materials: number | null;
  dueDate: Date | null;
  status: Status;
  submissionState: SubmissionState | null;
  subject: {
    name: string;
    teacherName: string | null;
  };
}
