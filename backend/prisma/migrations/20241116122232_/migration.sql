-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BACKLOG', 'TO_DO', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "SubmissionState" AS ENUM ('PENDING', 'TURNED_IN', 'LOST');

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alternateLink" TEXT NOT NULL,
    "teacherName" TEXT,
    "disabled" BOOLEAN NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL,
    "alternateLink" TEXT NOT NULL,
    "materials" INTEGER,
    "dueDate" TIMESTAMP(3),
    "status" "Status" NOT NULL,
    "submissionState" "SubmissionState",
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
