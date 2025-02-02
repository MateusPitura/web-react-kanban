import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { useAuthGoogle } from "../hooks/useAuthGoogle";
import { gapi } from "gapi-script";
import { bundleGapiPosts } from "../utils/bundleGapiPosts";
import { Context } from "../context/Context";
import {
  savePosts,
  saveSubjects,
  updatePostSubmissionState,
} from "../utils/queries";
import { bundleGapiSubjects } from "../utils/bundleGapiSubjects";
import { CircularProgress } from "@mui/material";
import useRefresh from "../hooks/useRefresh";
import { fetchStudentsSubmissionsMe } from "../utils/gapiRequests";
import { SubmissionState } from "../types/model";

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { subjects, posts } = useContext(Context);
  const { handleRefresh } = useRefresh({ setIsLoading });

  const handleOnAuth = (isSignedIn: boolean) => {
    setIsSignedIn(isSignedIn);
  };

  useAuthGoogle({ handleOnAuth });

  const handleLogInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const onClickSyncSubjects = async () => {
    setIsLoading(true);
    const subjects = await bundleGapiSubjects();
    await saveSubjects(subjects);
    setIsLoading(false);
    handleRefresh();
  };

  const onClickSyncPosts = async () => {
    setIsLoading(true);
    const posts = await bundleGapiPosts(
      subjects.filter((item) => !item.disabled)
    );
    await savePosts(posts);
    setIsLoading(false);
    handleRefresh();
  };

  const onClickSubmission = async () => {
    const pendingPosts = posts.filter(
      (item) => item.submissionState === "CREATED"
    );
    const courseWorksStatusPromise = [];
    for (const post of pendingPosts) {
      courseWorksStatusPromise.push(
        fetchStudentsSubmissionsMe(post.subjectId, post.id)
      );
    }
    const courseWorksStatus = await Promise.all(courseWorksStatusPromise);
    const postsFormatted = [];
    for (const courseWorkStatus of courseWorksStatus) {
      if (courseWorkStatus && courseWorkStatus.length > 0) {
        postsFormatted.push(
          updatePostSubmissionState(
            courseWorkStatus[0].courseWorkId,
            courseWorkStatus[0].state === "TURNED_IN" || courseWorkStatus[0].state === "RETURNED"
              ? SubmissionState.TURNED_IN
              : SubmissionState.CREATED
          )
        );
      }
    }
    await Promise.all(postsFormatted);
    handleRefresh();
  };

  return (
    <div className="bg-surface h-20 justify-start w-full flex p-4">
      <div className="flex-1 flex justify-end items-center gap-x-4">
        {isLoading && <CircularProgress size={20} color="inherit" />}
        <Button variant="tertiary" onClick={handleRefresh} disabled={isLoading}>
          Refresh
        </Button>
        <Button
          variant="tertiary"
          onClick={onClickSyncSubjects}
          disabled={isLoading}
        >
          Subjects
        </Button>
        <Button
          variant="tertiary"
          onClick={onClickSyncPosts}
          disabled={isLoading}
        >
          Posts
        </Button>
        <Button
          variant="tertiary"
          onClick={onClickSubmission}
          disabled={isLoading}
        >
          Submission
        </Button>
        <Button
          variant="primary"
          onClick={isSignedIn ? handleLogOutClick : handleLogInClick}
        >
          {isSignedIn ? "Log Out" : "Log In"}
        </Button>
      </div>
    </div>
  );
}
