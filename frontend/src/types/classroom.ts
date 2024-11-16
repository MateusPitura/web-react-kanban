export interface Course {
    id: string;
    name: string;
    alternateLink: string;
}

export interface Teacher {
    courseId: string;
    profile: {
        name: {
            givenName: string;
        };
    };
}

export interface Announcement {
    courseId: string;
    id: string;
    text: string;
    alternateLink: string;
    creationTime: string;
}

export interface CourseWorkMaterial {
    courseId: string;
    id: string;
    title: string;
    materials: object[] | undefined;
    alternateLink: string;
    creationTime: string;
}

export interface CourseWork {
    courseId: string;
    id: string;
    title: string;
    materials: object[] | undefined;
    alternateLink: string;
    creationTime: string;
    dueDate: {
        year: number;
        month: number;
        day: number;
    } | undefined;
}

export interface StudentSubmissions {
    courseId: string;
    courseWorkId: string;
    userId: string;
    state: string;
}