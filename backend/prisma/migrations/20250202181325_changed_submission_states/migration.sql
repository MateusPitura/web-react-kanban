/*
  Warnings:

  - The values [PENDING,LOST] on the enum `SubmissionState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubmissionState_new" AS ENUM ('CREATED', 'TURNED_IN');
ALTER TABLE "Post" ALTER COLUMN "submissionState" TYPE "SubmissionState_new" USING ("submissionState"::text::"SubmissionState_new");
ALTER TYPE "SubmissionState" RENAME TO "SubmissionState_old";
ALTER TYPE "SubmissionState_new" RENAME TO "SubmissionState";
DROP TYPE "SubmissionState_old";
COMMIT;
